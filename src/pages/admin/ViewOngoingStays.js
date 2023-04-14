import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { clearErrors, getOngoingRequests } from "../../actions/requestActions";

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
        <RequestComponent />
      </div>
    </div>
  );
};

const RequestComponent = () => {
  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <JobDetailsGrid
          jobLocation="St Judes Hospital"
          jobAddress="Sarasota,FL. 33178"
          start_date={10}
          end_date={17}
          start_date_month="October"
          end_date_month="December"
          total_rooms={20}
          single_rooms={10}
          double_rooms={10}
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
        <PaidPerNight singles={120} doubles={145} />
        <span className="completed-status">COMPLETED</span>
      </div>
    </div>
  )
}

export default ViewOngoingStays;
