import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportsTable from "../../components/layout/ReportsTable";
import { LoadingOutlined } from "@ant-design/icons";
import {
  clearErrors,
  fetchReports,
  getPreviousStays,
} from "../../actions/requestActions";
import { Button, message } from "antd";

const AdminReports = () => {
  const dispatch = useDispatch();
  const { error, loading, reports } = useSelector((state) => state.request);

  const fetch = () => {
    dispatch(fetchReports());
  };

  useEffect(() => {
    fetch();
  }, []);

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

  console.log(reports);

  const data = [
    {
      key: "1",
      request: "Karachi, Pakistan",
      start_date: "03 April",
      end_date: "27 April",
      total_paid: 50.45,
      paid_per_single_room: 5.45,
      paid_per_double_room: 10.0,
      paid_for_animals: 4.0,
      // room_details: '6 singles, 3 doubles, 3 animal support',
      status: ["recieved"],
    },
    {
      key: "2",
      request: "Balochistan, Pakistan",
      start_date: "07 May",
      end_date: "30 May",
      total_paid: 35.33,
      paid_per_single_room: 6.5,
      // room_details: '4 singles',
      status: ["negotiating"],
    },
    {
      key: "3",
      request: "North Nazimabad, Karachi, Pakistan",
      start_date: "07 May",
      end_date: "21 May",
      total_paid: 15.95,
      paid_per_double_room: 11.67,
      // room_details: '3 doubles',
      status: ["completed"],
    },
    {
      key: "4",
      request: "Johar Town, Lahore, Pakistan",
      start_date: "07 May",
      end_date: "21 May",
      total_paid: 20.19,
      paid_per_double_room: 12.12,
      // room_details: '3 doubles',
      status: ["paymentverified"],
    },
  ];

  return (
    <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="reports d-flex flex-column gap-4 mt-md-0 mt-5">
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {data.length > 0 ? (
              <div className="row justify-content-end gap-4">
                <Button className="w-auto d-flex gap-2 align-items-center me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={20}
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Download Reports
                </Button>
                <ReportsTable tableData={reports} />
              </div>
            ) : (
              <h2 className="font-poppins mt-4 heading-green">
                Reports not found
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
