import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { clearErrors, getOngoingRequests } from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";


const ViewOngoingStays = () => {
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
    <div className="min-vh-100 w-100 p-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="font-poppins mt-4 heading-green">
          These are the current client stays
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
              <h2 className="font-poppins">No ongoing stays</h2>
              </div>
          )}
          </>
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({request}) => {
  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <JobDetailsGrid
          jobLocation={request.location.string}
          // jobAddress="Sarasota,FL. 33178"
          start_date={moment(request.dateRange[0]).format("DD")}
          end_date={moment(request.dateRange[1]).format("DD")}
          start_date_month={moment(request.dateRange[0]).format("MMM")}
          end_date_month={moment(request.dateRange[1]).format("MMM")}
          total_rooms={request.roomRequirements.single + request.roomRequirements.double}
          single_rooms={request.roomRequirements.single}
          double_rooms={request.roomRequirements.double}
          animalSupport={request.roomRequirements.animalSupport}
        />
        <span>
          <span className="fs-5 font-poppins fst-italic green-span text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="59"
              fill="none"
              viewBox="0 0 54 59"
            >
              <path
                stroke="#85C371"
                strokeLinecap="round"
                strokeWidth="5"
                d="M22.019 6.563c-2.264 2.82-7.426 15.41-9.962 43.202M38.32 3c-3.774 5.048-11.593 22.714-12.68 53M3 36.849c5.132-6.532 21.917-19.24 48-17.815"
              ></path>
            </svg>
            Holiday Inn
          </span>
        </span>
      </div>
      <div className="d-flex justify-content-between flex-wrap gap-3">
        <PaidPerNight singles={request.bookedOffering.rates.single} doubles={request.bookedOffering.rates.double} />
        <span className="completed-status">COMPLETED</span>
      </div>
    </div>
  );
};

export default ViewOngoingStays;
