import "../styles/Contact.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ghassan from "../images/ghassan.jpg";
import habib from "../images/habib.jpg";
import hussein from "../images/hussein.jpg";

const Contact = () => {
  return (
    <div>
      <h1 style={{ margin: "1em" }}>Reach out!</h1>
      <div className="contact">
        <div className="contact-box">
          <img
            src={ghassan}
            width="250px"
            alt="ghassan"
            style={{ border: "2px solid #06d6d6", borderRadius: "5px" }}
          />
          <p>Ghassan El Bounni</p>
          <div className="links">
            <a
              href="https://github.com/ghassan-bounni"
              className="button"
              style={{ display: "block", width: "50%" }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/ghassan-el-bounni/"
              style={{ display: "block", width: "50%" }}
              className="button"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="contact-box">
          <img
            src={habib}
            width="250px"
            alt="habib"
            style={{ border: "2px solid #06d6d6", borderRadius: "5px" }}
          />
          <p>Habib Mrad</p>
          <div className="links">
            <a
              href="https://github.com/HabibMrad"
              className="button"
              style={{ display: "block", width: "50%" }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/habib-mrad-7108b9148/"
              style={{ display: "block", width: "50%" }}
              className="button"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="contact-box">
          <img
            src={hussein}
            width="250px"
            alt="hussein"
            style={{ border: "2px solid #06d6d6", borderRadius: "5px" }}
          />
          <p>Hussein Bashir</p>
          <div className="links">
            <a
              href="https://github.com/hseinb"
              className="button"
              style={{ display: "block", width: "50%" }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/husseinbashir/"
              style={{ display: "block", width: "50%" }}
              className="button"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
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

export default Contact;
