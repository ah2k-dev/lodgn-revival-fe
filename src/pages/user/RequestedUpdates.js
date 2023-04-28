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
  getRequestUpdates,
} from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const RequestedUpdates = () => {
  const dispatch = useDispatch();

  const { error, loading, requestedUpdates } = useSelector(
    (state) => state.request
  );

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
    dispatch(getRequestUpdates());
  };

  useEffect(() => {
    fetch();
  }, [dispatch]);

  return (
    <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="font-poppins mt-4 heading-green">
          You currently have {requestedUpdates.length} requested updates
        </h2>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {requestedUpdates.length > 0 ? (
              requestedUpdates.map((requestedUpdate, i) => (
                <RequestComponent
                  request={requestedUpdate.request}
                  update={requestedUpdate}
                  key={i}
                />
                // <></>
              ))
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="font-poppins">No Update stays Requests</h2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({ request, update }) => {
  console.log(update);

  return (
    <div className="ongoingStays w-100 d-flex flex-column gap-lg-5 gap-2 rounded-container bg-white p-xl-5 p-lg-4 p-4 shadow position-relative">
      <div className="d-flex flex-md-row flex-column-reverse justify-content-between align-items-start flex-md-nowrap flex-wrap gap-md-0 gap-3">
        <div className="row gap-5 justify-content-center">
          {/* Previous Booking Details */}

          <div className="col-12 d-flex flex-column gap-3">
            <span className="font-lato fw-bold fs-6">
              Previous Booking Details
            </span>
            <JobDetailsGrid
              jobLocation={request.location.string}
              // jobAddress="Sarasota,FL. 33178"
              start_date={moment(request.dateRange[0]).format("DD")}
              end_date={moment(request.dateRange[1]).format("DD")}
              start_date_month={moment(request.dateRange[0]).format("MMM")}
              end_date_month={moment(request.dateRange[1]).format("MMM")}
              total_rooms={
                request.roomRequirements.single +
                request.roomRequirements.double
              }
              single_rooms={request.roomRequirements.single}
              double_rooms={request.roomRequirements.double}
              animalSupport={request.roomRequirements.animalSupport}
            />
          </div>

          {/* New Booking Details */}

          <div className="col-12 d-flex flex-column gap-3">
            <span className="font-lato fw-bold">
              New Requested Booking Details
            </span>
            <JobDetailsGrid
              jobLocation={request?.location.string}
              // jobAddress="Sarasota,FL. 33178"
              start_date={moment(update?.dateRange[0]).format("DD")}
              end_date={moment(update?.dateRange[1]).format("DD")}
              start_date_month={moment(update?.dateRange[0]).format("MMM")}
              end_date_month={moment(update?.dateRange[1]).format("MMM")}
              total_rooms={
                update?.roomRequirements.single +
                update?.roomRequirements.double
              }
              single_rooms={update?.roomRequirements.single}
              double_rooms={update?.roomRequirements.double}
              animalSupport={update?.roomRequirements.animalSupport}
            />
          </div>
        </div>
        <div className="request-status d-flex justify-content-end">
          <span className="py-2 px-4 fw-bold rounded-3">
            <span
              className={`update-Requested-badge px-3 py-2 rounded-3 fw-bold font-poppins ${
                update?.status === "rejected"
                  ? "rejected-status"
                  : "approved-status"
              } ${
                update?.status === "pending" ? "text-warning" : "text-white"
              } align-self-end`}
            >
              {update?.status}
            </span>
            {/* {update?.status === "pending" ? (
              <span className="text-warning">Pending</span>
            ) : update?.status === "approved" ? (
              <span className="text-success">Approved</span>
            ) : (
              <span className="text-danger">Rejected</span>
            )} */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestedUpdates;