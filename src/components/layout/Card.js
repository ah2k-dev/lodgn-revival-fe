import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ svgTxt, distance, singlePrice, doublePrice }) => {
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
                    <Link to='/dashboard/user/payment'>
                        <span className="px-4 py-2 rounded-3 book-now-btn text-white">
                            Book now
                        </span>
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Card
