"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { useAccount } from "wagmi";

// Define the types for the marker and API response
interface MarkerData {
  walletAddress: string;
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  height: "600px", // Set a smaller height
  width: "100%", // Maintain full width
};

const defaultCenter = {
  lat: 37.7749, // Default center point, San Francisco
  lng: -122.4194,
};

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [center, setCenter] = useState(defaultCenter); // New state for map center
  const [markerPlaced, setMarkerPlaced] = useState<boolean>(false); // Track if a marker has been placed

  const { address } = useAccount(); // Get the wallet address from the useAccount hook

  // Fetch all pinned locations from the backend
  const fetchLocations = async () => {
    try {
      const response = await axios.get<MarkerData[]>(
        "http://localhost:5001/api/locations"
      );
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Automatically get the user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setUserLocation({ lat, lng });

          // Re-center the map on the user's location
          setCenter({ lat, lng });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle saving the user's current location
  const saveCurrentLocation = async () => {
    if (!address) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!userLocation) {
      alert("User location is not available.");
      return;
    }

    const newMarker: MarkerData = {
      walletAddress: address, // Use the address from the useAccount hook
      lat: userLocation.lat,
      lng: userLocation.lng,
    };

    // Add the user's current location to the map
    setMarkers((current) => [...current, newMarker]);
    setMarkerPlaced(true); // Mark that a marker has been placed

    // Send the user's current location to the backend
    try {
      await axios.post("http://localhost:5001/api/locations", newMarker);
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  // Handle clicking on the map to add a new pin
  const onMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!address) {
      alert("Please connect your wallet first!");
      return;
    }

    if (markerPlaced) {
      // Check if a marker has already been placed
      alert("A marker has already been placed!"); // Notify the user
      return;
    }

    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat === undefined || lng === undefined) {
      return;
    }

    const newMarker: MarkerData = {
      walletAddress: address, // Use the address from the useAccount hook
      lat,
      lng,
    };

    // Add the new pin to the map
    setMarkers((current) => [...current, newMarker]);
    setMarkerPlaced(true); // Mark that a marker has been placed

    // Send the new pin to the backend
    try {
      await axios.post("http://localhost:5001/api/locations", newMarker);
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  useEffect(() => {
    console.log("Markers:", markers);
  }, [markers]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <LoadScript googleMapsApiKey="AIzaSyC0sj2Vp1TDlgxwjZW_ga6IGUalupE4-Iw">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={onMapClick}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelectedMarker(marker)}
            />
          ))}

          {/* Show info window when a marker is selected */}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h4>Wallet Address:</h4>
                <p>{selectedMarker.walletAddress}</p>
                <button
                  onClick={() => {
                    // Add your chat functionality here
                    alert(`Chat with: ${selectedMarker.walletAddress}`);
                  }}
                  style={{
                    marginTop: "10px",
                    padding: "5px",
                    backgroundColor: "#4CAF50", // Green background
                    color: "white", // White text
                    border: "none", // No border
                    borderRadius: "5px", // Rounded corners
                    cursor: "pointer", // Pointer cursor on hover
                  }}
                >
                  Chat
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Button Container */}
      <div style={{ padding: "10px", textAlign: "center" }}>
        <button
          onClick={getUserLocation}
          style={{ marginBottom: "10px", marginRight: "10px", padding: "8px" }}
        >
          Get My Location
        </button>

        {userLocation && (
          <button
            onClick={saveCurrentLocation}
            style={{ marginBottom: "10px", padding: "8px" }}
          >
            Save My Location
          </button>
        )}

        {/* Button to reset marker placement */}
        {markerPlaced && (
          <button
            onClick={() => setMarkerPlaced(false)}
            style={{ marginBottom: "10px", padding: "8px" }}
          >
            Place Another Marker
          </button>
        )}
      </div>
    </div>
  );
};

export default Map;
