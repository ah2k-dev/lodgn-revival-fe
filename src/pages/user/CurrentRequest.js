import React, { useEffect } from "react";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import ProgressBar from "../../components/layout/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getRequests } from "../../actions/requestActions";
import { message } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const CurrentRequest = () => {
  const navigator = useNavigate();

  const dispatch = useDispatch();
  const { error, loading, requests } = useSelector((state) => state.request);

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
    <div className="w-100 d-flex flex-column justify-content-between gap-5 align-items-start px-md-5 py-5 px-md-4 px-2">
      {loading ? (
        <div className="loader w-100 d-flex justify-content-center align-items-center">
          <LoadingOutlined style={{ fontSize: 65 }} spin />
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-between w-100">
          <div className="d-flex flex-wrap-reverse justify-content-between align-items-md-center mb-5 gap-3 mt-md-0 mt-4">
            <h2>You currently have {requests.length} requests</h2>
            <button
              className="create-request-btn font-poppins fw-bold align-self-end"
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
  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-lg-5 p-4 gap-4 w-100">
      <div className="w-100">
        <JobDetailsGrid
          jobLocation={request.location.string}
          start_date={moment(request?.dateRange[0]).format("DD")}
          end_date={moment(request?.dateRange[1]).format("DD")}
          start_date_month={moment(request?.dateRange[0]).format("MMMM")}
          end_date_month={moment(request?.dateRange[1]).format("MMMM")}
          total_rooms={
            request?.roomRequirements?.single +
            request?.roomRequirements?.double
          }
          single_rooms={request?.roomRequirements?.single}
          double_rooms={request?.roomRequirements?.double}
          animalSupport={request?.roomRequirements?.animalSupport}
        />
        <div className="mt-4">
          <ProgressBar requestStatus={request?.status} />
        </div>
      </div>
      {request.offerings.length > 0 && (
        <div
          // className={`cards-container ${
          //   request.offerings.length >= 3
          //     ? "columns-3"
          //     : request.offerings.length === 2
          //     ? "columns-2"
          //     : "columns-1"
          // } mt-4 justify-content-center`}
          className="cards-container d-flex mt-4 justify-content-center"
        >
          {request.offerings.map((offering, i) => (
            <div className="card" key={i}>
              <Card
                title={offering?.title}
                description={offering?.description}
                distance={1.5}
                singlePrice={offering?.rates.single}
                doublePrice={offering?.rates.double}
                animalSupport={offering?.rates.animalSupport}
                images={offering?.images}
                id={offering?._id}
                request={request}
                paymentLink={offering?.paymentLink}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentRequest;
