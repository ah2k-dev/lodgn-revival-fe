import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputNumber, message } from "antd";
import { clearErrors, getOngoingRequests } from "../../actions/requestActions";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";


const UpdateRequests = () => {

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
      <div className="d-flex flex-column gap-5">
        <h2 className="font-poppins mt-4 heading-green">
          Update stays requests from clients
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
                <h2 className="font-poppins">No Update stays Requests</h2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const RequestComponent = ({ request }) => {

  const [showCard, setShowCard] = useState(false);

  const formRef = useRef();

  const handleSave = ()=> {
    formRef.current.submit();
  }

  return (
    <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
      <div className="row gap-5 justify-content-center">

        {/* Previous Booking Details */}

        <div className="col-12 d-flex flex-column gap-3">
          <span className="font-lato fw-bold">Previous Booking Details</span>
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

        <div className="col-12 btns d-flex justify-content-md-end justify-content-center gap-3">
          <Button className="declineBtn" onClick={() => setShowCard(false)}>Decline</Button>
          <Button className="approveBtn" onClick={() => setShowCard(true)}>Approve</Button>
        </div>

        { showCard && <div className="row">
          <Form
            ref={formRef}
            className="updateRatesContainer col-xxl-5 col-xl-6 d-flex flex-column gap-2 align-items-center"
            onFinish={console.log('success')}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
            autoComplete="off"
          >
            <div className="d-flex flex-column gap-2 w-100">
              <label className="font-lato fw-semibold">Add single room rates.</label>
              <Form.Item
                name="name"
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
                name="name"
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
                name="name"
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
        </div> }
      </div>
    </div>
  );
};

export default UpdateRequests;
