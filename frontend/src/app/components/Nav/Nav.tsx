"use client";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

function Nav() {
  const { address, isConnected } = useAccount();

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__left}>
          <div>
            <Link href="/" style={{ color: "black", textDecoration: "none" }}>
              <div className={`${styles.nav__logo} rajdhani-bold`}>
                EMERGENCY
              </div>
            </Link>
          </div>

          <div>
            <Link
              href=""
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              Donate
            </Link>
          </div>
        </div>
        <div className={styles.nav__right}>
          <w3m-button />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
