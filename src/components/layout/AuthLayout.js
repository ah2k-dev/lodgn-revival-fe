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
      <Col span={11} className="auth-layout-left">
        <Outlet />
      </Col>
      <Col span={13} className="auth-layout-right d-md-block d-none"></Col>
    </Row>
  );
};

export default AuthLayout;
