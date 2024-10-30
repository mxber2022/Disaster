"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

// Define the types for the marker and API response
interface MarkerData {
  walletAddress: string;
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const defaultCenter = {
  lat: 37.7749, // Default center point, San Francisco
  lng: -122.4194,
};

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [center, setCenter] = useState(defaultCenter); // New state for map center

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
    if (!walletAddress) {
      alert("Please enter your wallet address first!");
      return;
    }

    if (!userLocation) {
      alert("User location is not available.");
      return;
    }

    const newMarker: MarkerData = {
      walletAddress,
      lat: userLocation.lat,
      lng: userLocation.lng,
    };

    // Add the user's current location to the map
    setMarkers((current) => [...current, newMarker]);

    // Send the user's current location to the backend
    try {
      await axios.post("http://localhost:5001/api/locations", newMarker);
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  // Handle clicking on the map to add a new pin
  const onMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!walletAddress) {
      alert("Please enter your wallet address first!");
      return;
    }

    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat === undefined || lng === undefined) {
      return;
    }

    const newMarker: MarkerData = {
      walletAddress,
      lat,
      lng,
    };

    // Add the new pin to the map
    setMarkers((current) => [...current, newMarker]);

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
    <div>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        style={{ marginBottom: "10px", width: "300px", padding: "8px" }}
      />

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
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
