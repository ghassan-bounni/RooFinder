import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="home">
      <div className="intro">
        <h1>Header Goes Here</h1>
        <p>
          Automating the process of finding rooftop segments for solar
          photovoltaic panel installations to drastically reduce the cost and
          make this information easily available for both building owners and
          solar energy developers.
        </p>
      </div>
      {children}
    </div>
  );
};

export default Wrapper;
