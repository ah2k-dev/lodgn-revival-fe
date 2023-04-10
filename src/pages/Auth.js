import {
  Row,
  Typography,
  Form,
  Input,
  Col,
  Button,
  Divider,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signup, login, loginWithRequestPayload } from "../actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const [active, setActive] = useState("login");
  const [emailVerify, setEmailVerify] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const formRef = useRef(null);
  const onFinish = (values) => {
    if (active === "login") {
      if(location.state){
        dispatch(loginWithRequestPayload({
          email: values.email,
          password: values.password,
          location: location.state?.location,
          dateRange: location.state?.dateRange,
          roomRequirements: location.state?.roomRequirements
        }))
      } else {
        dispatch(login(values.email, values.password));
      }
    } else {
      const res = dispatch(signup(values.name, values.email, values.password));
      if(res){
        setActive("login")
      }
    }
  };
  const handleSignUp = () => {
    if (active !== "signup") {
      return;
    }
    formRef.current.submit();
  };
  const handleLogin = () => {
    if (active !== "login") {
      return;
    }
    formRef.current.submit();
  };

  useEffect(() => {
    if (error) {
      if (error.includes("Email not verified")) {
        setEmailVerify(true);
      }
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
    <div className="auth-container">
      <div className="auth-inner">
        <Typography.Title level={5} className='text-green'>Log in or sign up to book</Typography.Title>
        <Row className="auth-form">
          <Form
            ref={formRef}
            className="ant-row"
            onFinish={onFinish}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
            autoComplete="off"
          >
            {active == "signup" && (
              <Col span={20}>
                <label htmlFor="name">User-name</label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  {/* <p className="labels">Name</p> */}
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
            )}
            <Col span={20}>
            <label htmlFor="email">E-mail</label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                {/* <p className="labels">E-mail</p> */}
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={20}>
            <label htmlFor="password">Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                style={{ marginBottom: "0" }}
              >
                {/* <p className="labels">Password</p> */}
                <Input type="password" placeholder="Password" />
              </Form.Item>
            </Col>
            {/* <Col span={20} className="email-senders">
              <Form.Item>
                {emailVerify && (
                  <a className="verify-email" onClick={()=> navigate('/auth/requestToken')}>Request email token</a>
                )}
                {!emailVerify && (
                  <a className="forgot-password" onClick={()=> navigate('/auth/forgot-password')}>Forgot password?</a>
                )}
              </Form.Item>
            </Col> */}
            <Col span={20} className='mt-4'>
              <Form.Item>
                <div className="auth-buttons">
                  {active == "login" ? (
                    <Button
                      className="authBtn activeBtn"
                      type={active == "login" ? "primary" : "button"}
                      onClick={handleLogin}
                      loading={loading}
                      // htmlType="submit"
                    >
                      Log - in
                    </Button>
                  ) : (
                    <Button
                      className="authBtn "
                      type={active == "login" ? "primary" : "button"}
                      onClick={() => {
                        setActive("login");
                      }}
                    >
                      Log - in
                    </Button>
                  )}
                  {active == "signup" ? (
                    <Button
                      className="authBtn activeBtn"
                      type={active == "signup" ? "primary" : "button"}
                      onClick={handleSignUp}
                      loading={loading}
                    >
                      Sign - Up
                    </Button>
                  ) : (
                    <Button
                      className="authBtn"
                      type={active == "signup" ? "primary" : "button"}
                      onClick={() => {
                        setActive("signup");
                      }}
                    >
                      Sign - Up
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Form>
          <Divider>OR</Divider>
          <Col span={20}>
            <Button className="btnGoogle">
              <img src="/assets/icons/google.png" alt="google" />{" "}
              <span>Continue with Google</span>
            </Button>
          </Col>
          <Col span={20}>
            <Button className="btnGoogle mt-4">
              <img src="/assets/icons/apple.png" alt="apple" />{" "}
              <span>Continue with Apple</span>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Auth;
