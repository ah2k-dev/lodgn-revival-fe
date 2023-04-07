import React from 'react'

const DetailsGrid = () => {
  return (
    <>
      <div className="details">
        <div className='detail pl-0'>
          <span className='title'>
            St Judes Hospital
          </span>
          <span className='description'>
            Sarasota,FL. 33178
          </span>
        </div>
        <div className='detail flex'>
          <div>
            <span className='title'>
              10
            </span>
            <span className='description'>
              October
            </span>
          </div>
          <span className='title'>
            -
          </span>
          <div>
            <span className='title'>
              17
            </span>
            <span className='description'>
              December
            </span>
          </div>
        </div>
        <div className='detail'>
          <span className='title'>
            20 Rooms
          </span>
          <span className='description'>
            10 Singles, 10 doubles
          </span>
        </div>
      </div>
    </>
  )
}

const Card = (svgTxt, distance, singlePrice, doublePrice) => {
  return (
    <div className="detail-card rounded-3 d-flex flex-column align-items-center w-100">
      <span className="svg-span p-4 text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="59"
          fill="none"
          viewBox="0 0 54 59"
        >
          <path
            stroke="#85C371"
            strokeLinecap="round"
            strokeWidth="5"
            d="M22.019 6.563c-2.264 2.82-7.426 15.41-9.962 43.202M38.32 3c-3.774 5.048-11.593 22.714-12.68 53M3 36.849c5.132-6.532 21.917-19.24 48-17.815"
          ></path>
        </svg>
        {svgTxt}
      </span>
      <div className="cards-footer d-flex flex-column align-items-center gap-2 rounded-3 p-4 w-100">
        <span className="text-sm">
          {distance} miles away from joblocation.
        </span>
        <span className="d-flex justify-content-between align-items-center w-100">
          <span className="d-flex flex-column gap-2 text-xs">
            <span className='price-span'>Singles: ${singlePrice}</span>
            <span className='price-span'>Doubles: ${doublePrice}</span>
          </span>
          <span className="px-4 py-2 rounded-3 book-now-btn text-white">
            Book now
          </span>
        </span>
      </div>
    </div>
  )
}

const UserDashboard = () => {
  return (
    <div className='dashboard d-flex flex-column justify-content-between gap-5 align-items-start px-5 py-5'>
      <div className='d-flex flex-column justify-content-between w-100'>
        <h2 className='font-poppins mt-4'>
          You currently have 3 requests
        </h2>
        <div className="d-flex flex-column justify-content-between gap-5 w-100">
          <div className="rounded-container d-flex flex-column justify-content-center mt-3 gap-5 bg-white py-4 px-4">
            <div className="w-fit-content ps-4">
              {DetailsGrid()}
            </div>
            <div className="status row justify-content-center">
              <div className="col-4 active d-flex align-items-center py-2">
                <span className="text-[#959595] font-[lato] font-[500] text-[12px]">
                  RECEIVED
                </span>
              </div>
              <div className="col-4 d-flex align-items-center py-2">
                <span className="text-[#959595] font-[lato] font-[500] text-[12px]">
                  NEGOTIATING
                </span>
              </div>
              <div className="col-4 d-flex align-items-center py-2 border-0">
                <span className="text-[#959595] font-[lato] font-[500] text-[12px]">
                  COMPLETED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-container d-flex flex-column justify-content-between bg-white p-5 gap-4 w-100">
        {DetailsGrid()}
        <div className='row'>
          <span className='completed-status col-8 rounded-pill py-2 px-4 text-white'>COMPLETED</span>
        </div>
        <div className='row gap-0 justify-content-between'>
          <div className='col-4 position-relative'>
            <span className='rare-find-badge'>Rare Find</span>
            {Card('Holiday Inn', 1.5, 120, 145)}
          </div>
          <div className='col-4'>
            {Card('Holiday Inn', 1.5, 120, 145)}
          </div>
          <div className='col-4'>
            {Card('Holiday Inn', 1.5, 120, 145)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard