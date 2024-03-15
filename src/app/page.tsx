"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClickable, setIsClickable] = useState(true);

  const handlePlayClick = async () => {
    setIsClickable(false);
    let serverAdress;
    if (!localStorage.getItem("serveradress")) {
      serverAdress = prompt("Enter server adress.", "192.168.XXX.XXX");
    } else {
      serverAdress = localStorage.getItem("serveradress");
    }

    await checkServer(serverAdress ? serverAdress : "");
  };

  const checkServer = async (adress: string) => {
    try {
      const response = await axios.get(`http://${adress}:8080/check`, {
        timeout: 2000,
      });
      localStorage.setItem("serveradress", adress);
      const savedName = sessionStorage.getItem("playername");
      if (savedName) {
        window.alert(`Welcome back, ${savedName}`);
        window.location.href = "/lobby";
      } else {
        window.alert("Welcome! Create your crew now.");
        window.location.href = "/createPlayer";
      }
    } catch (error) {
      setIsClickable(true);
      console.error("Error API server:", error);
      window.alert(error);
    }
  };

  return (
    <main className="background justify-center items-center flex flex-col ">
      <Image src="/UPBEATfont.png" alt="Cover" width={800} height={600} />
      <div className=" mt-16">
        <button
          onClick={handlePlayClick}
          className="buttonplay"
          disabled={!isClickable}
        >
          {isClickable ? "Play" : "Loading"}
        </button>
      </div>
    </main>
  );
}
