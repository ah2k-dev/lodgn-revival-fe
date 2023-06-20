import React, { useEffect, useRef } from "react";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import { useState } from "react";
import { Button, message, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import UpdateHotelDetails from "../../components/layout/UpdateHotelDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  clearErrors,
  getRequests,
  rejectReuest,
} from "../../actions/requestActions";
import moment from "moment";
import { GetPermissions, UseGetRole } from "../../hooks/auth";

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
    <div className="d-flex flex-column justify-content-between gap-5 align-items-start px-md-5 px-3">
      <div className="d-flex flex-column justify-content-between w-100">
        <h2 className="mt-5 mb-4">
          You currently have {requests.length} requests
        </h2>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({ request, status, index }) => {
  const role = UseGetRole();

  const permissions = GetPermissions();

  const [newStatus, setNewStatus] = useState(status);
  const [offerings, setOfferings] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.request);

  let count = [1, 2, 3];

  const handleRadioChange = (e) => {
    setNewStatus(e.target.value); // saves the memory usage
  };

  const handleUpdate = (id) => {
    if (newStatus !== "completed") {
      if (newStatus === "paymentVerified") {
        dispatch(
          changeStatus(id, {
            status: newStatus,
            selectedOffer: selectedOffer,
            selectedFile: receipt,
          })
        );
      } else {
        dispatch(
          changeStatus(id, {
            status: newStatus,
          })
        );
      }
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
      }
    }
  };

  const rejectRequestFunc = (id) => {
    dispatch(rejectReuest(id));
  };

  const [receipt, setReceipt] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleSelect = (value) => {
    setSelectedOffer(value);
  };

  const handleUploadButton = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFile = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);

    if (fileUploaded) {
      const fileType = fileUploaded.type;
      const fileSizeInBytes = fileUploaded.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to megabytes

      if (fileSizeInMB > 1) {
        message.error(`The file size shouldn't be greater than 1MB`);
      } else if (
        fileType === "application/pdf" ||
        fileType === "image/png" ||
        fileType === "image/jpeg" ||
        fileType === "image/jpg"
      ) {
        message.success(`${fileUploaded.name} is selected`);
        setReceipt(fileUploaded);
      } else {
        message.error(
          `${fileUploaded.name} is not a valid file format`
        );
      }
    }
  };

  return (
    <div className="rounded-container d-flex flex-column justify-content-between bg-white p-lg-5 p-4 gap-4 w-100 mb-5">
      <div className="admin-page d-flex flex-column justify-content-between align-items-start">
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
                disabled={
                  request.status === "completed" ||
                  request.status === "paymentVerified"
                }
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
                  request.status === "paymentVerified" ||
                  (role === "moderator" && !permissions.includes("negotiate"))
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
                  request.status === "recieved" ||
                  (role === "moderator" && !permissions.includes("complete"))
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
                disabled={
                  request.status !== "completed" ||
                  (role === "moderator" &&
                    !permissions.includes("verifyPayment"))
                }
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
        </div>
      )}

      <div className="btns d-flex gap-3 justify-content-end w-100 align-items-center mt-lg-0 mt-5 mb-3">
        {newStatus === "paymentVerified" && (
          <>
            <Button
              className="upload-receipt-btn w-auto"
              onClick={handleUploadButton}
            >
              Upload payment receipt
            </Button>
            <input
              type="file"
              id="file"
              ref={hiddenFileInput}
              onChange={handleFile}
              style={{ display: "none" }}
            />
            <Select
              showSearch
              placeholder="Select an offering"
              optionFilterProp="children"
              onChange={handleSelect}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={request?.offerings.map((offer) => ({
                value: offer._id,
                label: offer.title,
              }))}
            />
          </>
        )}
        {(newStatus !== request.status || offerings.length > 0) && (
          <Button
            className="update-status-btn"
            loading={loading}
            onClick={() => handleUpdate(request._id)}
            disabled={
              (newStatus === "completed" && offerings.length === 0) ||
              (newStatus === "paymentVerified" && selectedOffer === "") ||
              (newStatus === "paymentVerified" && !receipt)
            }
          >
            Update
          </Button>
        )}
        {newStatus === "recieved" || newStatus === "negotiating" ? (
          <Button
            disabled={
              role === "moderator" && !permissions.includes("rejectRequest")
            }
            className="reject-request-btn"
            onClick={() => rejectRequestFunc(request._id)}
          >
            Reject Request
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CurrentRequest;
