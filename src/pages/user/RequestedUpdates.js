import React, { useEffect } from "react";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { clearErrors, getRequestUpdates } from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const RequestedUpdates = () => {
  const dispatch = useDispatch();

  const { error, loading, requestedUpdates } = useSelector(
    (state) => state.request
  );

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
    dispatch(getRequestUpdates());
  };

  useEffect(() => {
    fetch();
  }, [dispatch]);

  return (
    <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="heading-green">
          You currently have {requestedUpdates.length} requested updates
        </h2>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {requestedUpdates.length > 0
              ? requestedUpdates.map((requestedUpdate, i) => (
                  <RequestComponent
                    request={requestedUpdate.request}
                    update={requestedUpdate}
                    key={i}
                  />
                ))
              : null}
          </>
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({ request, update }) => {
  return (
    <div className="ongoingStays w-100 d-flex flex-column gap-lg-5 gap-2 rounded-container bg-white p-xl-5 p-lg-4 p-4 shadow position-relative">
      <div className="d-flex flex-md-row flex-column-reverse justify-content-between align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
        <div className="row gap-5 justify-content-center">
          {update?.status !== "approved" && (
            <div className="col-12 d-flex flex-column gap-3">
              <span className="font-cairo fw-bold fs-6">
                Previous Booking Details
              </span>
              <JobDetailsGrid
                jobLocation={request?.location?.string}
                start_date={moment(request?.dateRange[0])?.format("DD")}
                end_date={moment(request?.dateRange[1])?.format("DD")}
                start_date_month={moment(request?.dateRange[0])?.format("MMM")}
                end_date_month={moment(request?.dateRange[1])?.format("MMM")}
                total_rooms={
                  request?.roomRequirements?.single +
                  request?.roomRequirements?.double
                }
                single_rooms={request?.roomRequirements?.single}
                double_rooms={request?.roomRequirements?.double}
                animalSupport={request?.roomRequirements?.animalSupport}
              />
            </div>
          )}

          {/* New Booking Details */}

          <div className="col-12 d-flex flex-column gap-3">
            <span className="font-cairo fw-bold">
              New Requested Booking Details
            </span>
            <JobDetailsGrid
              jobLocation={request?.location.string}
              start_date={moment(update?.dateRange[0]).format("DD")}
              end_date={moment(update?.dateRange[1]).format("DD")}
              start_date_month={moment(update?.dateRange[0]).format("MMM")}
              end_date_month={moment(update?.dateRange[1]).format("MMM")}
              total_rooms={
                update?.roomRequirements.single +
                update?.roomRequirements.double
              }
              single_rooms={update?.roomRequirements.single}
              double_rooms={update?.roomRequirements.double}
              animalSupport={update?.roomRequirements.animalSupport}
            />
          </div>
        </div>
        <div className="request-status d-flex justify-content-end align-self-md-start align-self-end">
          <span className="py-2 px-4 fw-bold rounded-3">
            <span
              className={`update-Requested-badge px-3 py-2 rounded-3 fw-bold font-poppins ${
                update?.status === "rejected"
                  ? "rejected-status"
                  : "approved-status"
              } ${
                update?.status === "pending" ? "text-warning" : "text-white"
              } align-self-end`}
            >
              {update?.status}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestedUpdates;
