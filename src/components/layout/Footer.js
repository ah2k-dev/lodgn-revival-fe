import { Col, Row } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Footer = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const { hotels, center, roomRequirements, dateRange } = useSelector(
        (state) => state.map
      );
    
      const totalRooms = roomRequirements.single + roomRequirements.double;

    return (
        <footer className={ location.pathname === '/dashboard/user' ? "footer-container w-100 bg-white ms-auto px-4" : "footer-container w-100 bg-white px-4 ms-0"}>
            <Row justify="space-between" align="middle">
                <Col className="details col-md-7 col-sm-8 col-12 d-flex justify-content-start">
                    <div className="detail pl-0">
                        <span className="title">{center?.string}</span>
                    </div>
                    <div className="detail flex">
                        <div>
                            <span className="title">
                                {moment(dateRange[0]).format("DD")}
                            </span>
                            <span className="description">
                                {moment(dateRange[0]).format("MMMM")}
                            </span>
                        </div>
                        <span className="title">-</span>
                        <div>
                            <span className="title">
                                {moment(dateRange[1]).format("DD")}
                            </span>
                            <span className="description">
                                {moment(dateRange[1]).format("MMMM")}
                            </span>
                        </div>
                    </div>
                    <div className="detail">
                        <span className="title">{totalRooms} Rooms</span>
                        <span className="description">
                            {/* {jobDetails.no_of_single_rooms > 0 ? jobDetails.no_of_single_rooms + ' Singles' : null} {jobDetails.no_of_double_rooms > 0 ? ', ' + jobDetails.no_of_double_rooms + ' Doubles' : null} */}

                            {roomRequirements.single > 0
                                ? roomRequirements.single + " Singles"
                                : null}
                            {roomRequirements.single > 0 && roomRequirements.double > 0
                                ? ", "
                                : null}
                            {roomRequirements.double > 0
                                ? roomRequirements.double + " Doubles"
                                : null}
                            {roomRequirements.animalSupport > 0
                                ? ", " + roomRequirements.animalSupport + " Animal Support"
                                : null}
                        </span>
                    </div>
                </Col>
                <Col className="col-auto footer-btn">
                    <button
                        disabled={center.search === '' || totalRooms === 0}
                        className="px-3"
                        onClick={ location.pathname === '/' ? () => {
                            navigate("/auth", {
                                state: {
                                    location: center,
                                    dateRange,
                                    roomRequirements,
                                },
                                // state: jobDetails
                            });
                            // dispatch(clearState());
                        } : () => {
                            navigate("/dashboard/user/current-requests", {
                                state: {
                                    location: center,
                                    dateRange,
                                    roomRequirements,
                                },
                                // state: jobDetails
                            });
                            // dispatch(clearState());
                        }}
                    >
                        Confirm and request
                    </button>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer
