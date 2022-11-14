// import React, { useState } from "react";

const Step2 = ({ prevStep, nextStep, data }) => {
  return (
    <div className="step2" style={{ width: "70%" }}>
      <div className="intro">
        <h2>Results</h2>
        {/* <p>Select a rooftop from the list below to analyze.</p> */}
      </div>
      <div className="nav" style={{ justifyContent: "flex-start" }}>
        <button onClick={prevStep} className="button">
          Back
        </button>
        {/* <button className="button">Analyze</button> */}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "250px",
            height: "250px",
            border: "2px solid #06d6d6",
            borderRadius: "2px",
            margin: "6px",
          }}
        >
          <img
            src={
              "http://ec2-3-144-193-133.us-east-2.compute.amazonaws.com/" +
              data.masked_img
            }
            alt="segmentation"
            style={{ width: "100%" }}
          />
        </div>

        <ul
          style={{
            listStyleType: "none",
            overflowY: "scroll",
            width: "500px",
            height: "250px",
          }}
        >
          {data.cropped.map((item, index) => {
            // if (item.area > 70) {
            return (
              <li
                key={index}
                style={{
                  display: "flex",
                  margin: "5px",
                  justifyContent: "space-around",
                  padding: "5px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ width: "140px" }}>
                  <p>Rooftop {index}:</p>
                  <p>Area: {item.area} m^2</p>
                  <p>Type: {item.type}</p>
                </div>
                <img
                  src={
                    "http://ec2-3-144-193-133.us-east-2.compute.amazonaws.com/" +
                    item.path
                  }
                  alt="Rooftop"
                  style={{
                    width: "100px",
                    border: item.checked ? "3px solid #06d6d6" : "none",
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Step2;
