"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const AlarmClock = () => {
  const refreshInterval = 1000; // refresh every 5 sec

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const [isLose, setIsLose] = useState(false);
  const [remainingTime, setRemainingTime] = useState();
  const [reserveTime, setReserveTime] = useState();

  const [player, setPlayer] = useState();

  const [players, setPlayers] = useState([]);
  const [currentTurnPlayer, setcurrentTurnPlayer] = useState();

  const fetchPlayerTurn = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/isPlayerTurn/${sessionStorage.getItem("playername")}`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setIsPlayerTurn(data);
      } else {
        console.error("Error fetching time data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("serveradress")}:8080/players`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // console.log("Received data:", data);
          setPlayers(data);
        }
      } else {
        console.error("Error fetching player data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const getPlayerTimes = async () => {
    try {
      const response = await axios.get(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/times/${sessionStorage.getItem("playername")}`
      );
      //console.log(response.data);
      check();
      if (isPlayerTurn == true) {
        setRemainingTime(response.data.planTime);
      } else {
        setRemainingTime(response.data.initPlanTime);
        UpdatePlayerPlanTime(response.data.initPlanTime);
      }
      setReserveTime(response.data.reserveTime);
      //console.log(response);
    } catch (error) {
      console.log("Error posting username", error);
    }
  };

  const UpdatePlayerReserveTime = async (time) => {
    try {
      const response = await axios.put(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/updateReserveTime/${sessionStorage.getItem("playername")}`,
        time,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      //console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const UpdatePlayerPlanTime = async (time) => {
    try {
      const response = await axios.put(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/updatePlanTime/${sessionStorage.getItem("playername")}`,
        time,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const checkIsLost = async () => {
    try {
      const name = sessionStorage.getItem("playername");
      const response = await axios.get(
        `http://${localStorage.getItem("serveradress")}:8080/player/${name}`
      );

      if (response.data) {
        setPlayer(response.data);
        if (response.data.crewInfo.cityCenter == null) {
          //window.alert("You lose!! Return to main page.");
          setIsLose(true);
        }
      }
    } catch (error) {
      console.error("Error checking data:", error);
    }
  };

  const deletePlayer = async (name) => {
    try {
      const response = await axios.delete(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/removePlayer/${sessionStorage.getItem("playername")}`
      );

      window.alert("You lose!! Return to main page.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const check = async () => {
    await checkIsLost();
    if (isLose) {
      deletePlayer();
      sessionStorage.clear();
    }
  };

  const outOfTime = async () => {
    try {
      const response = await axios.put(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/constructionPlan/${sessionStorage.getItem("playername")}`,
        "OUT-OF_TIME-TURN_END-NOW",
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      check();
      console.log("out of time");
      window.alert("Out of Time!! Your turn ended.");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    getPlayerTimes();
  }, [isPlayerTurn]);

  useEffect(() => {
    check();
    const intervalId = setInterval(check, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchPlayers();
    const intervalId = setInterval(fetchPlayers, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchPlayerTurn();
    const intervalId = setInterval(fetchPlayerTurn, refreshInterval);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    if (isPlayerTurn === true) {
      if (remainingTime > 0) {
        const countdownInterval = setInterval(() => {
          setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
          UpdatePlayerPlanTime(remainingTime);
        }, 1000);

        return () => {
          clearInterval(countdownInterval);
        };
      } else {
        const countdownReserveInterval = setInterval(() => {
          setReserveTime((prevReserveTime) => prevReserveTime - 1000);
          UpdatePlayerReserveTime(reserveTime);
          if (reserveTime <= 0) {
            UpdatePlayerReserveTime(0);
            outOfTime();
            UpdatePlayerReserveTime(0);
          }
        }, 1000);

        return () => {
          clearInterval(countdownReserveInterval);
        };
      }
    }
  }, [reserveTime, remainingTime, isPlayerTurn]);

  const formatTime = (time) => {
    if (time <= 0) return "00:00";
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    players.map((p) => {
      if (p.isPlayerTurn == true) {
        setcurrentTurnPlayer(p);
      }
    });
  }, [players]);

  useEffect(() => {
    console.log("curre", currentTurnPlayer);
  }, [currentTurnPlayer]);
  return (
    <div
      style={{
        fontFamily: "MadimiOne",
        fontSize: "18px",
        fontWeight: "bold",
        color: "whitesmoke",
        textShadow: "2px 4px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div>
        <span>
          <span style={{ color: "whitesmoke" }}>Player:</span>{" "}
          <span
            style={{
              color: `${player?.crewInfo.playerColor}`,
              textShadow: " 1px 1px 3px rgba(0, 0, 0, 0.4)",
            }}
          >
            {player?.playerName}
          </span>
        </span>
        <span>
          {" "}
          <div
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",

              borderRadius: "5px",
              transform: "translate(30%, 20%)",
              boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.9)",
              background: `${player?.crewInfo.playerColor}`,
            }}
          ></div>
        </span>
      </div>
      <div>
        <span>
          <span style={{ color: "#B7FEEE" }}>Current Turn:</span>{" "}
          <span
            style={{
              color: `${currentTurnPlayer?.crewInfo.playerColor}`,
              textShadow: " 1px 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            {currentTurnPlayer?.playerName == player?.playerName
              ? "Your Turn"
              : currentTurnPlayer?.playerName}
          </span>
        </span>
        <span>
          {" "}
          <div
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              borderRadius: "5px",
              transform: "translate(30%, 20%)",
              boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.9)",
              background: `${currentTurnPlayer?.crewInfo.playerColor}`,
            }}
          ></div>
        </span>
      </div>

      <p>
        <span style={{ color: "#A7FFD0" }}>Time remaining</span> :{" "}
        {formatTime(remainingTime)}
      </p>
      <p>
        {" "}
        <span style={{ color: "#F9FFC8" }}>Reserve Time</span> :{" "}
        {formatTime(reserveTime)}
      </p>
    </div>
  );
};

export default AlarmClock;
