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
      const playerColor = selectedPlayer
        ? selectedPlayer.crewInfo.playerColor
        : "#ffffff";
      return {
        ...styles,
        backgroundColor: `${playerColor}`,
        color: `${setContrastText(playerColor)}`,
        border: "5px",
      };
    },
    placeholder: (styles, { data }) => {
      const playerColor = selectedPlayer
        ? selectedPlayer.crewInfo.playerColor
        : "#ffffff";
      return {
        ...styles,
        ...dot(`${playerColor}`),
        color: setContrastText(playerColor),
      };
    },
    singleValue: (styles, { data }) => {
      const playerColor = selectedPlayer
        ? selectedPlayer.crewInfo.playerColor
        : "#ffffff";
      return {
        ...styles,
        ...dot(data.value.crewInfo.playerColor),
        color: setContrastText(playerColor),
      };
    },
    option: (styles, { data }) => {
      const playerColor = data.value.crewInfo.playerColor;
      return {
        ...styles,
        backgroundColor: `${playerColor}`,
        color: setContrastText(playerColor),
      };
    },

    menu: (styles) => ({
      ...styles,
      backgroundColor: "#112a46",
      color: setContrastText("#112a46"),
    }),

    noOptionsMessage: (styles) => ({
      ...styles,
      backgroundColor: "#112a46",
      color: setContrastText("#112a46"),
    }),

    input: (styles) => ({ ...styles, ...dot() }),
  };
  return (
    <div>
      <div style={{ width: "95%" }}>
        <div
          style={{
            paddingBottom: "5px",
            marginTop: "5px",
            paddingTop: "5px",
            marginBottom: "15px",
            fontFamily: "MadimiOne",
            fontSize: "24px",
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Players Infomation
        </div>
        <div
          style={{
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
          }}
        >
          {" "}
          <span style={{ fontFamily: "MadimiOne", fontSize: "18px " }}>
            {" "}
            <Select
              options={allPlayers}
              styles={colourStyles}
              placeholder={allPlayers[currentPlayerIndex]?.label + ""}
              onChange={handlePlayerChange}
            />
          </span>
        </div>
      </div>
      <div
        style={{
          paddingTop: "20px",
          fontWeight: "bold",
          fontSize: "24px",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: "rotateX(30deg)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {" "}
        <span
          style={{
            color: "#CAF8F4",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "MadimiOne",
          }}
        >
          Name : {selectedPlayer?.playerName}
        </span>
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: "rotateX(30deg)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          fontFamily: "MadimiOne",
        }}
      >
        {" "}
        <span
          style={{
            color: "#F4FF7A",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "MadimiOne",
          }}
        >
          Budget : {selectedPlayer?.crewInfo.budget}
        </span>
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: "rotateX(30deg)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0)",
          fontFamily: "MadimiOne",
        }}
      >
        {" "}
        <span
          style={{
            color: "#070303",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Current Region : ({selectedPlayer?.crewInfo.currentRegion.x + 1},
          {selectedPlayer?.crewInfo.currentRegion.y + 1})
        </span>
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: "rotateX(30deg)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          fontFamily: "MadimiOne",
        }}
      >
        {" "}
        <span
          style={{
            color: "#070303",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0)",
          }}
        >
          City Center :{" "}
          {selectedPlayer?.crewInfo.cityCenter
            ? "(" +
              selectedPlayer?.crewInfo.cityCenter.x +
              ", " +
              selectedPlayer?.crewInfo.cityCenter.y +
              ")"
            : "(Lost City Center)"}
        </span>
      </div>

      {selectedPlayer?.playerName == sessionStorage.getItem("playername") ? (
        <div>
          <IdentifierComponent
            identifier={selectedPlayer?.identifier}
          ></IdentifierComponent>
        </div>
      ) : (
        <div
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: "rotateX(30deg)",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <span
            style={{
              color: "skyblue",
              fontFamily: "MadimiOne",
              textShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Identifier : (Secret)
          </span>
        </div>
      )}
    </div>
  );
}
export default PlayerInfo;
