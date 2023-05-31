import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputNumber, message } from "antd";
import {
  clearErrors,
  getOngoingRequests,
  getRejectedReuests,
} from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const RejectedRequests = () => {
  const dispatch = useDispatch();

  const { error, loading, rejected } = useSelector((state) => state.request);

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
  }, [error]);

  const fetch = () => {
    dispatch(getRejectedReuests());
  };

  useEffect(() => {
    fetch();
  }, [dispatch]);

  return (
    <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-5">
        <div>
          <h2 className="font-poppins mt-4 heading-green">
            You currently have {rejected.length} rejected requests
          </h2>
          {rejected.length > 0 && (
            <span className="fs-6 font-poppins grey-text">
              The LODGN Team are unable to confirm these Requests at the moment.
            </span>
          )}
        </div>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {rejected.length > 0 ? (
              rejected.map((request, i) => (
                <RequestComponent request={request} key={i} />
              ))
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({ request }) => {
  return (
    <div className="ongoingStays w-100 d-flex flex-column gap-lg-5 gap-2 rounded-container bg-white p-xl-5 p-lg-4 p-4 shadow position-relative">
      <div className="d-flex flex-md-row flex-column-reverse justify-content-between align-items-start flex-md-nowrap flex-wrap gap-md-0 gap-3">
        <div className="col-12 d-flex flex-column gap-3">
          <span className="font-lato fw-bold fs-6">
            Rejected Request Booking Details
          </span>
          <JobDetailsGrid
            jobLocation={request.location.string}
            // jobAddress="Sarasota,FL. 33178"
            start_date={moment(request.dateRange[0]).format("DD")}
            end_date={moment(request.dateRange[1]).format("DD")}
            start_date_month={moment(request.dateRange[0]).format("MMM")}
            end_date_month={moment(request.dateRange[1]).format("MMM")}
            total_rooms={
              request.roomRequirements.single + request.roomRequirements.double
            }
            single_rooms={request.roomRequirements.single}
            double_rooms={request.roomRequirements.double}
            animalSupport={request.roomRequirements.animalSupport}
          />
        </div>
      </div>
    </div>
  );
};

export default RejectedRequests;
