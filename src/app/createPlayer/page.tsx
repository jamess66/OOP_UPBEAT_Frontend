"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import "../styles/createPlayerStyle.css";
import axios from "axios";

interface HexRegion {
  ownerHashcode: number;
  deposit: number;
  max_deposit: number;
  x: number;
  y: number;
}

interface Player {
  playername: string;
  identifier: { [k: string]: number };
  crewInfo: crewInfo;
  isPlayerTurn: boolean;
  color: string;
}

interface crewInfo {
  color: string;
  buget: number;
  citycenter: HexRegion;
  currentRegion: HexRegion[];
}

function playergame() {
  if (sessionStorage.getItem("playername")) {
    window.location.href = "/";
  }

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async (e: { target: { value: string } }) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setError("");
    if (!username || username == "") {
      setError("Please enter your name.");
      e.preventDefault();
      return;
    }

    const pattern = /^[a-zA-Z0-9]+$/;

    if (!username.match(pattern)) {
      setError("Please enter valid name. (a-z A-Z 0-9)");
      e.preventDefault();
      return;
    }
    createPlayer();
  };

  const createPlayer = async () => {
    try {
      const res: any = await axios.post(
        `http://${localStorage.getItem("serveradress")}:8080/player`,
        username
      );
      const data = res.data;
      if (data.playerName != "" && data.crewInfo != null) {
        window.location.href = "/lobby";
        sessionStorage.setItem("playername", username);
      } else {
        window.alert("Room is full!!! Going back to start menu.");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Error posting username", error);
    }
    return false;
  };
  return (
    <header className="background">
      <div className="boderuser">
        <div
          className="component-setplayergame-front"
          style={{ fontFamily: "MadimiOne" }}
        >
          USERNAME
          <form>
            <input
              className="inputname"
              type="text"
              placeholder="Enter your name."
              value={username}
              onChange={handleJoin}
            />
          </form>
          {error && (
            <p style={{ paddingTop: "10px" }} className="warning-text">
              {error}
            </p>
          )}
          <div>
            <button
              className="buttonjoin"
              value="Submit"
              onClick={handleSubmit}
            >
              Join
            </button>
          </div>
          <div>
            <Link href="/">
              <button className="buttonback">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default playergame;
