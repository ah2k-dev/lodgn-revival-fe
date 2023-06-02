import { Button, Form, Input, Row, Typography, message } from "antd";
import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, requestToken } from "../actions/authActions";

const RequstToken = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const onFinish = async (values) => {
    let type;
    if (pathname === "/auth/requestToken") {
      type = "request";
    } else {
      type = "reset";
    }
    const res = await dispatch(requestToken(values.email, type));
    if (res) {
      if (type === "request") {
        navigate("/auth/verifyEmail/" + values.email, {
          state: location?.state,
        });
      } else {
        navigate("/auth/resetPassword/" + values.email, {
          state: location?.state,
        });
      }
    }
  };

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
  }, [error, dispatch]);

  return (
    <div className="auth-container position-relative">
      <div className="auth-backBtn position-absolute start-0">
        <BackButton />
      </div>
      <div className="auth-inner">
        <Row className="auth-form w-100">
          <div className="col-8 col-sm-6 col-md-9 col-lg-8 col-xl-8">
            <Typography.Title level={3}>Find your Account</Typography.Title>
            <Typography.Paragraph>
              Enter your email address and we'll send you a link to get back
              into your account.
            </Typography.Paragraph>
            <Form
              className="ant-row"
              onFinish={onFinish}
              onFinishFailed={(errorInfo) => {
                // console.log("Failed:", errorInfo);
              }}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <div className="col-12">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input type="email" placeholder="Email" />
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="activeBtn verify-btn"
                    loading={loading}
                  >
                    Send Link
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default RequstToken;
