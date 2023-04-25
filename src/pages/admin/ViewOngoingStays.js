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
import HotelPhotosCarousel from "../../components/layout/HotelPhotosCarousel";


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
    <div className="w-100 px-lg-5 px-md-3 px-4 py-5">
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

  const imageUrls = [
    {
      url: "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png"
    },
    {
      url: "https://cdn.vox-cdn.com/thumbor/yJuBQtYK2euiOWE3lj_dtloWkvs=/160x0:1239x607/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/46708944/manyminions.0.jpg"
    },
    {
      url: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/11/11/1447263891657/Minions-009.jpg?width=620&quality=85&auto=format&fit=max&s=8a643616a29f6832d52a06ceafab39d6"
    },
  ] 


  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
      <div className="d-flex justify-content-md-between align-items-center flex-wrap items justify-content-center">
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
        <div className="col-xl-3 col-sm-6 mt-xl-0 mt-4 col-12">
          <HotelPhotosCarousel images={imageUrls}/>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <PaidPerNight singles={request.bookedOffering.rates.single} doubles={request.bookedOffering.rates.double} />
        <span className="completed-status">COMPLETED</span>
      </div>
    </div>
  );
};

export default ViewOngoingStays;
