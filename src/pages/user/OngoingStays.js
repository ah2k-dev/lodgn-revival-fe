import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { clearErrors, getOngoingRequests } from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const OngoingStays = () => {
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
      <div className="d-flex flex-column gap-4 mt-md-0 mt-5">
        <h2 className="font-poppins mt-3 heading-green">
          You currently have {onGoing.length} ongoing stay
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

const RequestComponent = ({ request }) => {

  const navigate = useNavigate();

  return (
    <div className="ongoingStays w-100 d-flex flex-column gap-lg-5 gap-2 rounded-container bg-white p-xl-5 p-lg-4 p-4 shadow position-relative">
      <span className="position-absolute request-status py-2 px-4 fw-bold rounded-3">Approved</span>
      <JobDetailsGrid
        jobLocation={request.location.string}
        start_date={moment(request.dateRange[0]).format("DD")}
        end_date={moment(request.dateRange[1]).format("DD")}
        start_date_month={moment(request.dateRange[0]).format("MMMM")}
        end_date_month={moment(request.dateRange[1]).format("MMMM")}
        total_rooms={
          request.roomRequirements.single + request.roomRequirements.double
        }
        single_rooms={request.roomRequirements.single}
        double_rooms={request.roomRequirements.double}
      />
      <div className="row gap-3 mt-5 justify-content-center">
        <div className="col-md-5 col-xl-4 col-lg-5 col-sm-8 col-12 position-relative">
          {/* <span className="rare-find-badge">Rare Find</span> */}
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
        <div className="col-md-12 col-xl-7 col-lg-6 ms-3 d-flex flex-column align-items-lg-start align-items-center md-lg-0 mt-4">
          <h3 className="font-lato fw-bold text-md-start text-center">
            {moment(request.dateRange[0]).fromNow().replace(/^in /, "")} left on
            this Booking.
          </h3>
          <div>
            <span className="green-span fs-6 font-poppins">Quick actions:</span>
            <div className="mt-4 btns d-flex flex-wrap gap-3">
              <Button className="update-btn font-poppins text-white" onClick={()=> navigate('/dashboard/user/update-stay', { state: request }) }>
                Update stay
              </Button>
              <Link>
                <Button className="rebook-btn font-poppins text-white">
                  Rebook stay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingStays;
