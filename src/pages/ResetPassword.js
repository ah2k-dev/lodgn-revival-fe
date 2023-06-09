import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  requestToken,
  resetPassword,
} from "../actions/authActions";
import { Button, Form, Input, Row, Typography, message } from "antd";
import BackButton from "../components/BackButton";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = useParams();
  const dispatch = useDispatch();
  const [resendToken, setResendToken] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error({
        content: "Passwords do not match",
        style: {
          marginTop: "10vh",
        },
      });
      return;
    }
    const res = await dispatch(
      resetPassword(values.token, email, values.password)
    );
    if (res) {
      navigate("/auth", { state: location?.state });
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
            <Typography.Title level={3}>Reset Password</Typography.Title>
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
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
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
              </div>
              {resendToken && (
                <span
                  className="resend-token-text"
                  onClick={() => dispatch(requestToken(email, "reset"))}
                >
                  Resend verification token
                </span>
              )}
            </Form>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default ResetPassword;
