import React, { useState } from "react";
import map from "../assets/images/map.jpg";
import Map from "../components/Map";
import { useSelector } from "react-redux";
const LandingPage = () => {
  const { hotels, center } = useSelector((state) => state.map);
  return (
    <div className="landing-page">
      <div
        style={{
          height: "80vh",
        }}
      >
        <Map hotels={hotels} center={center} />
      </div>
    </div>
  );
};

export default LandingPage;
