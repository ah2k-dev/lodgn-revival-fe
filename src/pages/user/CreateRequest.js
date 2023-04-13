import React from 'react'
import Header from '../../components/layout/Header'
import { useSelector } from "react-redux";
import Footer from '../../components/layout/Footer';
import Map from '../../components/Map';

const CreateRequest = () => {

  const { hotels, center, roomRequirements, dateRange } = useSelector(
    (state) => state.map
  );

  const totalRooms = roomRequirements.single + roomRequirements.double;

  return (
    <div className='bg-white d-flex flex-column align-items-end ms-auto'>
      <Header />
      <div className="map-container w-100">
        <Map hotels={hotels} center={center} />
      </div>
      <Footer />
    </div>
  )
}

export default CreateRequest