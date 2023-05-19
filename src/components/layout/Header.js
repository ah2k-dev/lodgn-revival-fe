import { Alert, Button, Col, Layout, message, Row, Typography } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../../actions/authActions";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/LODGN.svg";
import { DatePicker, Space } from "antd";
import RoomPicker from "./RoomPicker";
import axios from "axios";
import {
  setCenterData,
  setHotelsData,
  setRoomRequirements,
  setDateRangeRedux,
} from "../../actions/mapActions";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import UrgentBookingModal from "../UrgentBookingModal";

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

const Header = () => {
  const [showRoomPicker, setShowRoomPicker] = useState(false);
  const [showTodayModal, setShowTodayModal] = useState(false);

  const auth = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const { error } = useSelector((state) => state.auth);

  const location = useLocation();

  const jobDetails = location.state;

  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [hotels, setHotels] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const [singleRoom, setSingleRoom] = useState(0);
  const [doubleRoom, setDoubleRoom] = useState(0);
  const [supportAnimal, setSupportAnimal] = useState(0);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: event.target.value,
          // componentRestrictions: { country: "us" },
        },
        (predictions, status) => {
          if (status === "OK") {
            setPlaces(predictions);
          } else {
            setPlaces([]);
          }
        }
      );
    } else {
      setPlaces([]);
    }
  };

  const handleSelect = (place) => {
    setSearch(place.description);
    setPlaces([]);
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: place.place_id }, (result, status) => {
      if (status === "OK") {
        setCenter({
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        });
        dispatch(
          setCenterData({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            string: place.description,
          })
        );
        service.nearbySearch(
          {
            location: result.geometry.location,
            radius: 2000,
            type: "lodging|gas_station|convenience_store",
          },
          (results, status) => {
            if (status === "OK") {
              setHotels(results);
              dispatch(setHotelsData(results));
            }
          }
        );
      }
    });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    // return current < dayjs().endOf('day');

    // Can not select days before today
    // return current && current < moment().startOf('day');

    // Can not select days before today or more than 365 days in the future
    const today = moment().startOf("day");
    return (
      current &&
      (current < today || current > today.clone().add(365, "days").endOf("day"))
    );
  };

  const handleCalendarChange = (values, dateString) => {
    if (dateString && dateString.length === 2) {
      const startDate = moment(new Date(dateString[0]));
      const endDate = moment(new Date(dateString[1]));
      const today = moment();
      setDateRange([startDate.toISOString(), endDate.toISOString()]);
      if (startDate.isSame(today, "day") || endDate.isSame(today, "day")) {
        setShowTodayModal(true);
      }
    }

    // if (dateString && dateString.length === 2) {
    //   // console.log(dateString);
    //   console.log(moment(new Date(dateString[0])).toISOString(),
    //   moment(new Date(dateString[1])).toISOString());
    //   setDateRange([
    //     moment(new Date(dateString[0])).toISOString(),
    //     moment(new Date(dateString[1])).toISOString(),
    //   ]);
    // }
  };

  const handleSingleRoom = (rooms) => {
    setSingleRoom(rooms);
  };

  const handleDoubleRoom = (rooms) => {
    setDoubleRoom(rooms);
  };

  const handleAnimal = (animals) => {
    setSupportAnimal(animals);
  };

  const handleSearchResult = () => {
    if (search === "") {
      setSearchError("Please search for a location");
      setTimeout(() => {
        setSearchError("");
      }, 3000);
    } else if (singleRoom === 0 && doubleRoom === 0) {
      setSearchError("Please add rooms");
      setTimeout(() => {
        setSearchError("");
      }, 3000);
    }

    // console.log(
    //   center,
    //   hotels,
    //   dateRange,
    //   singleRoom,
    //   doubleRoom,
    //   supportAnimal
    // );

    // dispatch(
    //   setCenterData({
    //     lat: center.lat,
    //     lng: center.lng,
    //     string: search,
    //   })
    // );
    // dispatch(setHotelsData(hotels));
    dispatch(
      setRoomRequirements({
        single: singleRoom,
        double: doubleRoom,
        animalSupport: supportAnimal,
      })
    );
    dispatch(setDateRangeRedux(dateRange));
    setShowRoomPicker(false);
  };

  return (
    <Row
      className={
        location.pathname === "/dashboard/user/create-request"
          ? "header-container bg-white w-100 justify-content-end"
          : "header-container"
      }
      justify="space-between"
      align="middle"
    >
      {location.pathname === "/" ||
      location.pathname === "/auth" ||
      location.pathname === "requestToken" ||
      location.pathname === "/auth/forgot-password" ? (
        <div className="header-left col-2">
          <img src={logo} width={90} />
        </div>
      ) : null}
      {searchError && (
        <div className="searchError d-flex position-absolute justify-content-center align-items-center">
          <Alert message={searchError} type="error" showIcon />
        </div>
      )}
      {location.pathname === "/" ||
      location.pathname === "/dashboard/user/create-request" ? (
        <div
          className={
            location.pathname === "/dashboard/user/create-request"
              ? "header-middle d-flex justify-content-center"
              : "header-middle landing-page-searchbar"
          }
        >
          <Col
            className={
              location.pathname === "/dashboard/user/create-request"
                ? "search-bar col-auto"
                : "search-bar col-xl-5 col-md-7 col-sm-10 col-12"
            }
          >
            <span>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search for a location"
              />
              {places.length > 0 && (
                <ul className="auto-complete-list position-absolute mt-3 bg-white py-2 px-3">
                  {places.map((place) => (
                    <li
                      key={place.place_id}
                      onClick={() => handleSelect(place)}
                    >
                      {place.description}
                    </li>
                  ))}
                </ul>
              )}
            </span>
            <span className="position-relative">
              <span className="date cursor-pointer">
                {dateRange.length > 0
                  ? `${
                      dateRange[0] !== null
                        ? moment(dateRange[0]).format("DD")
                        : ""
                    } ${
                      dateRange[0] !== null
                        ? moment(dateRange[0]).format("MMMM")
                        : ""
                    } ${dateRange[1] !== null ? "-" : ""} ${
                      dateRange[1] !== null
                        ? moment(dateRange[1]).format("DD")
                        : ""
                    } ${
                      dateRange[1] !== null
                        ? moment(dateRange[1]).format("MMMM")
                        : ""
                    }`
                  : "Dates"}
              </span>
              <RangePicker
                onChange={handleCalendarChange}
                onCalendarChange={handleCalendarChange}
                disabledDate={disabledDate}
              />
            </span>
            <span onClick={() => setShowRoomPicker(!showRoomPicker)}>
              Add rooms
            </span>
            {showRoomPicker && (
              <div
                style={{ zIndex: 100 }}
                className="position-absolute w-100 mt-5 row justify-content-end ms-0"
              >
                <div
                  className={
                    location.pathname === "/dashboard/user/create-request"
                      ? "col-11"
                      : "col-12 col-sm-8 col-md-7 col-lg-8 px-0"
                  }
                >
                  <RoomPicker
                    onSingleRoomChange={handleSingleRoom}
                    onDoubleRoomChange={handleDoubleRoom}
                    onAnimalChange={handleAnimal}
                    singleRooms={singleRoom}
                    doubleRooms={doubleRoom}
                    animals={supportAnimal}
                  />
                </div>
              </div>
            )}
            <span className="search-icon" onClick={() => handleSearchResult()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </Col>
        </div>
      ) : null}
      {(location.pathname === "/auth" && jobDetails) ||
      (location.pathname === "/auth/forgot-password" &&
        jobDetails.location !== "") ? (
        <div className="col-8 header-right details">
          <div className="detail pl-0">
            <span className="title">{jobDetails.location.string}</span>
            {/* <span className="description">{jobDetails.location_detail}</span> */}
          </div>
          <div className="detail flex">
            <div>
              <span className="title">
                {moment(jobDetails.dateRange[0]).format("DD")}
              </span>
              <span className="description">
                {moment(jobDetails.dateRange[0]).format("MMMM")}
              </span>
            </div>
            <span className="title">-</span>
            <div>
              <span className="title">
                {moment(jobDetails.dateRange[1]).format("DD")}
              </span>
              <span className="description">
                {moment(jobDetails.dateRange[1]).format("MMMM")}
              </span>
            </div>
          </div>
          <div className="detail">
            <span className="title">
              {jobDetails.roomRequirements.single +
                jobDetails.roomRequirements.double}{" "}
              Rooms
            </span>
            <span className="description">
              {jobDetails.roomRequirements.single} Single,{" "}
              {jobDetails.roomRequirements.double} Double,{" "}
              {jobDetails.roomRequirements.animalSupport > 0
                ? jobDetails.roomRequirements.animalSupport
                : "No"}{" "}
              Support Animal
            </span>
          </div>
        </div>
      ) : null}
      {location.pathname === "/" ? (
        <a className="login-icon" onClick={() => navigate("/auth")}>
          <FaUserAlt className="header-icons" />
        </a>
      ) : null}

      {showTodayModal && (
        <UrgentBookingModal
          showModal={showTodayModal}
          setShowModal={setShowTodayModal}
        />
      )}
    </Row>
  );
};

export default Header;
