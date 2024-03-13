import React from "react";

const ConfigList = ({ text = "text" }) => {
  return (
    <div className="text-center uppercase">
      <p>{text}</p>
    </div>
  );
};

export default ConfigList;
