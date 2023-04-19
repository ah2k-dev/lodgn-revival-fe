import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JobDetailsGrid from '../../components/layout/JobDetailsGrid'
import PaidPerNight from '../../components/layout/PaidPerNight'

const PreviousStays = () => {

    const dispatch = useDispatch();
    const { error, loading, requests } = useSelector((state) => state.request);

    return (
        <div className='min-vh-100 w-100 px-md-5 px-2 py-5'>
            <div className='d-flex flex-column gap-5'>
                <h2 className='font-poppins mt-4 heading-green'>
                    You currently have 1 ongoing stay
                </h2>
                <PreviousRequests />
            </div>
        </div>
    )
}

const PreviousRequests = () => {
    return (
        <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
            <div className="d-flex justify-content-md-between align-items-center flex-wrap items justify-content-center">
                <JobDetailsGrid jobLocation='St Judes Hospital' jobAddress='Sarasota,FL. 33178' start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10} />
                <span className="mt-xxl-0 mt-5">
                    <span className="fs-5 font-poppins fst-italic green-span text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
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
                        Holiday Inn
                    </span>
                </span>
            </div>
            <PaidPerNight singles={120} doubles={145} animals={1} />
        </div>
    )
}

export default PreviousStays
