import "../styles/About.css";
import React from "react";

const About = () => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBlock: "1em" }}>Problem definition and motivation</h1>
      <p style={{ maxWidth: "800px", textAlign: "center" }}>
        Solar energy is a favorable and freely available resource to address the
        coming energy breaking point without polluting the environment. Unlike
        traditional fossil fuels, it will not run out quickly.
        <br /> <br />
        Solar panels also cool buildings by acting as "roof shades”. While a
        roof without panels would allow heat to enter the building, they absorb
        the sun's rays and direct them away from the roof.
        <br />
        <br /> Calculating each rooftop's solar potential can take anywhere from
        one hour to two full days, making the rooftop solar assessment process
        time-consuming and costly. Due to this, the unit economics of solar
        projects have significantly deteriorated, with the cost of sales
        accounting for up to 40% of total project costs in the solar industry.{" "}
        <br /> <br /> Solar panels are a great option for people who want to "go
        green" and protect the environment around the world. However, the
        utility sector requires intelligent systems that can effectively enhance
        the integration of renewable energy sources. <br />
        <br />
        Automating the process of finding rooftops for solar photovoltaic
        installations to drastically reduce the cost and make this information
        easily available for both building owners and solar energy developers.
        <br /> <br />
        The objective of the project is to develop one or multiple combined
        Machine Learning models that can automatically identify rooftops and
        detect rooftop features like obstacles, material, slopes, and area from
        high-resolution satellite imagery.
      </p>
      <h1 style={{ marginBlock: "1em" }}>Technical perspectives</h1>
      <h3 style={{ maxWidth: "800px" }}>
        The model output consists of the following:
      </h3>
      <ol>
        <li>Bounding and segmentation of the rooftops.</li>
        <li>Rooftop Type, Material, and characteristics.</li>
        <li>Calculation of the total area of the rooftop.</li>
      </ol>
      <h1 style={{ marginBlock: "1em" }}>Previous solutions and approaches</h1>
      <div style={{ maxWidth: "800px", marginBlock: "1em" }}>
        <h3 style={{ marginBottom: "10px" }}>
          End-to-End solution based on U-NET architectures which consists of:
        </h3>
        <ul>
          <li>Input: Capturing aerial/satellite image and its scaling</li>
          <li>
            ML model for Roof segmentation + classification model + image
            processing
          </li>
          <li>
            Output: Labeled image + Extracted roof + type and area of the roof +
            solar panel placement
          </li>
        </ul>
      </div>
      <div
        style={{ maxWidth: "800px", textAlign: "center", marginBlock: "2em" }}
      >
        <h3 style={{ marginBottom: "10px" }}>
          Other primitive non-End-to-End approaches consisting on separate tasks
          and for each task, a model was assigned:
        </h3>
        <ul>
          <li>
            Image Segmentation + First classification stage (ANN) + Second
            classification stage (SVM): K-means clustering is used for image
            segmentation based on the intensity values of the image.
          </li>
          <br />
          <li>
            The ANN classifier is then trained to distinguish between rooftop
            regions and non- rooftop regions. A second classification stage
            using SVM helps to detect initially missed rooftops and reduces
            false positives in the first classification result.
          </li>
        </ul>
      </div>
      <h1 style={{ marginBlock: "1em" }}>
        The proposed approach to solving the problem
      </h1>
      <div style={{ maxWidth: "800px", marginBlock: "1em" }}>
        <h3 style={{ marginBottom: "10px" }}>
          Our approach consists of the following steps:
        </h3>
        <ul>
          <li>
            A mask R-CNN based model used for segmenting an aerial/satellite
            image, rescale it and applying the model in order to detect the
            segmented roofs of an image (area containing many rooftops).
          </li>
          <li>
            Each roof is then cropped and classified using a simple CNN
            (pretrained VGG-16) classifier in order to detect roof type (steel,
            concrete, bricks).
          </li>
          <li>
            Using image processing and scaling units, we can calculate the total
            area of available clean rooftop for solar panels installation.
          </li>
        </ul>
      </div>
      <p
        style={{
          position: "fixed",
          bottom: "3%",
          left: "2%",
          // color: "#bcbcbc",
        }}
      >
        Trinity-AI
      </p>
    </div>
  );
};

export default About;
