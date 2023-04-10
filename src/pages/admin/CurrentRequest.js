import React from 'react'
import Card from '../../components/layout/Card'
import JobDetailsGrid from '../../components/layout/JobDetailsGrid'
import { useState } from 'react'
import { Button, Upload } from 'antd'
import UpdateHotelDetails from '../../components/layout/UpdateHotelDetails'

const CurrentRequest = () => {

    const [hide, show] = useState(false);

    const handleRadioChange = (event) => {

        const specificRadioButton = document.querySelector('#completed-status');
        if (specificRadioButton.checked) {
            show(true);
        } else {
            show(false);
        }
    };

    return (
        <>
            <div className='d-flex flex-column justify-content-between w-100'>
                <h2 className='font-poppins mt-4'>
                    You currently have 3 requests
                </h2>
                <div className="d-flex flex-column justify-content-between gap-5 w-100">
                    <div className="rounded-container d-flex flex-column justify-content-center mt-3 gap-5 bg-white py-4 px-4">
                        <div className="ps-4 d-flex justify-content-between">
                            <JobDetailsGrid jobLocation='St Judes Hospital' jobAddress='Sarasota,FL. 33178' start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10} />
                            <button className='update-status-btn py-2 px-5 font-poppins text-white'>Update</button>
                        </div>
                        <div className="update-status row justify-content-center">
                            <h3 className='update-status-text font-poppins text-uppercase fs-6'>UPDATE STATUS TO CLIENT:</h3>
                            <div className="col-3 active d-flex align-items-center py-2">
                                <span className='fw-bold status-1 d-flex justify-content-center align-items-center gap-2'>
                                    <input onChange={handleRadioChange} name='status' type='radio' checked={true} /> RECEIVED
                                </span>
                            </div>
                            <div className="col-3 d-flex align-items-center py-2">
                                <span className='fw-bold status-2 d-flex justify-content-center align-items-center gap-2'>
                                    <input onChange={handleRadioChange} name='status' type='radio' /> NEGOTIATING
                                </span>
                            </div>
                            <div className="col-3 d-flex align-items-center py-2">
                                <span className='fw-bold status-3 d-flex justify-content-center align-items-center gap-2'>
                                    <input onChange={handleRadioChange} name='status' type='radio' /> PAYMENT VERIFIED
                                </span>
                            </div>
                            <div className="col-3 d-flex align-items-center py-2 border-0">
                                <span className='fw-bold status-4 d-flex justify-content-center align-items-center gap-2'>
                                    <input onChange={handleRadioChange} id='completed-status' name='status' type='radio' /> COMPLETED
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {hide && <div className="rounded-container d-flex flex-column justify-content-between bg-white p-5 gap-4 w-100">
                <div className="ps-4 d-flex justify-content-between">
                    <JobDetailsGrid jobLocation='St Judes Hospital' jobAddress='Sarasota,FL. 33178' start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10} />
                    <button className='update-status-btn py-2 px-5 font-poppins text-white'>Update</button>
                </div>
                <div className="update-status row justify-content-center">
                    <h3 className='update-status-text font-poppins text-uppercase fs-6'>UPDATE STATUS TO CLIENT:</h3>
                    <div className='d-flex gap-3'>
                        <div className="col-3 active d-flex align-items-center py-2">
                            <span className='fw-bold d-flex justify-content-between align-items-center gap-3'>
                                <input name='newStatus' type='radio' /> RECEIVED
                            </span>
                        </div>
                        <div className="col-3 d-flex align-items-center py-2">
                            <span className='fw-bold d-flex justify-content-between align-items-center gap-3'>
                                <input name='newStatus' type='radio' /> NEGOTIATING
                            </span>
                        </div>
                        <div className="col-3 d-flex align-items-center py-2">
                            <span className='fw-bold d-flex justify-content-between align-items-center gap-3'>
                                <input name='newStatus' type='radio' /> PAYMENT VERIFIED
                            </span>
                        </div>
                        <div className="col-3 d-flex align-items-center py-2 border-0">
                            <span className='fw-bold status-4 d-flex justify-content-between align-items-center gap-3'>
                                <input name='newStatus' type='radio' checked={true} /> COMPLETED
                            </span>
                        </div>
                    </div>
                </div>
                <div className='row mt-4 gap-0 justify-content-between'>
                    <h3 className='update-status-text font-poppins text-uppercase fs-6'>UPDATE STATUS TO CLIENT:</h3>
                    <div className='row gap-2 mt-3 justify-content-between'>
                        <UpdateHotelDetails/>
                        <UpdateHotelDetails/>
                        <UpdateHotelDetails/>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default CurrentRequest