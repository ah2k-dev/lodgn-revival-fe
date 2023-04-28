import React, { useEffect } from "react";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import ProgressBar from "../../components/layout/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getRequests } from "../../actions/requestActions";
import { message, Spin } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const CurrentRequest = () => {
  const navigator = useNavigate();

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
    <div className="w-100 d-flex flex-column justify-content-between gap-5 align-items-start px-md-5 py-md-5 px-4 py-4">
      {loading ? (
        <div className="loader w-100 d-flex justify-content-center align-items-center">
          <LoadingOutlined style={{ fontSize: 65 }} spin />
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-between w-100">
          <div className="d-flex justify-content-between align-items-center mt-5 mb-5 gap-5">
            <h2 className="font-poppins">
              You currently have {requests.length} requests
            </h2>
            <button
              className="create-request-btn font-poppins fw-bold"
              onClick={() => navigator("/dashboard/user/create-request")}
            >
              Create Request
            </button>
          </div>
          <div className="d-flex flex-column justify-content-between gap-5 w-100">
            {requests.map((request, i) => (
              <RequestComponent request={request} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RequestComponent = ({ request }) => {
  // console.log(request.dateRange[0])
  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-lg-5 p-4 gap-4 w-100">
      <div className="w-100">
        <JobDetailsGrid
          jobLocation={request.location.string}
          // jobAddress="Sarasota,FL. 33178"
          start_date={moment(request?.dateRange[0]).format("DD")}
          end_date={moment(request?.dateRange[1]).format("DD")}
          start_date_month={moment(request?.dateRange[0]).format("MMMM")}
          end_date_month={moment(request?.dateRange[1]).format("MMMM")}
          total_rooms={
            request.roomRequirements.single + request.roomRequirements.double
          }
          single_rooms={request.roomRequirements.single}
          double_rooms={request.roomRequirements.double}
          animalSupport={request.roomRequirements.animalSupport}
        />
        <div className="mt-4">
          <ProgressBar requestStatus={request?.status} />
        </div>
      </div>
      {/* <span className='completed-status col-10 rounded-pill mt-4 py-2 px-4 text-white'>COMPLETED</span> */}
      {request.offerings.length > 0 &&
        // !request.hasOwnProperty("bookedOffering") && (
          <div className={`cards-container ${request.offerings.length >= 3 ? 'columns-3' : request.offerings.length === 2 ? 'columns-2' : 'columns-1'} mt-4 justify-content-center`}>
            {/* <div className="col-auto position-relative">
              <span className="rare-find-badge">Rare Find</span>
              <Card
                svgTxt="Holiday Inn"
                distance={1.5}
                singlePrice={120}
                doublePrice={145}
              />
            </div> */}
            {request.offerings.map((offering, i) => (
              <div className="card" key={i}>
                <Card
                  title={offering.title}
                  description={offering.description}
                  distance={1.5}
                  singlePrice={offering.rates.single}
                  doublePrice={offering.rates.double}
                  animalSupport={offering.rates.animalSupport}
                  images={offering.images}
                  id={offering._id}
                  
                  request={request}
                  paymentLink={offering.paymentLink}
                />
              </div>
            ))}
          </div>
        }
      {/* {request.hasOwnProperty("bookedOffering") && (
        <div className={`cards-container columns-1 mt-4 justify-content-center`}>
          <div className="position-relative">
            <span className="rare-find-badge" style={{zIndex:100}}>Booked</span>
            <Card
              title={request.bookedOffering.title}
              description={request.bookedOffering.description}
              distance={1.5}
              singlePrice={request.bookedOffering.rates.single}
              doublePrice={request.bookedOffering.rates.double}
              animalSupport={request.bookedOffering.rates.animalSupport}
              images={request.bookedOffering.images}
              id={request.bookedOffering._id}
              request={request}
              paymentLink={request.bookedOffering.paymentLink}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CurrentRequest;
