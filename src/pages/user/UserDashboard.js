import React from 'react'
import Header from '../../components/layout/Header'
import Map from '../../components/Map'
import CurrentRequest from '../../pages/user/CurrentRequest'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Footer from '../../components/layout/Footer';
// import { clearState } from "../actions/mapActions";

const UserDashboard = () => {

  const { hotels, center, roomRequirements, dateRange } = useSelector(
    (state) => state.map
  );

  const totalRooms = roomRequirements.single + roomRequirements.double;

  return (
    <div className='bg-white d-flex flex-column align-items-end ms-auto'></div>
  )
}

export default UserDashboard