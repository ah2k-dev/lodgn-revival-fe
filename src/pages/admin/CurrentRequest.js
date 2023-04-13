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
    <div className="d-flex flex-column justify-content-between gap-5 align-items-start px-5">
      <div className="d-flex flex-column justify-content-between w-100">
        <h2 className="font-poppins mt-4">
          You currently have {requests.length} requests
        </h2>
        <div className="d-flex flex-column justify-content-between gap-5 w-100">
            {requests.map((request) => (    
                <RequestComponent request={request} />
            ))}
        </div>
      </div>
    </div>
  );
};

const RequestComponent = ({ request }) => {
  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-5 gap-4 w-100">
      <div className="ps-4 d-flex justify-content-between">
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
        <div className="d-flex gap-3">
          <div className="col-3 active d-flex align-items-center py-2">
            <span className="fw-bold d-flex justify-content-between align-items-center gap-3">
              <input name="newStatus" type="radio" /> RECEIVED
            </span>
          </div>
          <div className="col-3 d-flex align-items-center py-2">
            <span className="fw-bold d-flex justify-content-between align-items-center gap-3">
              <input name="newStatus" type="radio" /> NEGOTIATING
            </span>
          </div>
          <div className="col-3 d-flex align-items-center py-2">
            <span className="fw-bold d-flex justify-content-between align-items-center gap-3">
              <input name="newStatus" type="radio" /> PAYMENT VERIFIED
            </span>
          </div>
          <div className="col-3 d-flex align-items-center py-2 border-0">
            <span className="fw-bold status-4 d-flex justify-content-between align-items-center gap-3">
              <input name="newStatus" type="radio" checked={true} /> COMPLETED
            </span>
          </div>
        </div>
      </div>
      <div className="row mt-4 gap-0 justify-content-between">
        <h3 className="update-status-text font-poppins text-uppercase fs-6">
          UPDATE STATUS TO CLIENT:
        </h3>
        <div className="row mt-3 justify-content-between">
          <UpdateHotelDetails />
          <UpdateHotelDetails />
          <UpdateHotelDetails />
        </div>
      </div>
    </div>
  );
};

export default CurrentRequest;
