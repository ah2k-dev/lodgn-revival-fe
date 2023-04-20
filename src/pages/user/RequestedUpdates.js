import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputNumber, message } from "antd";
import { clearErrors, getOngoingRequests } from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const RequestedUpdates = () => {
  const dispatch = useDispatch();

  const { error, loading, onGoing } = useSelector((state) => state.request);

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
    dispatch(getOngoingRequests());
  };

  useEffect(() => {
    fetch();
  }, [dispatch]);

  return (
    <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="font-poppins mt-4 heading-green">
        You currently have {onGoing.length} requested updates
        </h2>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {onGoing.length > 0 ? (
              onGoing.map((request, i) => (
                <RequestComponent request={request} key={i} />
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

const RequestComponent = ({ request }) => {
  const [showCard, setShowCard] = useState(false);

  const formRef = useRef();

  const handleSave = () => {
    formRef.current.submit();
  };

  return (
    <div className="ongoingStays w-100 d-flex flex-column gap-lg-5 gap-2 rounded-container bg-white p-xl-5 p-lg-4 p-4 shadow position-relative">
      <span className="position-absolute request-status py-2 px-4 fw-bold rounded-3">
        Approved
      </span>
      <div className="row gap-5 justify-content-center">
        {/* Previous Booking Details */}

        <div className="col-12 d-flex flex-column gap-3">
          <span className="font-lato fw-bold fs-6">Previous Booking Details</span>
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

        {/* New Booking Details */}

        <div className="col-12 d-flex flex-column gap-3">
          <span className="font-lato fw-bold">
            New Requested Booking Details
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

export default RequestedUpdates;
