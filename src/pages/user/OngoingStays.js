import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="d-flex flex-column gap-4 mt-md-0 mt-3">
        <h2 className="heading-green">
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
            ) : null}
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
      <div className="d-flex flex-md-row flex-column-reverse justify-content-md-between justify-content-sm-end align-items-md-center align-items-end flex-md-nowrap flex-wrap gap-md-0 gap-4 justify-content-center">
        <JobDetailsGrid
          jobLocation={request?.location?.string}
          start_date={moment(request?.dateRange[0])?.format("DD")}
          end_date={moment(request?.dateRange[1])?.format("DD")}
          start_date_month={moment(request?.dateRange[0])?.format("MMMM")}
          end_date_month={moment(request?.dateRange[1])?.format("MMMM")}
          user={request?.user}
          total_rooms={
            request?.roomRequirements?.single + request?.roomRequirements?.double
          }
          single_rooms={request?.roomRequirements?.single}
          double_rooms={request?.roomRequirements?.double}
          animalSupport={request?.roomRequirements?.animalSupport}
        />
        {request?.updateRequested && (
          <span className="update-Requested-badge green-badge text-white px-3 py-2 rounded-3 fw-bold font-poppins">
            Update Requested
          </span>
        )}
      </div>
      <div className="row gap-3 mt-5 justify-content-center">
        <div className="col-md-5 col-xl-4 col-lg-5 col-sm-8 col-12 position-relative">
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
          <h3 className="font-cairo fw-bold text-md-start text-center">
            {moment(request.dateRange[0])
              .fromNow()
              .replace(/^in /, "")
              .replace(/ ago$/, "")}{" "}
            left on this Booking.
          </h3>
          <div>
            <span className="green-span fs-6 font-poppins">Quick actions:</span>
            <div className="mt-4 btns d-flex flex-wrap gap-3">
              <Button
                className="update-btn font-cairo text-white"
                disabled={request?.updateRequested}
                onClick={() =>
                  navigate("/dashboard/user/update-stay", { state: request })
                }
              >
                Update stay
              </Button>
              <Button
                onClick={() =>
                  navigate("/dashboard/user/create-request", { state: request })
                }
                className="rebook-btn text-white"
              >
                Rebook stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingStays;
