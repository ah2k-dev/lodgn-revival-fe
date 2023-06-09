import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportsTable from "../../components/layout/ReportsTable";
import { LoadingOutlined } from "@ant-design/icons";
import { clearErrors, fetchReports, getPreviousStays } from "../../actions/requestActions";
import { message } from "antd";

const Reports = () => {
  const dispatch = useDispatch();
  const { loading, error, reports } = useSelector((state) => state.request);

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
              <ReportsTable tableData={reports} />
            ) : (
              <h2 className="heading-green">
                Reports not found
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
