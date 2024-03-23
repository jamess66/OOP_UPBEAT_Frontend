import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

import "./constructionplan.css";

function constructionPlanTab() {
  const [stringConstructionPlan, setStringConstructionPlan] = useState("");

  const constructionSubmit = async () => {
    try {
      const response = await axios.put(
        `http://${localStorage.getItem(
          "serveradress"
        )}:8080/constructionPlan/${sessionStorage.getItem("playername")}`,
        stringConstructionPlan,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log(response.data);
      window.alert(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(
      /[^A-Za-z0-9+\-*/{}()^=#\s]/g,
      ""
    );
    setStringConstructionPlan(sanitizedValue);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(stringConstructionPlan);
    constructionSubmit();
  };

  return (
    <div>
      <div
        style={{
          paddingBottom: "30px",
          paddingTop: "10px",
          fontFamily: "Anakotmai",
          fontSize: "20px",
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        Construction Plan
      </div>
      <form style={{ marginLeft: "20px" }} onSubmit={handleSubmit}>
        <textarea
          value={stringConstructionPlan}
          onChange={handleChange}
          placeholder="Write your construction plan here."
          className="input_box"
          style={{
            resize: "none",
            width: "95%",
          }}
        ></textarea>
        <button
          className="bg-lime-500 size-7/12 min-h-12 rounded-2xl transition-all duration-200 transform hover:scale-110 hover:shadow-lg focus:outline-none"
          style={{
            color: "black",
            marginLeft: "17%",
            fontFamily: "Anakotmai",
            fontWeight: "bold",
            perspective: "1000px",
            transitionDuration: "0.4s",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default constructionPlanTab;
