import React from "react";

function IdentifierComponent({ identifier }) {
  const propertyNames = Object.keys(identifier);

  console.log(propertyNames);
  return (
    <div>
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
