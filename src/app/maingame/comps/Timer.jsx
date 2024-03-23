"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const AlarmClock = () => {
  const refreshInterval = 1000; // refresh every 5 sec

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isLose, setIsLose] = useState(false);
  const [remainingTime, setRemainingTime] = useState();
  const [reserveTime, setReserveTime] = useState();

  const fetchPlayerInfo = async () => {
    try {
      const name = sessionStorage.getItem("playername");
      const response = await fetch(
        `http://${localStorage.getItem("serveradress")}:8080/player/${name}`
      );

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error checking data:", error);
    }
  };

  useEffect(() => {
    fetchPlayerInfo();
    const intervalId = setInterval(fetchPlayerInfo, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  const fetchPlayerTurn = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/isPlayerTurn/${sessionStorage.getItem("playername")}`
      );
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        setIsPlayerTurn(data);
      } else {
        console.error("Error fetching time data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
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

  const UpdatePlayerReserveTime = async () => {
    try {
      const response = await axios.put(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/updateReserveTime/${sessionStorage.getItem("playername")}`,
        reserveTime,
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

      if (response && response.data) {
        if (response?.data.crewInfo.cityCenter == null) {
          //window.alert("You lose!! Return to main page.");
          await deletePlayer(name);
          setIsLose(true);
          //sessionStorage.clear();
          //window.location.href = "/";
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
        )}:8080/removePlayer/${name}`
      );
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    getPlayerTimes();
  }, [isPlayerTurn]);

  checkIsLost();

  if (isLose) {
    window.alert("You lose!! Return to the main page.");
    sessionStorage.removeItem("playername");
    window.location.href = "/";
  }

  useEffect(() => {
    fetchPlayerTurn();
    const intervalId = setInterval(fetchPlayerTurn, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

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
          UpdatePlayerReserveTime();
        }, 1000);

        return () => {
          clearInterval(countdownReserveInterval);
        };
      }
    }
  }, [reserveTime, remainingTime, isPlayerTurn]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        fontFamily: "anakotmai",
        fontSize: "18px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h1 style={{ color: "#FFFF00" }}>Planning : {<getName></getName>}</h1>
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
