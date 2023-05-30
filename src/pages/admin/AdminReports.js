import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportsTable from "../../components/layout/ReportsTable";
import { LoadingOutlined } from "@ant-design/icons";
import {
  clearErrors,
  fetchReports,
} from "../../actions/requestActions";
import { Button, message } from "antd";
import { CSVLink } from "react-csv";

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

  return (
    <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="reports d-flex flex-column gap-4 mt-md-0 mt-5">
        {loading ? (
          <div className="loader w-100 d-flex justify-content-center align-items-center">
            <LoadingOutlined style={{ fontSize: 65 }} spin />
          </div>
        ) : (
          <>
            {reports.length > 0 ? (
              <div className="row justify-content-end gap-4">
                <Button className="download-reports-btn w-auto d-flex gap-2 align-items-center me-3">
                  <CSVLink data={reports}>
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
                  </CSVLink>
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
