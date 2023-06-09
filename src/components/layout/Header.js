import { Col, Row, message } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import coloredLogo from "../../assets/images/colored logo.png";
import whiteLogo from "../../assets/images/white logo.png";
import searchIcon from "../../assets/images/search-icon.svg";
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

const Header = React.forwardRef((props, ref) => {
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

  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
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

  const handleSelect = (index, place) => {
    setSelectedIndex(index);
    setSearch(places[index].description);
    setPlaces([]);
    const placeId = places[index].place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: placeId }, (result, status) => {
      if (status === "OK") {
        const addressComponents = result.address_components;
        let state = "";
        let zipCode = "";
        for (let i = 0; i < addressComponents.length; i++) {
          const types = addressComponents[i].types;
          if (types.includes("administrative_area_level_1")) {
            state = addressComponents[i].long_name;
          } else if (types.includes("postal_code")) {
            zipCode = addressComponents[i].short_name;
          }
        }
        dispatch(
          setCenterData({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            string: places[index].description,
            state: state,
            zipCode: zipCode,
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
      message.error({
        content: `Please specify a destination`,
        style: {
          marginTop: "10vh",
        },
      });
      return false;
    } else if (!dateRange[0] || !dateRange[1]) {
      message.error({
        content: `Please select a valid date range for your stay`,
        style: {
          marginTop: "10vh",
        },
      });
      return false;
    } else if (singleRoom === 0 && doubleRoom === 0) {
      message.error({
        content: `Please specify rooms`,
        style: {
          marginTop: "10vh",
        },
      });
      return false;
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
    <header ref={ref}>
      <Row
        className={
          location.pathname === "/dashboard/user/create-request"
            ? "header-container w-100 justify-content-end position-relative"
            : location.pathname.includes("auth")
            ? "header-container dark-green-header justify-content-md-between justify-content-center align-items-center position-relative"
            : "header-container position-relative justify-content-md-between justify-content-center align-items-center"
        }
      >
        {location.pathname === "/" ||
        location.pathname.includes("auth") ||
        location.pathname.includes("verifyEmail") ||
        location.pathname.includes("resetPassword") ? (
          <Link to="/">
            <div className="header-left col-4">
              <img
                src={
                  !location.pathname.includes("auth") ? coloredLogo : whiteLogo
                }
                alt="lodgn"
                width={100}
              />
            </div>
          </Link>
        ) : null}
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
                        onClick={() => handleSelect(index, place)}
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
              <span
                className="search-icon"
                onClick={() => handleSearchResult()}
              >
                <img src={searchIcon} alt="search-icon" />
              </span>
            </Col>
          </div>
        ) : null}
        {location.pathname.includes("/auth") ? <RequestsDetails /> : null}
        {location.pathname === "/" ? (
          <span
            className="login-icon cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            <FaUserAlt className="header-icons" />
          </span>
        ) : null}

        {showTodayModal && (
          <UrgentBookingModal
            showModal={showTodayModal}
            setShowModal={setShowTodayModal}
          />
        )}
      </Row>
    </header>
  );
});

const RequestsDetails = () => {
  const { center, dateRange, roomRequirements } = useSelector(
    (state) => state.map
  );

  return (
    <>
      {center.string && (
        <div className="col-md-8 col-12 header-right details">
          <div className="detail pl-0">
            <span className="title location-title">{center?.string}</span>
            <span className="description">{`${center?.state}, ${
              center?.zipCode ? center?.zipCode : "N/A"
            }`}</span>
          </div>
          <div className="detail flex">
            <div>
              <span className="title">{moment(dateRange[0]).format("DD")}</span>
              <span className="description">
                {moment(dateRange[0]).format("MMMM")}
              </span>
            </div>
            <span className="title">-</span>
            <div>
              <span className="title">{moment(dateRange[1]).format("DD")}</span>
              <span className="description">
                {moment(dateRange[1]).format("MMMM")}
              </span>
            </div>
          </div>
          <div className="detail">
            <span className="title">
              {roomRequirements?.single + roomRequirements?.double} Rooms
            </span>
            <span className="description">
              {roomRequirements?.single} Single, {roomRequirements?.double}{" "}
              Double,{" "}
              {roomRequirements?.animalSupport > 0
                ? roomRequirements?.animalSupport
                : "No"}{" "}
              Support Animal
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
