import { Button, Form, Input } from "antd";
import React, { useRef } from "react";

const ManageProfile = () => {

  const formRef = useRef(null);
  const [form] = Form.useForm();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  const handleUpdate = () => {
    formRef.current.submit();
  }

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="manage-profile min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
      <div className="d-flex flex-column gap-4 mt-md-0 mt-5">
        <h2 className="font-poppins mt-4 heading-green">Manage your Profile</h2>
        <div className="w-100 d-flex flex-column gap-lg-5 gap-2 rounded-container bg-white p-xl-5 p-lg-4 py-4 px-2 shadow position-relative">
          <Form
            initialValues={{
                name:"User 01",
                email: "user01@test.com"
            }}
            ref={formRef}
            form={form}
            className="ant-row justify-content-between"
            onFinish={handleFinish}
            onFinishFailed={(errorInfo) => {
              console.log("Failed:", errorInfo);
            }}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <div className="col-sm-6 col-12 px-3">
              <label htmlFor="name" className="mb-1">
                Username
              </label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input moderator's name!",
                  },
                ]}
              >
                <Input placeholder="input moderator's name" />
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
                <Input placeholder="input moderator's email address" />
              </Form.Item>
            </div>
          <div className="col-12 d-flex justify-content-end px-3">
           <Button className="update-btn mt-3" onClick={handleUpdate}>Update</Button>
          </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
