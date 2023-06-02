import { Alert, Col, Row } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import coloredLogo from "../../assets/images/colored logo.png";
import whiteLogo from "../../assets/images/white logo.png";
import { DatePicker } from "antd";
import RoomPicker from "./RoomPicker";
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
  const [showTodayModal, setShowTodayModal] = useState(false);

  const [showRoomPicker, setShowRoomPicker] = useState(false);
  const roomPickerRef = useRef();

  const handleRoomPickerToggle = () => {
    setShowRoomPicker(!showRoomPicker);
    if (roomPickerRef.current) {
      roomPickerRef.current.focus();
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: event.target.value,
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

  const handleSelection = (event) => {
    // console.log(event.key);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : places.length - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < places.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedIndex !== -1) {
        handleSelect(selectedIndex);
        setSelectedIndex(-1);
      }
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setSearch(places[index].description);
    setPlaces([]);
    const placeId = places[index].place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: placeId }, (result, status) => {
      if (status === "OK") {
        setCenter({
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        });
        dispatch(
          setCenterData({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            string: places[index].description,
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
          ? "header-container w-100 justify-content-end position-relative"
          : location.pathname.includes("auth")
          ? "header-container dark-green-header position-relative"
          : "header-container position-relative"
      }
      justify="space-between"
      align="middle"
    >
      {location.pathname === "/" ||
      location.pathname.includes("auth") ||
      location.pathname.includes("verifyEmail") ||
      location.pathname.includes("resetPassword") ? (
        <div className="header-left col-2">
          <img
            src={!location.pathname.includes("auth") ? coloredLogo : whiteLogo}
            width={100}
          />
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
              ? "header-middle col-lg-7 col-md-9 col-12 mt-md-0 mt-5 d-flex justify-content-center align-items-center top-0 h-100"
              : "header-middle landing-page-searchbar top-0 align-items-center h-100"
          }
        >
          <Col
            className={
              location.pathname === "/dashboard/user/create-request"
                ? "search-bar col-12"
                : "search-bar col-xl-5 col-md-7 col-sm-10 col-12"
            }
          >
            <span>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                onKeyDown={handleSelection}
                placeholder="Search job location"
              />
              {places.length > 0 && (
                <ul className="auto-complete-list position-absolute mt-3 bg-white py-2 px-0">
                  {places.map((place, index) => (
                    <li
                      key={place.place_id}
                      onClick={() => handleSelect(index)}
                      className={index === selectedIndex ? "selected" : ""}
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
            <span onClick={() => handleRoomPickerToggle()}>
              {singleRoom > 0 || doubleRoom > 0 || supportAnimal > 0
                ? `${
                    (singleRoom > 0 && doubleRoom > 0) ||
                    (singleRoom > 0 && supportAnimal > 0)
                      ? "S-" + singleRoom + ","
                      : singleRoom > 0
                      ? "S-" + singleRoom
                      : ""
                  } 
                    ${
                      doubleRoom > 0 && supportAnimal > 0
                        ? "D-" + doubleRoom + ","
                        : doubleRoom > 0 && supportAnimal === 0
                        ? "D-" + doubleRoom
                        : ""
                    } 
                    ${supportAnimal > 0 ? "A-" + supportAnimal : ""}`
                : "Add rooms"}
            </span>
            <div
              style={{ zIndex: 100 }}
              className="position-absolute w-100 mt-5 row justify-content-end ms-0"
            >
              <div
                tabIndex="1"
                onBlur={() => setShowRoomPicker(false)}
                ref={roomPickerRef}
                className={
                  location.pathname === "/dashboard/user/create-request"
                    ? "col-md-11 col-12 outline-none"
                    : "col-12 col-sm-8 col-md-7 col-lg-8 px-0 outline-none"
                }
              >
                {showRoomPicker && (
                  <RoomPicker
                    onSingleRoomChange={handleSingleRoom}
                    onDoubleRoomChange={handleDoubleRoom}
                    onAnimalChange={handleAnimal}
                    singleRooms={singleRoom}
                    doubleRooms={doubleRoom}
                    animals={supportAnimal}
                  />
                )}
              </div>
            </div>
            <span className="search-icon" onClick={() => handleSearchResult()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
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
      (location.pathname === "/auth/forgot-password" && jobDetails) ||
      (location.pathname.includes("verifyEmail") && jobDetails) ||
      (location.pathname.includes("resetPassword") && jobDetails) ? (
        <div className="col-md-8 col-12 header-right details">
          <div className="detail pl-0">
            <span className="title location-title">
              {jobDetails?.location.string}
            </span>
          </div>
          <div className="detail flex">
            <div>
              <span className="title">
                {moment(jobDetails?.dateRange[0]).format("DD")}
              </span>
              <span className="description">
                {moment(jobDetails?.dateRange[0]).format("MMMM")}
              </span>
            </div>
            <span className="title">-</span>
            <div>
              <span className="title">
                {moment(jobDetails?.dateRange[1]).format("DD")}
              </span>
              <span className="description">
                {moment(jobDetails?.dateRange[1]).format("MMMM")}
              </span>
            </div>
          </div>
          <div className="detail">
            <span className="title">
              {jobDetails?.roomRequirements.single +
                jobDetails?.roomRequirements.double}{" "}
              Rooms
            </span>
            <span className="description">
              {jobDetails?.roomRequirements.single} Single,{" "}
              {jobDetails?.roomRequirements.double} Double,{" "}
              {jobDetails?.roomRequirements.animalSupport > 0
                ? jobDetails?.roomRequirements.animalSupport
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
