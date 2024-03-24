import React from "react";

function IdentifierComponent({ identifier }) {
  const propertyNames = Object.keys(identifier);

  console.log(propertyNames);
  return (
    <div
      style={{
        fontFamily: "MadimiOne",
        fontSize: "22px",
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2>Identifier:</h2>
      <div>
        {propertyNames.map((propertyName) => (
          <div key={propertyName} style={{ paddingLeft: "30px" }}>
            {propertyName}: {identifier[propertyName]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdentifierComponent;
