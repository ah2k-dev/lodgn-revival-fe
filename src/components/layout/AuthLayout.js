import { Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      if (
        user?.userData?.role === "admin" ||
        user?.userData?.role === "moderator"
      ) {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    }
  }, [isAuthenticated, user]);
  return (
    <Row className="auth-layout-container">
      <div className="auth-layout-left col-xl-5 col-md-6 col-12">
        <Outlet />
      </div>
      <div className="auth-layout-right d-md-flex d-none col-xl-7 col-md-6">
        <h1>
          Better rates,
          <br />
          Better savings.
        </h1>
      </div>
    </Row>
  );
};

export default AuthLayout;
