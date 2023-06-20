import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { clearErrors, getPreviousStays } from "../../actions/requestActions";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import HotelPhotosCarousel from "../../components/layout/HotelPhotosCarousel";

const PreviousStays = () => {
  const dispatch = useDispatch();
  const { error, loading, previousStays } = useSelector(
    (state) => state.request
  );

  const fetch = () => {
    dispatch(getPreviousStays());
  };

  useEffect(() => {
    fetch();
  }, []);

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
    <div className="min-vh-100 w-100 px-md-5 px-2 py-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="heading-green">
          You currently have {previousStays.length} previous stay
        </h2>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          previousStays?.map((stay, i) => (
            <PreviousRequests stay={stay} key={i} />
          ))
        )}
      </div>
    </div>
  );
};

const PreviousRequests = ({ stay }) => {

  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
      <div className="d-flex justify-content-md-between align-items-start flex-wrap items justify-content-center">
        <JobDetailsGrid
          jobLocation={stay?.request?.location?.string}
          start_date={moment(stay?.request?.dateRange[0]).format("DD")}
          end_date={moment(stay?.request?.dateRange[1]).format("DD")}
          start_date_month={moment(stay?.request?.dateRange[0]).format("MMM")}
          end_date_month={moment(stay?.request?.dateRange[1]).format("MMM")}
          total_rooms={stay?.request?.roomRequirements?.single + stay?.request?.roomRequirements?.double}
          single_rooms={stay?.request?.roomRequirements?.single}
          double_rooms={stay?.request?.roomRequirements?.double}
          animalSupport={stay?.request?.roomRequirements?.animalSupport}
        />
        <span className="col-xl-3 col-md-6 col-sm-8 col-12 mt-xl-0 mt-5">
        <HotelPhotosCarousel images={stay?.request?.bookedOffering?.images} />
          {/* <span className="fs-5 font-poppins fst-italic green-span text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
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
            {stay?.request?.bookedOffering?.title}
          </span> */}
        </span>
      </div>
      <PaidPerNight singles={stay?.request?.bookedOffering?.rates?.single} doubles={stay?.request?.bookedOffering?.rates?.double} animals={stay?.request?.bookedOffering?.rates?.animalSupport} />
    </div>
  );
};

export default PreviousStays;
