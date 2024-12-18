import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  useEffect(() => {
    const a = sessionStorage.getItem("constructionPlan");
    if (a) {
      setStringConstructionPlan(a);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("constructionPlan", stringConstructionPlan);
  });
  return (
    <div>
      <div
        style={{
          paddingBottom: "5px",
          marginTop: "5px",
          paddingTop: "5px",
          marginBottom: "10px",
          fontFamily: "MadimiOne",
          fontSize: "20px",
          fontWeight: "bold",
          paddingRight: "35px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          justifyContent: "center",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
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
            // height: "400px",
            fontFamily: "MadimiOne",
          }}
        ></textarea>
        <button
          className="bg-lime-500 size-7/12 min-h-12 rounded-2xl transition-all duration-200 transform hover:scale-110 hover:shadow-lg focus:outline-none"
          style={{
            color: "black",
            marginLeft: "26%",
            fontFamily: "MadimiOne",
            fontWeight: "bold",
            perspective: "1000px",
            transitionDuration: "0.4s",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            width: "40%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            justifyItems: "center",
            justifySelf: "center",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default constructionPlanTab;
