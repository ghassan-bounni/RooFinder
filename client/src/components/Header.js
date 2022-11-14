import React, { useState } from "react";
import "../styles/Header.css";
import RooFinderLOGO from "./RooFinderLOGO";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showNav, setshowNav] = useState(false);
  return (
    <header>
      <div className="logo">
        <RooFinderLOGO
          style={{ height: "35px", marginRight: "1em" }}
          fill="#16f8f8"
        />
      </div>
      <div className="nav">
        <ul className="navlinks">
          <Link to="/" className="navlink">
            Home
          </Link>
          <Link to="/about" className="navlink">
            About
          </Link>
          <Link to="/contact" className="navlink">
            Contact
          </Link>
          <a
            href="https://github.com/ghassan-bounni/RooFinder"
            className="navlink"
          >
            GitHub Repo
          </a>
        </ul>
      </div>
      <div
        className="nav-menu"
        style={showNav ? { display: "block" } : { display: "none" }}
      >
        <ul className="nav-links">
          <Link to="/" className="navlink" onClick={(e) => setshowNav(false)}>
            Home
          </Link>
          <Link
            to="/about"
            className="navlink"
            onClick={(e) => setshowNav(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="navlink"
            onClick={(e) => setshowNav(false)}
          >
            Contact
          </Link>
          <a
            href="https://github.com/ghassan-bounni/RooFinder"
            className="navlink"
            onClick={(e) => setshowNav(false)}
          >
            GitHub Repo
          </a>
        </ul>
      </div>
      <div
        className="navbar"
        style={{ display: "none", zIndex: "2", fontSize: "1.2em" }}
        onClick={(e) => setshowNav(!showNav)}
      >
        <FontAwesomeIcon icon={!showNav ? faBars : faX} className="navicon" />
      </div>
    </header>
  );
};

export default Header;
