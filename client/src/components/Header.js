import React from "react";
import "../styles/Header.css";
import RooFinderLOGO from "./RooFinderLOGO";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <RooFinderLOGO
          style={{ height: "35px", marginRight: "1em" }}
          fill="#16f8f8"
        />{" "}
        RooFinder
      </div>
      <div className="nav">
        <ul className="navlinks">
          <Link to="/" className="navlink">
            Home
          </Link>
          <Link to="/about" className="navlink">
            About
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
