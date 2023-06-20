import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  loginWithRequestPayload,
  requestToken,
  verifyEmail,
} from "../actions/authActions";
import { Button, Form, Input, Row, Typography, message } from "antd";
import BackButton from "../components/BackButton";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = useParams();
  const dispatch = useDispatch();

  const [resendToken, setResendToken] = useState(false);

  const {
    loading,
    error,
    isAuthenticated,
    user,
    center,
    dateRange,
    roomRequirements,
  } = useSelector(
    (state) => state.auth,
    (state) => state.map
  );

  const request = {
    location: center,
    dateRange: dateRange,
    roomRequirements: roomRequirements,
  };

  const onFinish = async (values) => {
    const res = await dispatch(
      verifyEmail(values.token, email, request, location?.state?.password)
    );
    // if (res) {
    // console.log("working");
    // localStorage.setItem("token", res.data.data.token);
    // localStorage.setItem("user", res.data.data.user);
    // navigate("/auth", { state: location?.state });
    // }
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

    setTimeout(() => {
      setResendToken(true);
    }, 1000 * 60);
  }, [error, dispatch]);

  return (
    <div className="auth-container position-relative">
      <div className="auth-backBtn position-absolute start-0">
        <BackButton />
      </div>
      <div className="auth-inner">
        <Row className="auth-form">
          <div className="col-8 col-sm-6 col-md-9 col-lg-8 col-xl-8">
            <Typography.Title level={3}>Verify Email Token</Typography.Title>
            <Typography.Paragraph>
              Enter the token that has been sent to your email. If you haven't
              received the email, please check your spam folder.
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{
                color: "red",
              }}
            >
              Note: The token will expire in 10 minutes.
            </Typography.Paragraph>
            <Form
              className="ant-row"
              onFinish={onFinish}
              onFinishFailed={(errorInfo) => {
                console.log("Failed:", errorInfo);
              }}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <div className="col-12">
                <Form.Item
                  name="token"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Token" min={0} />
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
                    Verify
                  </Button>
                </Form.Item>
                {resendToken && (
                  <a
                    className="resend-token-text"
                    onClick={() => dispatch(requestToken(email, "request"))}
                  >
                    Resend verification token
                  </a>
                )}
              </div>
            </Form>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default VerifyEmail;
