import React, { useEffect } from "react";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import ProgressBar from "../../components/layout/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getRequests } from "../../actions/requestActions";
import { message } from "antd";
import moment from "moment";

const CurrentRequest = () => {
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
    <div className="dashboard d-flex flex-column justify-content-between gap-5 align-items-start px-5 py-5">
      <div className="d-flex flex-column justify-content-between w-100">
        <h2 className="font-poppins mt-4">
          You currently have {requests.length} requests
        </h2>
        <div className="d-flex flex-column justify-content-between gap-5 w-100">
        {requests.map((request) => (
          <RequestComponent request={request} />
          ))}
          </div> 
      </div>
    </div>
  );
};

const RequestComponent = ({ request }) => {
  // console.log(request.dateRange[0])
  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-5 gap-4 w-100">
      <div style={{ width: "fit-content" }} className="row">
        <div className="col-auto">
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
          />
          <div className="mt-4">
            <ProgressBar requestStatus={request?.status} />
          </div>
        </div>
        {/* <span className='completed-status col-10 rounded-pill mt-4 py-2 px-4 text-white'>COMPLETED</span> */}
      </div>
      {request.offerings.length > 0 && (
        <div className="row mt-4 gap-0 justify-content-between">
          <div className="col-auto position-relative">
            <span className="rare-find-badge">Rare Find</span>
            <Card
              svgTxt="Holiday Inn"
              distance={1.5}
              singlePrice={120}
              doublePrice={145}
            />
          </div>
          <div className="col-auto">
            <Card
              svgTxt="Holiday Inn"
              distance={1.5}
              singlePrice={120}
              doublePrice={145}
            />
          </div>
          <div className="col-auto">
            <Card
              svgTxt="Holiday Inn"
              distance={1.5}
              singlePrice={120}
              doublePrice={145}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentRequest;
