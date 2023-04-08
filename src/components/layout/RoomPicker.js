import React, { useState } from 'react'

const RoomPicker = ({singleRooms, doubleRooms, animals}) => {

    const [singleRoom, setSingleRoom] = useState(singleRooms);
    const [doubleRoom, setDoubleRoom] = useState(doubleRooms);
    const [supportAnimal, setSupportAnimal] = useState(animals);

  return (
    <div className="rooms-picker shadow bg-white p-4 w-100 mt-2">
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
            </div>
  )
}

export default RoomPicker
