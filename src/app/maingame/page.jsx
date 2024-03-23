"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Timer = dynamic(() => import("./comps/Timer"), { ssr: false });
const ConstructionPlanTab = dynamic(
  () => import("./comps/constructionPlanTab"),
  { ssr: false }
);
const Hexagon = dynamic(() => import("./comps/hexagon"), { ssr: false });
const PlayerInfo = dynamic(() => import("./comps/playerInfo"), { ssr: false });

function page() {
  const [sw, setSw] = useState(0);

  const handleOnSwap = () => {
    setSw((sw + 1) % 2);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#0e1529",
        padding: "2%",
        overflow: "hidden",
      }}
      suppressHydrationWarning
    >
      <div
        style={{
          alignSelf: "flex-start",
          width: "30%",
          borderRight: "1px solid #83769C",
          paddingRight: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#83769C",
            borderRadius: "10px",
            boxShadow: "0px 0px px rgba(255, 255, 255, 0.5)",
          }}
        >
          <Timer></Timer>
        </div>
        {sw == 0 ? (
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#83769C",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <ConstructionPlanTab />
          </div>
        ) : (
          <></>
        )}
        {sw == 1 ? (
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#83769C",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {" "}
            <PlayerInfo />{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div style={{ width: "10%", paddingRight: "100px", paddingLeft: "10px" }}>
        <button
          style={{
            borderRadius: "10px",
            backgroundColor: "#83769C",
            color: "#f4f4f4f4",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            transition: "box-shadow 0.3s, transform 0.3s",
            transform: "scale(1)",
            width: "300%",
            height: "50px",
          }}
          onClick={handleOnSwap}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.8)";
            e.target.style.transform = "scale(1.05)";
            e.target.style.backgroundColor = "#FFCCAA";
            e.target.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
            e.target.style.transform = "scale(1)";
            e.target.style.backgroundColor = "#83769C";
            e.target.style.color = "#f4f4f4f4";
          }}
        >
          {sw === 0 ? "Player Info" : ""}
          {sw === 1 ? "Construction Plan" : ""}
          {sw === 2 ? "Hide" : ""}
        </button>
      </div>

      <div style={{ marginLeft: "6%" }}>
        <div
          style={{
            marginLeft: "center",
            marginRight: "center",
            width: "83%",
            backgroundColor: "#83769C",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: "anakotmai",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Territory
          </p>
        </div>
        <Hexagon />
      </div>
    </div>
  );
}

export default page;
