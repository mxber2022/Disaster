"use client";

import { useState, CSSProperties } from "react";
import { useWriteContract, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

function Donate() {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();

  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    console.log(`Donating: ${amount}`);
    setAmount("");

    sendTransaction({
      to: "0x2CE74781bd1700498C0FA27a1266B228c9B0F776",
      value: parseEther(amount),
    });
  };

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
    <div style={styles.container}>
      <p style={styles.title}>Donate</p>
      <input
        type="number"
        placeholder="Enter donation amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />
      <button
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
      </button>
    </div>
  );
}

export default Donate;
