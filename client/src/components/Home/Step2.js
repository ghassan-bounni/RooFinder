import React, { useState } from "react";
import segmentation from "../../images/segmentation.png";

const Step2 = ({ prevStep, nextStep, handleChange }) => {
  const [results, setResults] = useState({
    images: [
      {
        image: segmentation,
        title: "Rooftop 1",
        checked: false,
      },
      {
        image: segmentation,
        title: "Rooftop 2",
        checked: false,
      },
      {
        image: segmentation,
        title: "Rooftop 3",
        checked: false,
      },
      {
        image: segmentation,
        title: "Rooftop 4",
        checked: false,
      },
      {
        image: segmentation,
        title: "Rooftop 5",
        checked: false,
      },
    ],
  });
  return (
    <div className="step2" style={{ width: "70%" }}>
      <div className="intro">
        <h2>Step 2</h2>
        <p>Select a rooftop from the list below to analyze.</p>
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
            src={segmentation}
            alt="segmentation"
            style={{ width: "100%" }}
          />
        </div>

        <ul
          style={{
            listStyleType: "none",
            overflowY: "scroll",
            width: "400px",
            height: "250px",
          }}
        >
          {results.images.map((item, index) => {
            return (
              <li
                key={index}
                style={{
                  display: "flex",
                  margin: "5px",
                  justifyContent: "space-evenly",
                  padding: "5px",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  value={index}
                  defaultChecked
                  hidden
                />
                <p style={{ width: "100px" }}>{item.title}: </p>
                <img
                  src={item.image}
                  alt="Rooftop"
                  style={{
                    width: "100px",
                    border: item.checked ? "3px solid #06d6d6" : "none",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    const temp = results.images;
                    temp[index].checked = !temp[index].checked;
                    setResults({ ...results, images: temp });
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="nav">
        <button onClick={prevStep} className="button">
          Back
        </button>
        <button className="button">Analyze</button>
      </div>
    </div>
  );
};

export default Step2;
