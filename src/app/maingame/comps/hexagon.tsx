"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

import "./hexagon.css";
import "../style.css";

interface HexRegion {
  regionColor: string;
  deposit: number;
  max_deposit: number;
  x: number;
  y: number;
}

interface HexGrid {
  grid: HexRegion[][];
  rows: number;
  cols: number;
}

interface PlayerInstance {
  playerName: string;
  crewInfo: crewInfo;
}

interface crewInfo {
  playerColor: string;
  buget: number;
  cityCenter: HexRegion;
  currentRegion: HexRegion;
}

interface HexRegion {
  regionColor: string;
  deposit: number;
  max_deposit: number;
  x: number;
  y: number;
}

function Hexagon() {
  const refreshInterval = 2000; // refresh every 1 sec
  const [HexGrid, setHexGrid] = useState<HexGrid>({
    grid: [],
    rows: 0,
    cols: 0,
  });

  const [playerData, setPlayerData] = useState<PlayerInstance[]>([]);

  const fetchTerritory = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("serveradress")}:8080/territory`
      );
      if (response.ok) {
        const data: HexGrid = await response.json();
        setHexGrid(data);
      } else {
        console.error("Error fetching player data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("serveradress")}:8080/players`
      );
      if (response.ok) {
        const data = await response.json();
        setPlayerData(data);
      } else {
        console.error("Error fetching player data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };
  console.log(playerData);
  useEffect(() => {
    fetchPlayers();

    const intervalId = setInterval(fetchPlayers, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchTerritory();

    const intervalId = setInterval(fetchTerritory, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  const isCityCenter = (
    players: PlayerInstance[],
    i: number,
    j: number
  ) => {
    let isCC = false;
    players.forEach((p) => {
      if (p.crewInfo.cityCenter?.x == i && p.crewInfo.cityCenter?.y == j)
        isCC = true;
    });

    return isCC;
  };

  const arr: number[] = Array(HexGrid.cols).fill(0) || [];
  const arr2: number[][] = Array(HexGrid.rows).fill(arr) || [];

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
      >
        <button
          className="zoomController"
          onClick={() => zoomIn(0.1)}
          style={{
            padding: "5px",
            backgroundColor: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            transition: "transform 0.3s",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Zoom In
        </button>
        <button
          className="zoomController"
          onClick={() => zoomOut(0.1)}
          style={{
            padding: "5px",
            backgroundColor: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            transition: "transform 0.3s",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Zoom Out
        </button>
        <button
          className="zoomController"
          onClick={() => resetTransform(250, "linear")}
          style={{
            padding: "5px",
            backgroundColor: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            transition: "transform 0.3s",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Reset
        </button>
      </div>
    );
  };

  const setContrastText = (color: string) => {
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

  const hexSize = 50; // Set this to the size of your hexagons
  const gridWidth = HexGrid.cols * hexSize;
  const gridHeight = HexGrid.rows * hexSize;

  return (
    <div
      style={{
        width: `${gridWidth}px`,
        height: `${gridHeight + 100}px`,
        overflow: "auto",
        // border: "5px solid #ff9646",
        // borderRadius: "20px",
      }}
    >
      <TransformWrapper>
        <Controls />
        <TransformComponent>
          {arr2.map((data, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                key={i}
              >
                {data.map((ignore, j) => {
                  return (
                    <div
                      key={j}
                      style={{
                        transform: `translate(-${(35 * j) / 4}px, ${
                          j % 2 === 0 ? "21px" : "0px"
                        })`,
                        background: "white",
                        marginTop: j % 2 === 0 ? "3px" : "0px",
                        backgroundColor: `${HexGrid.grid[i][j].regionColor}`,
                      }}
                      className={"hex-grid-content"}
                    >
                      <div>
                        {playerData.map((player: any, index) => {
                          return (
                            <div key={index}>
                              {player.crewInfo.cityCenter?.x == i &&
                              player.crewInfo.cityCenter?.y == j ? (
                                <img
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -30%)",
                                    width: "40px",
                                    height: "40px",
                                  }}
                                  src={`./castle-${
                                    player.crewInfo.playerColor.split("#")[1]
                                  }.png`}
                                />
                              ) : (
                                <></>
                              )}

                              {player.crewInfo.currentRegion?.x == i &&
                              player.crewInfo.currentRegion?.y == j ? (
                                <img
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -43%)",
                                    width: "40px",
                                    height: "35px",
                                  }}
                                  src={`./player-${
                                    player.crewInfo.playerColor.split("#")[1]
                                  }.png`}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div
                        style={{
                          position: "relative",
                          color: `${setContrastText(
                            HexGrid.grid[i][j].regionColor
                          )}`,

                          fontSize: "16px",
                          alignItems: "center",
                          transform: `translate(-50%, -${
                            isCityCenter(playerData, i, j)
                              ? `110`
                              : `50`
                          }%)`,
                          top: "50%",
                          left: "50%",
                        }}
                      >
                        {HexGrid.grid[i][j].regionColor === "#ffffff"
                          ? ""
                          : String(HexGrid.grid[i][j].deposit)}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default Hexagon;
