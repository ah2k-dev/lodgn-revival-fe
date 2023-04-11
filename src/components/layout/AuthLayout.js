import { Row, Col } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
const AuthLayout = () => {
  // const loggedIn = useAuth();
  // const userRole = useSelector((state) => state.auth.user?.role);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.userData?.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
      // navigate("/dashboard");
    }
  }, [isAuthenticated, user]);
  return (
    <Row className="auth-layout-container">
      <div className="auth-layout-left col-xl-5 col-md-6 col-12">
        <Outlet />
      </div>
      <div className="auth-layout-right d-sm-block d-none col-xl-7 col-md-6"></div>
    </Row>
  );
};

export default AuthLayout;
