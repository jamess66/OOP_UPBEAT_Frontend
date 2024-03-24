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
          // borderRight: "1px solid #83769C",
          paddingRight: "10px",
          // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          marginTop: "35px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#6D5A92",
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
              backgroundColor: "#6D5A92",
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
              backgroundColor: "#6D5A92",
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
            backgroundColor: "#6D5A92",
            color: "#f4f4f4f4",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            transition: "box-shadow 0.3s, transform 0.3s",
            transform: "scale(1)",
            width: "50px",
            height: "50px",
            fontFamily: "MadimiOne",
            marginTop: "35px",
          }}
          onClick={handleOnSwap}
        >
          {sw === 0 ? (
            <img
              src="people.png"
              style={{
                height: "25px",
                width: "25px",
                transform: "translate(50%, 2%)",
              }}
            ></img>
          ) : (
            ""
          )}
          {sw === 1 ? (
            <img
              src="terminal.png"
              style={{
                height: "30px",
                width: "30px",
                transform: "translate(33%, 2%)",
              }}
            ></img>
          ) : (
            ""
          )}
          {sw === 2 ? "Hide" : ""}
        </button>
      </div>

      <div style={{ marginLeft: "6%" }}>
        <div
          style={{
            marginLeft: "center",
            marginRight: "center",
            width: "108%",
            backgroundColor: "#6D5A92",
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
              fontFamily: "MadimiOne",
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
