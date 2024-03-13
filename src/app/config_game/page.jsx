"use client";
import React, { useState } from "react";
import ConfigList from "../component/configList";
import axios from "axios";
import "../styles/setplayergame.css";
async function fetchUsers() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data;
    console.log("List of users:");
    console.log(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}
fetchUsers();

const ConfigurationPanel = ({ disable }) => {
  const configItems = [
    "Number of Rows",
    "Number of Columns",
    "Initial Planning Specification Time",
    "Initial Budget",
    "Initial City Center Deposit",
    "Planning Revision Time",
    "Plan Revision Cost",
    "Max Deposit",
    "Interest Rate Percentage",
  ];

  // State to manage slider values
  const defaultValues = [20, 15, 5, 10000, 100, 30, 100, 1000000, 5];
  // State to manage slider values
  const [sliderValues, setSliderValues] = useState(defaultValues);
  // Maximum values for each slider
  const maxValues = [20, 20, 60, 50000, 1000, 60, 1000, 10000000, 100];
  // Steps for each slider
  const steps = [1, 1, 1, 1000, 100, 1, 100, 1000000, 1];

  const handleSliderChange = (index, value) => {
    // Update the slider value in the state
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  return (
    <div className="background">
      <div className="text-4xl font-bold mb-2 text-white uppercase text-center">
        game config
      </div>
      {configItems.map((text, index) => (
        <div key={index} className="text-white">
          <ConfigList text={text} />
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center">
              <div>
                <button
                  className="mr-2 px-2 bg-white text-black font-bold rounded hover:scale-110 transition duration-75"
                  onClick={() => {
                    if (sliderValues[index] == 0) {
                      return;
                    }
                    handleSliderChange(
                      index,
                      sliderValues[index] - steps[index]
                    );
                  }}
                  disabled={disable}
                >
                  -
                </button>
              </div>

              <div className="text-center font-bold">
                {sliderValues[index]}
                {/* {units[index]} */}{" "}
                {/* Uncomment this line to display units */}
              </div>

              <div>
                <button
                  className="ml-2 mt-1 px-2 bg-white text-black font-bold rounded hover:scale-110 transition duration-75"
                  onClick={() => {
                    if (sliderValues[index] >= maxValues[index]) {
                      return;
                    }
                    handleSliderChange(
                      index,
                      sliderValues[index] + steps[index]
                    );
                  }}
                  disabled={disable}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <input
                type="range"
                className="slider w-full lg:w-96 mt-1" // Adjust the width here
                value={sliderValues[index]}
                max={maxValues[index]}
                step={steps[index]}
                onChange={(e) =>
                  handleSliderChange(index, parseInt(e.target.value))
                }
                disabled={disable}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        className="buttonback justify-center text-white justify-items-center items-center"
        id="forbackstep"
      >
        Back
      </button>
      <button
        className="buttonback justify-center text-white justify-items-center items-center"
        id=""
      >
        {" "}
        Save{" "}
      </button>
    </div>
  );
};

export default ConfigurationPanel;
