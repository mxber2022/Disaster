"use client";

import { useState, CSSProperties } from "react";
import { useWriteContract, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useEffect } from "react";

interface Location {
  walletAddress: string;
  lat: number;
  lng: number;
}

function Donate() {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();

  const [amount, setAmount] = useState("");

  const handleDonates = (location: any) => {
    console.log(`Donating: ${amount}`);
    setAmount("");

    sendTransaction({
      to: location.walletAddress,
      value: parseEther(amount),
    });
  };

  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://emergencybackend-g9scdbasl-mxber2022s-projects.vercel.app/api/locations"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        // setError(error);
      }
    };

    fetchLocations();
  }, []); // Empty dependency array to run only once when the component mounts

  if (error) {
    return <div>Error: {error}</div>;
  }

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "auto",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #0070f3",
      borderRadius: "5px",
      marginBottom: "10px",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#0070f3",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonHover: {
      backgroundColor: "#005bb5",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <p style={styles.title}>Donate</p>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        {/* <button
          onClick={handleDonate}
          style={styles.button}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor || "#005bb5")
          } // Provide a fallback color
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor || "#0070f3")
          } // Provide a fallback color
        >
          Donate
        </button> */}
      </div>

      <div className="container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul className="list">
          {locations.map((location) => (
            <li key={location.walletAddress} className="listItem">
              <span className="walletAddress">{location.walletAddress}</span>
              <button
                onClick={() => handleDonates(location)}
                className="donateButton"
              >
                Donate
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Donate;
