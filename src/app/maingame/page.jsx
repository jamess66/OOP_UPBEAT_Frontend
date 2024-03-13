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
        }}
      >
        <div>
          <Timer></Timer>
        </div>
        {sw == 0 ? <ConstructionPlanTab /> : <></>}
        {sw == 1 ? <PlayerInfo /> : <></>}
      </div>

      <div style={{ width: "10%", paddingRight: "100px", paddingleft: "10px" }}>
        <button onClick={handleOnSwap}>
          {sw == 0 ? "Player Info" : ""}
          {sw == 1 ? "Cinstruction Plan" : ""}
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
