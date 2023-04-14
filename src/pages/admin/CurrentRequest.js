import React, { useEffect } from "react";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import { useState } from "react";
import { Button, Upload, message } from "antd";
import UpdateHotelDetails from "../../components/layout/UpdateHotelDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  clearErrors,
  getRequests,
} from "../../actions/requestActions";
import moment from "moment";

const CurrentRequest = () => {
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
    <div className="d-flex flex-column justify-content-between gap-5 align-items-start px-md-5 px-3">
      <div className="d-flex flex-column justify-content-between w-100">
        <h2 className="font-poppins mt-5 mb-4">
          You currently have {requests.length} requests
        </h2>
        <div className="d-flex flex-column justify-content-between w-100">
          {requests.map((request, i) => (
            <RequestComponent
              request={request}
              status={request.status}
              key={i}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const RequestComponent = ({ request, status, index }) => {
  const [newStatus, setNewStatus] = useState(status);
  const [offerings, setOfferings] = useState([]);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.request);

  let count = [1, 2, 3];

  const handleRadioChange = (e) => {
    // const value = e.target.value;
    setNewStatus(e.target.value); // saves the memory usage
  };

  const handleUpdate = (id) => {
    if (newStatus !== "completed") {
      dispatch(
        changeStatus(id, {
          status: newStatus,
          // status: newStatus,
        })
      );
    } else {
      if (offerings.length === 0) {
        message.error({
          content: "Please upload the hotel offerings",
          style: {
            marginTop: "10vh",
          },
        });
        return;
      } else {
        dispatch(
          changeStatus(id, {
            status: newStatus,
            offerings: offerings,
          })
        );
        // console.log(offerings);
      }
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     message.error({
  //       content: error,
  //       style: {
  //         marginTop: "10vh",
  //       },
  //     });
  //     dispatch(clearErrors());
  //   }
  // }, [error, dispatch]);

  // console.log(status);

  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-lg-5 p-4 gap-4 w-100 mb-5">
      <div className="admin-page d-flex justify-content-between align-items-start">
        <JobDetailsGrid
          jobLocation={request.location.string}
          //   jobAddress="Sarasota,FL. 33178"
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
        />
        {newStatus !== request.status && (
          // <button className="update-status-btn py-2 px-5 font-poppins text-white" onClick={handleUpdate}>
          //   Update
          // </button>
          <Button
            loading={loading}
            onClick={() => handleUpdate(request._id)}
            disabled={newStatus === "completed" && offerings.length == 0}
          >
            Update
          </Button>
        )}
      </div>
      <div className="update-status row justify-content-center">
        <h3 className="update-status-text font-poppins text-uppercase fs-6">
          UPDATE STATUS TO CLIENT:
        </h3>
        <div className="row justify-content-between gap-3">
          <div className="col-lg-2 col-sm-4 d-flex align-items-center py-2">
            <label className="fw-bold status-yellow d-flex justify-content-between align-items-center gap-3">
              <input
                name={"newStatus-" + index}
                type="radio"
                value="recieved"
                defaultChecked={"recieved" === request.status}
                onClick={handleRadioChange}
              />
              RECEIVED
            </label>
          </div>
          <div className="col-lg-2 col-sm-4 d-flex align-items-center py-2">
            <label className="fw-bold status-blue d-flex justify-content-between align-items-center gap-3">
              <input
                name={"newStatus-" + index}
                type="radio"
                value="negotiating"
                defaultChecked={"negotiating" === request.status}
                disabled={
                  request.status === "completed" ||
                  request.status === "paymentVerified"
                }
                onClick={handleRadioChange}
              />
              NEGOTIATING
            </label>
          </div>
          <div className="col-lg-2 col-sm-4 d-flex align-items-center py-2">
            <label className="fw-bold status-green d-flex justify-content-between align-items-center gap-3">
              <input
                name={"newStatus-" + index}
                type="radio"
                value="completed"
                defaultChecked={"completed" === request.status}
                disabled={
                  request.status === "paymentVerified" ||
                  request.status === "recieved"
                }
                onClick={handleRadioChange}
              />
              COMPLETED
            </label>
          </div>
          <div className="col-lg-2 col-sm-4 d-flex align-items-center py-2">
            <label className="fw-bold status-green d-flex justify-content-between align-items-center gap-3">
              <input
                name={"newStatus-" + index}
                type="radio"
                value="paymentVerified"
                defaultChecked={"paymentVerfied" === request.status}
                disabled={request.status != "completed"}
                onClick={handleRadioChange}
              />
              PAYMENT VERIFIED
            </label>
          </div>
        </div>
      </div>
      {newStatus === "completed" && (
        <div className="row mt-4 gap-0 justify-content-xl-between justify-content-center">
          <h3 className="update-status-text font-poppins text-uppercase fs-6">
            UPDATE STATUS TO CLIENT:
          </h3>
          {!request.hasOwnProperty("bookedOffering") && (
            <div className="row mt-3 justify-content-between">
              {count.map((val, ind) => {
                return (
                  <UpdateHotelDetails
                    offerings={offerings}
                    setOfferings={setOfferings}
                    key={ind}
                    flag={val}
                    request={request}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
      {request.hasOwnProperty("bookedOffering") && (
        <div className="col-auto position-relative">
          <span className="rare-find-badge">Booked</span>
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
      )}
    </div>
  );
};

export default CurrentRequest;
