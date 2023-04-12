import React, { useState } from "react";
// import map from "../assets/images/map.jpg";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { clearState } from "../actions/mapActions";
import Footer from "../components/layout/Footer";

const LandingPage = () => {


  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const jobDetails = {
  //   location: " St Judes Hospital",
  //   location_detail: "Sarasota,FL. 33178",
  //   start_date: 10,
  //   start_date_month: "October",
  //   end_date: "17",
  //   end_date_month: "December",
  //   no_of_rooms: 20,
  //   no_of_single_rooms: 10,
  //   no_of_double_rooms: 10,
  // };

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
