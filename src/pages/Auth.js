import { Row, Typography, Form, Input, Button, Divider, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  signup,
  login,
  loginWithRequestPayload,
  googleAuth,
} from "../actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";
import { clearState } from "../actions/mapActions";
import { GoogleLogin } from "@react-oauth/google";
import { signInWithGoogle } from "../services/firebase";
import firebase from "../services/firebase";

const Auth = () => {
  const [active, setActive] = useState("login");
  const [emailVerify, setEmailVerify] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.state);

  // const { location , dateRange , roomRequirements } = locate.state;

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const validatePassword = (_, value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!value) {
      return Promise.reject("Please enter a password");
    }

    if (!passwordRegex.test(value)) {
      return Promise.reject(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
    }

    return Promise.resolve();
  };

  const formRef = useRef(null);
  const onFinish = async (values) => {
    if (active === "login") {
      if (location.state) {
        dispatch(
          loginWithRequestPayload({
            email: values.email,
            password: values.password,
            location: location.state?.location,
            dateRange: location.state?.dateRange,
            roomRequirements: location.state?.roomRequirements,
          })
        );
      } else {
        dispatch(login(values.email, values.password));
      }
    } else {
      console.log(values);
      const res = await dispatch(
        signup(
          values.firstname,
          values.lastname,
          values.email,
          values.password,
          values.phone,
          values.company
        )
      );
      // .then((res) => {
      // });
      console.log(res);
      if (!res) {
        setActive("signup");
      } else {
        navigate("/auth/verifyEmail/" + values.email, {
          state: location.state,
        });
        // setActive("login");
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
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

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

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(
        googleAuth({
          email: user.email,
          name: user.displayName,
          profilePic: user.photoURL,
          emailVerified: user.emailVerified,
        })
      );
      setUser();
    }
  }, [user]);

  return (
    <div className="auth-container position-relative">
      {console.log(user)}
      <div className="auth-inner">
        <Row className="auth-form">
          <div className="col-8 col-sm-6 col-md-9 col-lg-8 col-xl-8 pb-5">
            <Typography.Title level={5} className="text-green">
              Log in or sign up to book
            </Typography.Title>
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
                <div className="col-12 d-flex justify-content-between">
                  <div className="col-6 pe-2">
                    <label htmlFor="firstname">First Name</label>
                    <Form.Item
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </div>
                  <div className="col-6 ps-2">
                    <label htmlFor="lastname">Last Name</label>
                    <Form.Item
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </div>
                </div>
              )}
              <div className="col-12">
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
                  <Input type="email" placeholder="Email" />
                </Form.Item>
              </div>
              <div className="col-12">
                <label htmlFor="password">Password</label>
                <Form.Item
                  className="w-100"
                  name="password"
                  rules={[{ validator: validatePassword }]}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your password!",
                  //   },
                  // ]}
                  style={{ marginBottom: "0" }}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </div>
              {active === "signup" && (
                <>
                  <div className="col-12">
                    <label htmlFor="phone_number">Phone Number</label>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          message: "Please input a valid phone number!",
                          pattern: /^[0-9]+$/,
                        },
                      ]}
                    >
                      <Input placeholder="Phone number" />
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label htmlFor="company">Company</label>
                    <Form.Item
                      name="company"
                      rules={[
                        {
                          required: true,
                          message: "Please input your company name!",
                        },
                      ]}
                    >
                      <Input placeholder="Company" />
                    </Form.Item>
                  </div>
                </>
              )}
              <div className="email-senders">
                <Form.Item>
                  {emailVerify && active !== "signup" && (
                    <a
                      className="verify-email"
                      onClick={() => navigate("/auth/requestToken")}
                    >
                      Request email token
                    </a>
                  )}
                  {!emailVerify && active !== "signup" && (
                    <a
                      className="forgot-password"
                      onClick={() => {
                        navigate("/auth/forgot-password", {
                          state: location?.state,
                        });
                      }}
                    >
                      Forgot password?
                    </a>
                  )}
                </Form.Item>
              </div>
              <div className="mt-1 col-12">
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
              </div>
            </Form>
            <Divider>OR</Divider>
            <div className="col-12">
              <Button className="btnGoogle" onClick={signInWithGoogle}>
                <img src="/assets/icons/google.png" alt="google" />{" "}
                <span>Continue with Google</span>
              </Button>
            </div>
            <div className="col-12">
              <Button className="btnGoogle mt-4">
                <img src="/assets/icons/apple.png" alt="apple" />{" "}
                <span>Continue with Apple</span>
              </Button>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Auth;
