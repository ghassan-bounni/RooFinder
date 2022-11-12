// import React, { useState } from "react";

const Step2 = ({ prevStep, nextStep, handleChange, data }) => {
  // const [results, setResults] = useState({
  //   images: [
  //     {
  //       image: segmentation,
  //       title: "Rooftop 1",
  //       checked: false,
  //     },
  //     {
  //       image: segmentation,
  //       title: "Rooftop 2",
  //       checked: false,
  //     },
  //     {
  //       image: segmentation,
  //       title: "Rooftop 3",
  //       checked: false,
  //     },
  //     {
  //       image: segmentation,
  //       title: "Rooftop 4",
  //       checked: false,
  //     },
  //     {
  //       image: segmentation,
  //       title: "Rooftop 5",
  //       checked: false,
  //     },
  //   ],
  // });
  return (
    <div className="step2" style={{ width: "70%" }}>
      <div className="intro">
        <h2>Results</h2>
        {/* <p>Select a rooftop from the list below to analyze.</p> */}
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
            src={data.masked_img}
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
            if (item.area > 70) {
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
                  {/* <input
                  type="checkbox"
                  checked={item.checked}
                  value={index}
                  hidden
                /> */}
                  <div style={{ width: "120px" }}>
                    <p>Rooftop {index}:</p>
                    <p>Area: {item.area} m^2</p>
                    <p>Type: Brick</p>
                  </div>
                  <img
                    src={item.path}
                    alt="Rooftop"
                    style={{
                      width: "100px",
                      border: item.checked ? "3px solid #06d6d6" : "none",
                    }}
                    // onClick={(e) => {
                    //   const temp = data.cropped;
                    //   temp[index].checked = !temp[index].checked;
                    //   setResults({ ...results, images: temp });
                    // }}
                  />
                </li>
              );
            } else {
              return null;
            }
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
