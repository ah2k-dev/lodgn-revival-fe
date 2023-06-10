import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPersonalInfo,
  updatePasswordRequest,
  updatePersonalInfo,
} from "../actions/userActions";

const ManageProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const formRef = useRef(null);
  const [form] = Form.useForm();
  const formRef2 = useRef(null);
  const [form2] = Form.useForm();

  const [updatePassword, setUpdatePassword] = useState(false);

  const handleUpdatePasswordModal = () => {
    setUpdatePassword(true);
  };

  const handleUpdate = () => {
    formRef.current.submit();
  };

  const handleFinish = async (values) => {
    const res = await dispatch(updatePersonalInfo(values));
    if (res) {
      await dispatch(fetchPersonalInfo());
    }
  };

  const handleUpdatePassword = () => {
    formRef2.current.submit();
  };

  const handleUpdatePasswordFinish = async (values) => {
    // console.log(values);
    const res = await dispatch(updatePasswordRequest(values));
    if (res) {
      form2.resetFields();
      setUpdatePassword(false);
    }
  };

  return (
    <div className="manage-profile min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-4 mt-md-0 mt-5">
        <h2 className="heading-green">Manage your Profile</h2>
        <div className="w-100 d-flex flex-column gap-lg-3 gap-2 rounded-container bg-white p-xl-5 p-lg-4 py-4 px-2 shadow position-relative">
          <Form
            initialValues={{
              firstName: user.userData?.firstname,
              lastName: user.userData?.lastname,
              email: user.userData?.email,
              phone: user.userData?.phone,
              company: user.userData?.company,
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
                <Input placeholder="input your email address" disabled />
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
            <div className="update-btns col-12 d-flex justify-content-end gap-2 px-3">
              <Button
                className="update-password-btn mt-3"
                onClick={handleUpdatePasswordModal}
              >
                Update Password
              </Button>
              <Button
                className="update-btn mt-3"
                loading={loading}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </Form>

          <Modal
            title="Update Your Password"
            open={updatePassword}
            onOk={handleUpdatePassword}
            onCancel={() => {
              setUpdatePassword(false);
              form2.resetFields();
            }}
            okText="Update"
          >
            <Form
              ref={formRef2}
              form={form2}
              className="ant-row"
              onFinish={handleUpdatePasswordFinish}
              onFinishFailed={(errorInfo) => {
                console.log("Failed:", errorInfo);
              }}
              autoComplete="off"
            >
              <div className="col-12">
                <label htmlFor="currentPassword">Current Password</label>
                <Form.Item
                  className="w-100"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current password!",
                    },
                  ]}
                  style={{ marginBottom: "0" }}
                >
                  <Input.Password placeholder="Current Password" />
                </Form.Item>
              </div>
              <div className="col-12">
                <label htmlFor="newPassword">New Password</label>
                <Form.Item
                  className="w-100"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                    },
                  ]}
                  style={{ marginBottom: "0" }}
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>
              </div>
              <div className="col-12">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <Form.Item
                  className="w-100"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
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
                  style={{ marginBottom: "0" }}
                >
                  <Input.Password placeholder="Confirm New Password" />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
