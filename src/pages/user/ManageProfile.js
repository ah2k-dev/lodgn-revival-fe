import { Button, Checkbox, Form, Input } from "antd";
import React, { useRef, useState } from "react";

const ManageProfile = () => {
  const formRef = useRef(null);
  const [form] = Form.useForm();

  const [updatePassword, setUpdatePassword] = useState(false);

  const handleUpdate = () => {
    formRef.current.submit();
  };

  const handleFinish = (values) => {
    // console.log(values);
  };

  return (
    <div className="manage-profile min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-4 mt-md-0 mt-5">
        <h2 className="font-poppins mt-4 heading-green">Manage your Profile</h2>
        <div className="w-100 d-flex flex-column gap-lg-3 gap-2 rounded-container bg-white p-xl-5 p-lg-4 py-4 px-2 shadow position-relative">
          <Form
            initialValues={{
              firstName: "User",
              lastName: "01",
              email: "user01@test.com",
            }}
            ref={formRef}
            form={form}
            className="ant-row justify-content-between"
            onFinish={handleFinish}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
            autoComplete="off"
          >
            <div className="col-sm-6 col-12 px-3">
              <label htmlFor="firstName" className="mb-1">
                First Name
              </label>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First name is required!",
                  },
                ]}
              >
                <Input placeholder="input your first name" />
              </Form.Item>
            </div>
            <div className="col-sm-6 col-12 px-3">
              <label htmlFor="lastName" className="mb-1">
                Last Name
              </label>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last name is required!",
                  },
                ]}
              >
                <Input placeholder="input your last name" />
              </Form.Item>
            </div>
            <div className="col-sm-6 col-12 px-3">
              <label htmlFor="email" className="mb-1">
                Email Address
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input placeholder="input your email address" />
              </Form.Item>
            </div>
            <div className="col-sm-6 col-12 px-3">
              <label htmlFor="phone" className="mb-1">
                Phone Number
              </label>
              <Form.Item
                name="phone"
                rules={[
                  {
                    message: "Please input a valid phone number!",
                    pattern: /^[0-9]+$/,
                  },
                ]}
              >
                <Input placeholder="input your phone number" />
              </Form.Item>
            </div>
            <div className="col-sm-6 col-12 px-3">
              <label htmlFor="company" className="mb-1">
                company
              </label>
              <Form.Item
                name="company"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input placeholder="input your company name" />
              </Form.Item>
            </div>
            <div className="col-12 px-3">
              <Checkbox onChange={() => setUpdatePassword(!updatePassword)}>
                Update Password
              </Checkbox>
            </div>
            <div className="col-12 d-flex justify-content-end px-3">
              <Button className="update-btn mt-3" onClick={handleUpdate}>
                Update
              </Button>
            </div>
          </Form>

          {updatePassword && (
            <Form
              initialValues={{
                password: "",
                confirm_password: "",
              }}
              ref={formRef}
              form={form}
              className="ant-row justify-content-between"
              onFinish={handleFinish}
              onFinishFailed={(errorInfo) => {
                // console.log("Failed:", errorInfo);
              }}
              autoComplete="off"
              // validateMessages={validateMessages}
            >
              <div className="col-sm-6 col-12 px-3">
                <label htmlFor="password" className="mb-1">
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your new password!",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your new password" />
                </Form.Item>
              </div>
              <div className="col-sm-6 col-12 px-3">
                <label htmlFor="confirm_password" className="mb-1">
                  Confirm Password
                </label>
                <Form.Item
                  name="confirm_password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Confirm password is required!",
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
                  <Input.Password placeholder="Confirm new password!" />
                </Form.Item>
              </div>
              <div className="col-12 d-flex justify-content-end px-3">
                <Button className="update-btn mt-3" onClick={handleUpdate}>
                  Update Password
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
