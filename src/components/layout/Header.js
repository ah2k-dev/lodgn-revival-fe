import { Button, Col, Layout, message, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../../actions/authActions";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/LODGN.svg";
import { DatePicker, Space } from "antd";
import RoomPicker from "./RoomPicker";
import axios from "axios";
import { setCenterData, setHotelsData } from "../../actions/mapActions";

const { RangePicker } = DatePicker;

const Header = () => {
  const [showRoomPicker, setShowRoomPicker] = useState(false);

  const auth = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const { error } = useSelector((state) => state.auth);

  const location = useLocation();

  const jobDetails = location.state;

  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [hotels, setHotels] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [singleRoom, setSingleRoom] = useState(0);
  const [doubleRoom, setDoubleRoom] = useState(0);
  const [supportAnimal, setSupportAnimal] = useState(0);

  const [searchResult, setSearchResult] = useState({
    location: {
      lat: 0,
      lang: 0,
      string: "",
    },
    dateRange: ["", ""],
    roomRequirements: {
      single: 0,
      double: 0,
      animalSupport: 0,
    },
  });

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
        dispatch(setCenterData({
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }))
        service.nearbySearch(
          {
            location: result.geometry.location,
            radius: 2000,
            type: "lodging",
          },
          (results, status) => {
            if (status === "OK") {
              setHotels(results);
              dispatch(setHotelsData(results))
            }
          }
        );
      }
    });
  };


  const handleCalendarChange = (values, dateString) => {
    if (dateString && dateString.length === 2) {
      setDateRange({
        startDate: dateString[0],
        endDate: dateString[1],
      });

      console.log(dateRange);
    }
  };

  const handleSingleRoom = (rooms) => {
    setSingleRoom(rooms);
    console.log("single: ", singleRoom);
  }

  const handleDoubleRoom = (rooms) => {
    setDoubleRoom(rooms);
    console.log("double: ", doubleRoom);
  }

  const handleAnimal = (animals) => {
    setSupportAnimal(animals);
    console.log("animals: ", supportAnimal);
  }

  const handleSearchResult = () => {
    setSearchResult({
      location: {
        lat: center.lat,
        lang: center.lng,
        string: search
      },
      dateRange: dateRange,
      roomRequirements: {
        single: singleRoom,
        double: doubleRoom,
        animalSupport: supportAnimal
      }
    });

    console.log(searchResult);
  }

  return (
    <Row className="header-container" justify="space-between" align="middle">
      {/* {console.log(search, places, center, hotels)} */}
      <Col span={7} className="header-left">
        <img src={logo} width={90} />
      </Col>
      {location.pathname === "/" ? (
        <div className="header-middle">
          <Col span={7} className="search-bar">
            <span>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search for a location"
              />
              {places.length > 0 && <ul className="auto-complete-list position-absolute mt-3 bg-white py-2 px-3">
                {places.map((place) => (
                  <li key={place.place_id} onClick={() => handleSelect(place)}>
                    {place.description}
                  </li>
                ))}
              </ul>}
            </span>
            <span>
              <span className="date">Dates</span>
              <RangePicker onChange={handleCalendarChange} onCalendarChange={handleCalendarChange} />
            </span>
            <span onClick={() => setShowRoomPicker(!showRoomPicker)}>
              Add rooms
            </span>
            {showRoomPicker && (
              <div style={{ zIndex: 100 }} className="position-absolute w-100 mt-5">
                <RoomPicker onSingleRoomChange={handleSingleRoom} onDoubleRoomChange={handleDoubleRoom} onAnimalChange={handleAnimal} singleRooms={singleRoom} doubleRooms={doubleRoom} animals={supportAnimal} />
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
      {location.pathname === "/auth" ? (
        <Col span={14} className="header-right details">
          <div className="detail pl-0">
            <span className="title">{jobDetails.location}</span>
            <span className="description">{jobDetails.location_detail}</span>
          </div>
          <div className="detail flex">
            <div>
              <span className="title">{jobDetails.start_date}</span>
              <span className="description">{jobDetails.start_date_month}</span>
            </div>
            <span className="title">-</span>
            <div>
              <span className="title">{jobDetails.end_date}</span>
              <span className="description">{jobDetails.end_date_month}</span>
            </div>
          </div>
          <div className="detail">
            <span className="title">
              {jobDetails.no_of_rooms > 1
                ? jobDetails.no_of_rooms + " Rooms"
                : jobDetails.no_of_rooms + " Room"}
            </span>
            <span className="description">
              {jobDetails.no_of_single_rooms > 0
                ? jobDetails.no_of_single_rooms + " Singles"
                : null}{" "}
              {jobDetails.no_of_double_rooms > 0
                ? ", " + jobDetails.no_of_double_rooms + " Doubles"
                : null}
            </span>
          </div>
          {/* {auth ? (
          <></>
        ) : (
          <a onClick={() => navigate("/auth")}>
            <FaUserAlt className="header-icons" />
          </a>
        )} */}
        </Col>
      ) : null}
    </Row>
  );
};

export default Header;
