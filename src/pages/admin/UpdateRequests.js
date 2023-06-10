import React, { useEffect, useRef, useState } from "react";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputNumber, message } from "antd";
import {
  approveRejectUpdate,
  clearErrors,
  getRequestUpdates,
} from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { baseURL } from "../../services/axiosConfig";
import { GetPermissions, UseGetRole } from "../../hooks/auth";

const UpdateRequests = () => {
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
    <div className="w-100 px-lg-5 px-md-3 px-4 py-5">
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
  const role = UseGetRole();

  const permissions = GetPermissions();

  const [showCard, setShowCard] = useState(false);

  const formRef = useRef();

  const handleSave = () => {
    formRef.current.submit();
  };

  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-xl-5 p-lg-4 p-4 position-relative">
      <div className="row gap-5 justify-content-center">
        <div className="d-flex flex-md-row flex-column-reverse justify-content-between align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
          <div className="row gap-5 justify-content-center">
            {update?.status !== "approved" && (
              <div className="col-12 d-flex flex-column gap-3">
                <span className="font-cairo fw-bold fs-6">
                  Previous Booking Details
                </span>
                <JobDetailsGrid
                  jobLocation={request.location.string}
                  start_date={moment(request.dateRange[0]).format("DD")}
                  end_date={moment(request.dateRange[1]).format("DD")}
                  start_date_month={moment(request.dateRange[0]).format("MMM")}
                  end_date_month={moment(request.dateRange[1]).format("MMM")}
                  total_rooms={
                    request.roomRequirements.single +
                    request.roomRequirements.double
                  }
                  single_rooms={request.roomRequirements.single}
                  double_rooms={request.roomRequirements.double}
                  animalSupport={request.roomRequirements.animalSupport}
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

        {update?.status === "pending" && (
          <div className="col-12 btns d-flex justify-content-md-end justify-content-center gap-3">
            <Button
              className="declineBtn"
              disabled={
                role === "moderator" && !permissions.includes("declineUpdates")
              }
              onClick={() => {
                dispatch(
                  approveRejectUpdate({
                    id: update._id,
                    status: "rejected",
                  })
                );
              }}
            >
              Decline
            </Button>
            <Button
              disabled={
                role === "moderator" && !permissions.includes("approveUpdates")
              }
              className="approveBtn"
              onClick={() => setShowCard(true)}
            >
              Approve
            </Button>
          </div>
        )}

        {showCard && (
          <div className="row">
            <Form
              ref={formRef}
              className="updateRatesContainer col-xxl-5 col-xl-6 d-flex flex-column gap-2 align-items-center"
              onFinish={async (values) => {
                const res = await dispatch(
                  approveRejectUpdate({
                    id: update._id,
                    status: "approved",
                    rates: {
                      single: values.single_rooms_rate,
                      double: values.double_rooms_rate,
                      animalSupport: values.animal_rate,
                    },
                  })
                );
                if (res) {
                  setShowCard(false);
                }
              }}
              onFinishFailed={(errorInfo) => {
                console.log("Failed:", errorInfo);
              }}
              autoComplete="off"
            >
              {update?.roomRequirements?.single ? (
                <div className="d-flex flex-column gap-2 w-100">
                  <label className="font-cairo fw-semibold">
                    Add single room rates.
                  </label>
                  <Form.Item
                    name="single_rooms_rate"
                    rules={[
                      {
                        required: true,
                        message: "Please add single room rates!",
                      },
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </div>
              ) : null}
              {update?.roomRequirements?.double ? (
                <div className="d-flex flex-column gap-2 w-100">
                  <label className="font-cairo fw-semibold">
                    Add double room rates.
                  </label>
                  <Form.Item
                    name="double_rooms_rate"
                    rules={[
                      {
                        required: true,
                        message: "Please add single room rates!",
                      },
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </div>
              ) : null}
              {update?.roomRequirements?.animalSupport ? (
                <div className="d-flex flex-column gap-2 w-100">
                  <label className="font-cairo fw-semibold">
                    Add animal support.
                  </label>
                  <Form.Item
                    name="animal_rate"
                    rules={[
                      {
                        required: true,
                        message: "Please add single room rates!",
                      },
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </div>
              ) : null}
              <div className="row mt-2 w-100">
                <Button className="saveBtn" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRequests;
