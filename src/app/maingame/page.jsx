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
        backgroundColor: "#0e1529",
        padding: "2%",
      }}
      suppressHydrationWarning
    >
      <div
        style={{
          alignSelf: "flex-start",
          width: "30%",
          borderRight: "1px solid #83769C",
          paddingRight: "10px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#83769C",
            borderRadius: "10px",
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
        {sw == 1 ? <PlayerInfo /> : <></>}
      </div>

      <div style={{ width: "10%", paddingRight: "100px", paddingLeft: "10px" }}>
        <button onClick={handleOnSwap}>
          {sw == 0 ? "Player Info" : ""}
          {sw == 1 ? "Construction Plan" : ""}
          {sw == 2 ? "Hide" : ""}
        </button>
      </div>

      <div>
        Territory
        <Hexagon />
      </div>
    </div>
  );
}

export default page;
