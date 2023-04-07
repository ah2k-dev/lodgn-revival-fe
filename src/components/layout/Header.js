import { Button, Col, Layout, message, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../../actions/authActions";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/images/LODGN.svg'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Header = () => {

  const [showRoomPicker, setShowRoomPicker] = useState(false);

  const [singleRoom, setSingleRoom] = useState(0);
  const [doubleRoom, setDoubleRoom] = useState(0);
  const [supportAnimal, setSupportAnimal] = useState(0);


  const auth = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const { error } = useSelector((state) => state.auth);

  const location = useLocation();

  const jobDetails = location.state;

  return (
    <Row className="header-container" justify="space-between" align="middle">
      <Col span={7} className="header-left">
        <img src={logo} width={90} />
      </Col>
      {location.pathname === '/' ? <div className="header-middle">
        <Col span={7} className="search-bar">
          <span>
            <input type="search" placeholder="Job Location" />
          </span>
          <span>
            <span className="date">Dates</span>
            <RangePicker />
          </span>
          <span onClick={() => setShowRoomPicker(!showRoomPicker)} >
            Add rooms
            {showRoomPicker && <div className="rooms-picker position-absolute mt-4 bg-white p-4 w-100">
              <div className="row justify-content-between mx-2 px-0">
                <div className="col-8 room-details px-0">
                  <h4>Single Rooms</h4>
                  <span>1 Bed per room</span>
                </div>
                <div className="col-3 d-flex room-counter px-0">
                  <span onClick={() => setSingleRoom(singleRoom === 0 ? singleRoom : singleRoom - 1)} className="d-flex justify-content-center align-items-center me-2 border border-2 rounded-circle">-</span>
                  {singleRoom}
                  <span onClick={() => setSingleRoom(singleRoom + 1)} className="d-flex justify-content-center align-items-center ms-2 border border-2 rounded-circle">+</span>
                </div>
              </div>
              <div className="row justify-content-between mx-2 px-0">
                <div className="col-8 room-details px-0">
                  <h4>Double Rooms</h4>
                  <span>2 Beds per room</span>
                </div>
                <div className="col-3 d-flex room-counter px-0">
                  <span onClick={() => setDoubleRoom(doubleRoom === 0 ? doubleRoom : doubleRoom - 1)} className="d-flex justify-content-center align-items-center me-2 border border-2 rounded-circle">-</span>
                  {doubleRoom}
                  <span onClick={() => setDoubleRoom(doubleRoom + 1)} className="d-flex justify-content-center align-items-center ms-2 border border-2 rounded-circle">+</span>
                </div>
              </div>
              <div className="row justify-content-between mx-2 px-0">
                <div className="col-8 room-details px-0">
                  <h4>Support Animal</h4>
                </div>
                <div className="col-3 d-flex room-counter px-0">
                  <span onClick={() => setSupportAnimal(supportAnimal === 0 ? supportAnimal : supportAnimal - 1)} className="d-flex justify-content-center align-items-center me-2 border border-2 rounded-circle">-</span>
                  {supportAnimal}
                  <span onClick={() => setSupportAnimal(supportAnimal + 1)} className="d-flex justify-content-center align-items-center ms-2 border border-2 rounded-circle">+</span>
                </div>
              </div>
            </div>}
          </span>
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
        </Col>
      </div> : null}
      {location.pathname === '/auth' ? <Col span={14} className="header-right details">
        <div className='detail pl-0'>
          <span className='title'>
            {jobDetails.location}
          </span>
          <span className='description'>
            {jobDetails.location_detail}
          </span>
        </div>
        <div className='detail flex'>
          <div>
            <span className='title'>
              {jobDetails.start_date}
            </span>
            <span className='description'>
              {jobDetails.start_date_month}
            </span>
          </div>
          <span className='title'>
            -
          </span>
          <div>
            <span className='title'>
              {jobDetails.end_date}
            </span>
            <span className='description'>
              {jobDetails.end_date_month}
            </span>
          </div>
        </div>
        <div className='detail'>
          <span className='title'>
            {jobDetails.no_of_rooms > 1 ? jobDetails.no_of_rooms + ' Rooms' : jobDetails.no_of_rooms + ' Room'}
          </span>
          <span className='description'>
            {jobDetails.no_of_single_rooms > 0 ? jobDetails.no_of_single_rooms + ' Singles' : null} {jobDetails.no_of_double_rooms > 0 ? ', ' + jobDetails.no_of_double_rooms + ' Doubles' : null}
          </span>
        </div>
        {/* {auth ? (
          <></>
        ) : (
          <a onClick={() => navigate("/auth")}>
            <FaUserAlt className="header-icons" />
          </a>
        )} */}
      </Col> : null}
    </Row>
  );
};

export default Header;
