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
    loading: false,
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
    setState({ ...state, loading: true });
    const response = await Axios.post(
      "http://ec2-3-144-193-133.us-east-2.compute.amazonaws.com/api/segment",
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
      loading: false,
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
