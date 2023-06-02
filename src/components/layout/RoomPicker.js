import React, { useState } from 'react'

const RoomPicker = ({ singleRooms, doubleRooms, animals, onSingleRoomChange, onDoubleRoomChange, onAnimalChange }) => {

  const [singleRoom, setSingleRoom] = useState(singleRooms);
  const [doubleRoom, setDoubleRoom] = useState(doubleRooms);
  const [supportAnimal, setSupportAnimal] = useState(animals);

  const increament = (state) => {
    if (state == 'singleRoom') {
      setSingleRoom(singleRoom + 1);
      onSingleRoomChange(singleRoom + 1);
    } else if (state == 'doubleRoom') {
      setDoubleRoom(doubleRoom + 1);
      onDoubleRoomChange(doubleRoom + 1);
    } else {
      setSupportAnimal(supportAnimal + 1);
      onAnimalChange(supportAnimal + 1);
    }
  }

  const decreament = (state) => {
    if (state == 'singleRoom') {
      setSingleRoom(singleRoom === 0 ? singleRoom : singleRoom - 1);
      onSingleRoomChange(singleRoom === 0 ? singleRoom : singleRoom - 1);
    } else if (state == 'doubleRoom') {
      setDoubleRoom(doubleRoom === 0 ? doubleRoom : doubleRoom - 1);
      onDoubleRoomChange(doubleRoom === 0 ? doubleRoom : doubleRoom - 1);
    } else {
      setSupportAnimal(supportAnimal === 0 ? supportAnimal : supportAnimal - 1);
      onAnimalChange(supportAnimal === 0 ? supportAnimal : supportAnimal - 1);
    }
  }

  return (
    <div className="rooms-picker shadow bg-white p-4 w-100 mt-2">
      <div className="row justify-content-between mx-2 px-0">
        <div className="col-8 room-details px-0">
          <h4>Single Rooms</h4>
          <span>1 Bed per room</span>
        </div>
        <div className="col-3 d-flex room-counter px-0">
          <span onClick={()=> decreament('singleRoom')} className="text-dark d-flex justify-content-center align-items-center me-2 border border-2 rounded-circle">-</span>
          {singleRoom}
          <span onClick={()=> increament('singleRoom')} className="text-dark d-flex justify-content-center align-items-center ms-2 border border-2 rounded-circle">+</span>
        </div>
      </div>
      <div className="row justify-content-between mx-2 px-0">
        <div className="col-8 room-details px-0">
          <h4>Double Rooms</h4>
          <span>2 Beds per room</span>
        </div>
        <div className="col-3 d-flex room-counter px-0">
          <span onClick={() => decreament('doubleRoom')} className="text-dark d-flex justify-content-center align-items-center me-2 border border-2 rounded-circle">-</span>
          {doubleRoom}
          <span onClick={() => increament('doubleRoom')} className="text-dark d-flex justify-content-center align-items-center ms-2 border border-2 rounded-circle">+</span>
        </div>
      </div>
      <div className="row justify-content-between mx-2 px-0">
        <div className="col-8 room-details px-0">
          <h4>Support Animal</h4>
        </div>
        <div className="col-3 d-flex room-counter px-0">
          <span onClick={() => decreament('supportAnimal')} className="text-dark d-flex justify-content-center align-items-center me-2 border border-2 rounded-circle">-</span>
          {supportAnimal}
          <span onClick={() => increament('supportAnimal')} className="text-dark d-flex justify-content-center align-items-center ms-2 border border-2 rounded-circle">+</span>
        </div>
      </div>
    </div>
  )
}

export default RoomPicker
