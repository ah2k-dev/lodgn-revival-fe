import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputNumber, message } from "antd";
import { approveRejectUpdate, clearErrors, getRequestUpdates, } from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";


const UpdateRequests = () => {

  const dispatch = useDispatch();

  const { error, loading, requestedUpdates } = useSelector((state) => state.request);

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
        <h2 className="font-poppins mt-4 heading-green">
          You currently have {requestedUpdates.length} requested updates
        </h2>
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {requestedUpdates.length > 0 ? (
              requestedUpdates.map((requestedUpdate, i) => (
                <RequestComponent request={requestedUpdate.request} update={requestedUpdate} key={i} />
              ))
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({ request, update }) => {

  const [showCard, setShowCard] = useState(false);

  const formRef = useRef();

  const handleSave = () => {
    formRef.current.submit();
  }

  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
      <div className="row gap-5 justify-content-center">

        {/* Previous Booking Details */}

        <div className="col-12 d-flex flex-column gap-3">
          <span className="font-lato fw-bold fs-6">Previous Booking Details</span>
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
        </div>

        {/* New Booking Details */}

        <div className="col-12 d-flex flex-column gap-3">
          <span className="font-lato fw-bold">New Requested Booking Details</span>
          <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-start align-items-center gap-3">
            <JobDetailsGrid
              jobLocation={request.location.string}
              // jobAddress="Sarasota,FL. 33178"
              start_date={moment(update?.dateRange[0]).format("DD")}
              end_date={moment(update?.dateRange[1]).format("DD")}
              start_date_month={moment(update?.dateRange[0]).format("MMM")}
              end_date_month={moment(update?.dateRange[1]).format("MMM")}
              total_rooms={update?.roomRequirements.single + update?.roomRequirements.double}
              single_rooms={update?.roomRequirements.single}
              double_rooms={update?.roomRequirements.double}
              animalSupport={update?.roomRequirements.animalSupport}
            />
            <span className="d-flex flex-column align-items-center gap-1">
              <span className="font-lato fw-bold">Download attachments:</span>
              <span style={{cursor:'pointer'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="" width={24}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </span>
            </span>
          </div>
        </div>

        <div className="col-12 btns d-flex justify-content-md-end justify-content-center gap-3">
          <Button className="declineBtn" onClick={() => {
            dispatch(approveRejectUpdate({
              id: update._id,
              status: 'rejected'
            }))
          }}>Decline</Button>
          <Button className="approveBtn" onClick={() => setShowCard(true)}>Approve</Button>
        </div>

        {showCard && <div className="row">
          <Form
            ref={formRef}
            className="updateRatesContainer col-xxl-5 col-xl-6 d-flex flex-column gap-2 align-items-center"
            onFinish={async(values)=>{
              const res = await dispatch(approveRejectUpdate({
                id: update._id,
                status: 'approved',
                rates: {
                  single: values.single_rooms_rate,
                  double: values.double_rooms_rate,
                  animalSupport: values.animal_rate
                }
              }))
              if(res){
                setShowCard(false);
              }
              // setShowCard(false);
            }}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
            autoComplete="off"
          >
            <div className="d-flex flex-column gap-2 w-100">
              <label className="font-lato fw-semibold">Add single room rates.</label>
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
            <div className="d-flex flex-column gap-2 w-100">
              <label className="font-lato fw-semibold">Add double room rates.</label>
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
            <div className="d-flex flex-column gap-2 w-100">
              <label className="font-lato fw-semibold">Add animal support.</label>
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
            <div className="row mt-2 w-100">
              <Button className="saveBtn" onClick={handleSave}>Save</Button>
            </div>
          </Form>
        </div>}
      </div>
    </div>
  );
};

export default UpdateRequests;
