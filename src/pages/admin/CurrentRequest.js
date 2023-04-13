import React, { useEffect } from "react";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import { useState } from "react";
import { Button, Upload, message } from "antd";
import UpdateHotelDetails from "../../components/layout/UpdateHotelDetails";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getRequests } from "../../actions/requestActions";
import moment from "moment";

const CurrentRequest = () => {

  const dispatch = useDispatch();
  const { error, loading, requests } = useSelector((state) => state.request);

  // console.log(requests);

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error({
        content: error,
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="d-flex flex-column justify-content-between gap-5 align-items-start px-md-5 px-3">
      <div className="d-flex flex-column justify-content-between w-100">
        <h2 className="font-poppins mt-5 mb-4">
          You currently have {requests.length} requests
        </h2>
        <div className="d-flex flex-column justify-content-between w-100">
          {requests.map((request, i) => (
            <RequestComponent request={request} status={request.status} key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const RequestComponent = ({ request, status, index }) => {

  const [newStatus, setNewStatus] = useState(status);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setNewStatus(value);
  }

  // console.log(status);

  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-lg-5 p-4 gap-4 w-100 mb-5">
      <div className="admin-page d-flex justify-content-between align-items-start">
        <JobDetailsGrid
          jobLocation={request.location.string}
          //   jobAddress="Sarasota,FL. 33178"
          start_date={moment(request?.dateRange[0]).format("DD")}
          end_date={moment(request?.dateRange[1]).format("DD")}
          start_date_month={moment(request?.dateRange[0]).format("MMMM")}
          end_date_month={moment(request?.dateRange[1]).format("MMMM")}
          total_rooms={request?.roomRequirements?.single + request?.roomRequirements?.double}
          single_rooms={request?.roomRequirements?.single}
          double_rooms={request?.roomRequirements?.double}
        />
        <button className="update-status-btn py-2 px-5 font-poppins text-white">
          Update
        </button>
      </div>
      <div className="update-status row justify-content-center">
        <h3 className="update-status-text font-poppins text-uppercase fs-6">
          UPDATE STATUS TO CLIENT:
        </h3>
        <div className="row justify-content-between gap-3">
          <div className='col-lg-2 col-sm-4 d-flex align-items-center py-2'>
            <label className="fw-bold status-yellow d-flex justify-content-between align-items-center gap-3">
              <input name={'newStatus-' + index} type="radio" value="recieved" defaultChecked={status === 'recieved'} onClick={handleRadioChange} />
              RECEIVED
            </label>
          </div>
          <div className='col-lg-2 col-sm-4 d-flex align-items-center py-2'>
            <label className="fw-bold status-blue d-flex justify-content-between align-items-center gap-3">
              <input name={'newStatus-' + index} type="radio" value="negotiating" defaultChecked={status === 'negotiating'} onClick={handleRadioChange} />
              NEGOTIATING
            </label>
          </div>
          <div className='col-lg-2 col-sm-4 d-flex align-items-center py-2'>
            <label className="fw-bold status-green d-flex justify-content-between align-items-center gap-3">
              <input name={'newStatus-' + index} type="radio" value="completed" defaultChecked={status === 'completed'} onClick={handleRadioChange} />
              COMPLETED
            </label>
          </div>
          <div className='col-lg-2 col-sm-4 d-flex align-items-center py-2'>
            <label className="fw-bold status-green d-flex justify-content-between align-items-center gap-3">
              <input name={'newStatus-' + index} type="radio" value="paymentVerified" defaultChecked={status === 'paymentVerified'} onClick={handleRadioChange} />
              PAYMENT VERIFIED
            </label>
          </div>
        </div>
      </div>
      {newStatus === 'completed' && <div className="row mt-4 gap-0 justify-content-xl-between justify-content-center">
        <h3 className="update-status-text font-poppins text-uppercase fs-6">
          UPDATE STATUS TO CLIENT:
        </h3>
        <div className="row mt-3 justify-content-between">
          <UpdateHotelDetails />
          <UpdateHotelDetails />
          <UpdateHotelDetails />
        </div>
      </div>}
    </div>
  );
};

export default CurrentRequest;
