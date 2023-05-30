import React from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";
import Footer from "../components/layout/Footer";

const LandingPage = () => {

  const { hotels, center, roomRequirements, dateRange } = useSelector(
    (state) => state.map
  );

  const totalRooms = roomRequirements.single + roomRequirements.double;

  return (
    <div className="landing-page">
      <div className="map-container">
        <Map hotels={hotels} center={center} />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
