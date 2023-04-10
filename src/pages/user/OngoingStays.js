import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/layout/Card'
import JobDetailsGrid from '../../components/layout/JobDetailsGrid'

const OngoingStays = () => {
    return (
        <div className='min-vh-100 w-100 p-5'>
            <div className='d-flex flex-column gap-5'>
                <h2 className='font-poppins mt-4 heading-green'>
                    You currently have 1 ongoing stay
                </h2>
                <div className='d-flex flex-column gap-5 rounded-container bg-white p-5'>
                <JobDetailsGrid jobLocation='St Judes Hospital' jobAddress='Sarasota,FL. 33178' start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10}/>
                    <div className='d-flex gap-5 mt-5'>
                        <div className='col-4 position-relative'>
                            <span className='rare-find-badge'>Rare Find</span>
                            <Card svgTxt='Holiday Inn' distance={1.5} singlePrice={120} doublePrice={145} />
                        </div>
                        <div className='col-6 ms-3'>
                            <h3 className='fs-1 font-lato fw-bold'>20 Days left on this
                                Booking.</h3>
                            <div>
                                <span className='green-span fs-6 font-poppins'>Quick actions:</span>
                                <div className='mt-4'>
                                    <Link to='/dashboard/user/update-stay'>
                                        <span className='update-btn font-poppins rounded-3 px-5 py-3 me-3'>Update stay</span>
                                    </Link>
                                    <Link>
                                        <span className='rebook-btn font-poppins rounded-3 px-5 py-3 text-white'>Rebook stay</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OngoingStays
