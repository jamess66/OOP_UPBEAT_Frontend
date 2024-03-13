"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import IdentifierComponent from "./IdentifierComponent";

function PlayerInfo() {
  const [players, setPlayers] = useState([]);
  const refreshInterval = 5000; // refresh every 5 sec
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [isInitialed, setIsInitialed] = useState(false);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("serveradress")}:8080/players`
      );
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      } else {
        console.error("Error fetching player data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const allPlayers = [];
  let currentPlayerIndex = 0;
  let selectedPlayerIndex = 0;
  let i = 0;

  for (const player of players) {
    if (player) {
      // if (player.playerName == selectedPlayer?.playerName) {
      //   selectedPlayerIndex = i;
      // }
      if (player.playerName == sessionStorage.getItem("playername")) {
        currentPlayerIndex = i;
        if (!isInitialed) {
          setSelectedPlayer(player);
          setIsInitialed(true);
        }
      }
      const option = {
        label:
          player.playerName +
          (player.playerName == sessionStorage.getItem("playername")
            ? "(You)"
            : "") +
          (player.isPlayerTurn ? "(Current Turn)" : ""),
        value: player,
      };
      allPlayers.push(option);
      i = i + 1;
    }
  }

  console.log(selectedPlayer);

  useEffect(() => {
    fetchPlayers();
    const intervalId = setInterval(fetchPlayers, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  const handlePlayerChange = (selectedOption) => {
    setSelectedPlayer(selectedOption.value);
  };

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const setContrastText = (color) => {
    const textColor = ["#ffffff", "#000000"];
    const hexCode = color.split("#");
    try {
      const r = parseInt(hexCode[1].substring(0, 2), 16);
      const g = parseInt(hexCode[1].substring(2, 4), 16);
      const b = parseInt(hexCode[1].substring(4, 6), 16);

      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      if (luminance > 0.5) {
        return textColor[1];
      } else {
        return textColor[0];
      }
    } catch (ignore) {
      return textColor[1];
    }
  };

  const colourStyles = {
    control: (styles) => {
      return { ...styles, backgroundColor: `white` };
    },
    option: (styles, { data }) => {
      const playerColor = data.value.crewInfo.playerColor;
      return {
        ...styles,
        backgroundColor: `${playerColor}`,
        color: setContrastText(playerColor),
      };
    },

    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({
      ...styles,
      ...dot(
        `${selectedPlayer ? selectedPlayer.crewInfo.playerColor : "%ccc"}`
      ),
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      ...dot(data.value.crewInfo.playerColor),
    }),
  };

  return (
    <div>
      <div style={{ width: "95%" }}>
        <div style={{ paddingBottom: "50px" }}>Players Infomation</div>

        <Select
          options={allPlayers}
          styles={colourStyles}
          placeholder={allPlayers[currentPlayerIndex]?.label + ""}
          onChange={handlePlayerChange}
        />
      </div>
      <div style={{ paddingTop: "30px" }}>
        Name: {selectedPlayer?.playerName}
      </div>
      <div>Budget: {selectedPlayer?.crewInfo.budget}</div>
      <div>
        Current Region: ({selectedPlayer?.crewInfo.currentRegion.x + 1},
        {selectedPlayer?.crewInfo.currentRegion.y + 1})
      </div>
      <div>
        City Center:{" "}
        {selectedPlayer?.crewInfo.cityCenter
          ? "(" +
            selectedPlayer?.crewInfo.cityCenter.x +
            ", " +
            selectedPlayer?.crewInfo.cityCenter.y +
            ")"
          : "(Lost City Center)"}
      </div>

      {selectedPlayer?.playerName == sessionStorage.getItem("playername") ? (
        <IdentifierComponent
          identifier={selectedPlayer?.identifier}
        ></IdentifierComponent>
      ) : (
        <div>Identifier: (Secret)</div>
      )}
    </div>
  );
}
export default PlayerInfo;
