"use client";

import React, { useState, useEffect } from "react";
import "../styles/lobby.css";
import Link from "next/link";

interface PlayerInstance {
  playerName: string;
  crewInfo: crewInfo;
}

interface crewInfo {
  playerColor: string;
  buget: number;
  citycenter: HexRegion;
  currentRegion: HexRegion;
}

interface HexRegion {
  regionColor: string;
  deposit: number;
  max_deposit: number;
  x: number;
  y: number;
}

function lobby() {
  const [players, setPlayers] = useState<PlayerInstance[]>([]);
  const refreshInterval = 3000; // refresh every 5 sec

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("serveradress")}:8080/players`
      );
      if (response.ok) {
        const data: PlayerInstance[] = await response.json();
        setPlayers(data);
      } else {
        console.error("Error fetching player data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
    const intervalId = setInterval(fetchPlayers, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  const handleJoin = () => {
    if (players.length > 1) {
      window.location.href = "/maingame";
    } else {
      window.alert("Wait for more player.");
    }
  };

  return (
    <header className="backgorund">
      <div className="backlobby">
        <p
          className="main-text"
          style={{
            marginTop: "50px",
            fontSize: "bold",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          LOBBY
        </p>
        <ul>
          {players.map((player, index) => (
            <li key={player.playerName}>
              <span
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                {player.playerName}
              </span>
              {player.playerName === sessionStorage.getItem("playername") && (
                <span
                  style={{
                    color: "lightgreen",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {" "}
                  (You)
                </span>
              )}
              {index !== players.length - 1 && (
                <hr
                  style={{
                    borderColor: "lightgray",
                    borderStyle: "solid",
                    width: "80%",
                    margin: "10px auto",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
        <div>
          <button className="button" onClick={handleJoin}>
            Start
          </button>
        </div>
      </div>
    </header>
  );
}

export default lobby;
