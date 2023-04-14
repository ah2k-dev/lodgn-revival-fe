import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/layout/Card'
import JobDetailsGrid from '../../components/layout/JobDetailsGrid'
import { useDispatch, useSelector } from 'react-redux'
import { Button, message } from 'antd'
import { clearErrors, getOngoingRequests } from '../../actions/requestActions'

const OngoingStays = () => {
    const dispatch = useDispatch()
    const { error, loading, onGoing } = useSelector((state) => state.request)
    useEffect(() => {
        if (error) {
            message.error({
                content: error,
                style: {
                    marginTop: '10vh'
                }
            })
            dispatch(clearErrors())
        }
    }, [error])

    const fetch = () => {
        dispatch(getOngoingRequests())
    }

    useEffect(() => {
        fetch()
    }, [dispatch])
    return (
        <div className='min-vh-100 w-100 p-lg-5 p-md-3 p-0'>
            <div className='row px-4'>
                <div className='col-auto'>
                    <div className='d-flex flex-column gap-4 mt-md-0 mt-5'>
                        <h2 className='font-poppins mt-3 heading-green'>
                            You currently have 1 ongoing stay
                        </h2>
                        <RequestComponent location={'St Judes Hospital'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const RequestComponent = ({ location, dateRange, hotelTitle, distance, single, double }) => {

    return (
        <div className='ongoingStays d-flex flex-column gap-5 rounded-container bg-white p-xl-5 p-lg-4 p-4 shadow'>
            <JobDetailsGrid jobLocation={location} start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10} />
            <div className='row gap-3 mt-5 justify-content-center'>
                <div className='col-md-5 col-lg-5 col-8 position-relative'>
                    <span className='rare-find-badge'>Rare Find</span>
                    <Card svgTxt='Holiday Inn' distance={1.5} singlePrice={120} doublePrice={145} />
                </div>
                <div className='col-md-12 col-lg-6 ms-3 d-flex flex-column align-items-center mt-md-4'>
                    <h3 className='font-lato fw-bold'>20 Days left on this
                        Booking.</h3>
                    <div>
                        <span className='green-span fs-6 font-poppins'>Quick actions:</span>
                        <div className='mt-4 btns d-flex flex-wrap gap-3'>
                            <Link to='/dashboard/user/update-stay'>
                                <Button className='update-btn font-poppins text-white'>
                                    Update stay
                                </Button>
                            </Link>
                            <Link>
                                <Button className='rebook-btn font-poppins text-white'>
                                    Rebook stay
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OngoingStays
