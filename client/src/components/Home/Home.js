import React, { useState } from "react";
import Axios from "axios";
import "../../styles/Home.css";
import Step1 from "./Step1";
import Wrapper from "./Wrapper";
import Step2 from "./Step2";

const Home = () => {
  const [state, setState] = useState({
    step: 1,
    scale: 0,
    image: null,
    data: null,
  });

  // go back to previous step
  const prevStep = () => {
    setState({ ...state, step: state.step - 1 });
  };
  // go to the next step
  const nextStep = () => {
    setState({ ...state, step: state.step + 1 });
  };

  const fetchSegmentedImage = async () => {
    const response = await Axios.post(
      "/api/segment",
      {
        scale: state.scale,
        image: state.image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setState({
      ...state,
      step: state.step + 1,
      data: response.data,
    });
  };
  // handle field change
  const handleChange = (input) => (e) => {
    setState({
      ...state,
      [input]: input === "image" ? e.target.files[0] : e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSegmentedImage();
  };

  switch (state.step) {
    case 1:
      return (
        <Wrapper>
          <Step1
            nextStep={nextStep}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={state}
          />
        </Wrapper>
      );
    case 2:
      return (
        <Wrapper>
          <Step2
            prevStep={prevStep}
            // nextStep={nextStep}
            handleChange={handleChange}
            data={state.data}
          />
        </Wrapper>
      );
    default:
      break;
  }
};

export default Home;
