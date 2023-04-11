import React, { useState } from "react";
// import map from "../assets/images/map.jpg";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { clearState } from "../actions/mapActions";

const LandingPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const jobDetails = {
    location: " St Judes Hospital",
    location_detail: "Sarasota,FL. 33178",
    start_date: 10,
    start_date_month: "October",
    end_date: "17",
    end_date_month: "December",
    no_of_rooms: 20,
    no_of_single_rooms: 10,
    no_of_double_rooms: 10,
  };

  const { hotels, center, roomRequirements, dateRange } = useSelector(
    (state) => state.map
  );

  return (
    <div className="landing-page">
      <div className="map-container">
        <Map hotels={hotels} center={center} />
      </div>

      <footer className="footer-container">
        <Row justify="space-between" align="middle">
          <Col span={14} className="details">
            <div className="detail pl-0">
              <span className="title">{center?.string}</span>
            </div>
            <div className="detail flex">
              <div>
                <span className="title">
                  {moment(dateRange[0]).format("DD")}
                </span>
                <span className="description">
                  {moment(dateRange[0]).format("MMMM")}
                </span>
              </div>
              <span className="title">-</span>
              <div>
                <span className="title">
                  {moment(dateRange[1]).format("DD")}
                </span>
                <span className="description">
                  {moment(dateRange[1]).format("MMMM")}
                </span>
              </div>
            </div>
            <div className="detail">
              <span className="title">Rooms</span>
              <span className="description">
                {/* {jobDetails.no_of_single_rooms > 0 ? jobDetails.no_of_single_rooms + ' Singles' : null} {jobDetails.no_of_double_rooms > 0 ? ', ' + jobDetails.no_of_double_rooms + ' Doubles' : null} */}

                {roomRequirements.single > 0
                  ? roomRequirements.single + " Singles"
                  : null}
                {roomRequirements.double > 0
                  ? ", " + roomRequirements.double + " Doubles"
                  : null}
                {roomRequirements.animalSupport > 0
                  ? ", " + roomRequirements.animalSupport + " Animal Support"
                  : null}
              </span>
            </div>
          </Col>
          <Col span={5}>
            <button
              className="footer-btn"
              onClick={() => {
                navigate("/auth", {
                  state: {
                    location: center,
                    dateRange,
                    roomRequirements,
                  },
                  // state: jobDetails
                });
                // dispatch(clearState());
              }}
            >
              Confirm and request
            </button>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default LandingPage;
