import { Col, Row } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const jobDetails = {
        location: ' St Judes Hospital',
        location_detail: 'Sarasota,FL. 33178',
        start_date: 10,
        start_date_month: 'October',
        end_date: '17',
        end_date_month: 'December',
        no_of_rooms: 20,
        no_of_single_rooms: 10,
        no_of_double_rooms: 10
    }

    return (location.pathname === '/' ? <footer className='footer-container'>
        <Row justify="space-between" align="middle">
            <Col span={14} className='details'>
                <div className='detail pl-0'>
                    <span className='title'>
                        {jobDetails.location}
                    </span>
                    <span className='description'>
                        {jobDetails.location_detail}
                    </span>
                </div>
                <div className='detail flex'>
                    <div>
                        <span className='title'>
                            {jobDetails.start_date}
                        </span>
                        <span className='description'>
                            {jobDetails.start_date_month}
                        </span>
                    </div>
                    <span className='title'>
                        -
                    </span>
                    <div>
                        <span className='title'>
                            {jobDetails.end_date}
                        </span>
                        <span className='description'>
                            {jobDetails.end_date_month}
                        </span>
                    </div>
                </div>
                <div className='detail'>
                    <span className='title'>
                        {jobDetails.no_of_rooms > 1 ? jobDetails.no_of_rooms + ' Rooms' : jobDetails.no_of_rooms + ' Room' }
                    </span>
                    <span className='description'>
                       { jobDetails.no_of_single_rooms > 0 ? jobDetails.no_of_single_rooms + ' Singles' : null } { jobDetails.no_of_double_rooms > 0 ? ', ' + jobDetails.no_of_double_rooms + ' Doubles' : null }
                    </span>
                </div>
            </Col>
            <Col span={5}>
                <button className='footer-btn'  onClick={() => navigate("/auth", {state:jobDetails})}>Confirm and request</button>
            </Col>
        </Row>
    </footer> : null
    )
}

export default Footer
