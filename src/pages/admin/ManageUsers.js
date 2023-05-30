import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Tabs,
  Button,
  Input,
  Space,
  Table,
  Modal,
  Form,
  Checkbox,
  Col,
  Row,
  Tag,
} from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { createModerator, fetchUsers } from "../../actions/userActions";
import { GetPermissions, UseGetRole } from "../../hooks/auth";
import { LoadingOutlined } from "@ant-design/icons";

const ManageUsers = () => {
  const role = UseGetRole();

  const { error, loading, users, moderators } = useSelector(
    (state) => state.user
  );

  const [tabIndex, setTabIndex] = useState("1");

  const formRef = useRef(null);

  const [showPasswordField, setShowPasswordField] = useState(true);

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const res = await dispatch(createModerator(values));
    if (res) {
      form.resetFields();
      setIsModalOpen(false);
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  const openEditModal = (record) => {
    form.setFieldsValue(record);
    setShowPasswordField(false);
    setIsModalOpen(true);
  };

  const showModal = () => {
    setShowPasswordField(true);
    form.resetFields();
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    formRef.current.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    if (key === "1") {
      setTabIndex("1");
    } else {
      setTabIndex("2");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let items;

  if (role === "moderator") {
    items = [
      {
        key: "1",
        label: `Users`,
        children: <UsersTable tabIndex={tabIndex} data={users} />,
      },
    ];
  } else {
    items = [
      {
        key: "1",
        label: `Users`,
        children: <UsersTable tabIndex={tabIndex} data={users} />,
      },
      {
        key: "2",
        label: `Moderators`,
        children: (
          <UsersTable
            tabIndex={tabIndex}
            data={moderators}
            handleEditModal={openEditModal}
          />
        ),
      },
    ];
  }

  return (
    <div className="manage-users py-5 d-flex flex-column gap-2 align-items-end">
      {loading ? (
        <div className="loader w-100 d-flex justify-content-center align-items-center">
          <LoadingOutlined style={{ fontSize: 65 }} spin />
        </div>
      ) : (
        <>
          {tabIndex === "2" && (
            <Button className="add-mod-btn" onClick={() => showModal()}>
              Add Moderator
            </Button>
          )}
          <Tabs
            className="w-100"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
          <Modal
            title="Add Moderator"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Save"
          >
            <Form
              ref={formRef}
              form={form}
              className="ant-row"
              onFinish={handleFinish}
              onFinishFailed={(errorInfo) => {
                // console.log("Failed:", errorInfo);
              }}
              autoComplete="off"
              validateMessages={validateMessages}
            >
              <div className="col-12">
                <label htmlFor="name" className="mb-1">
                  Name
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
              <div className="col-12">
                <label htmlFor="email" className="mb-1">
                  Email
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
              {showPasswordField !== false && (
                <div className="col-12">
                  <label htmlFor="password">Password</label>
                  <Form.Item
                    className="w-100"
                    name="password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    style={{ marginBottom: "0" }}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </div>
              )}
              <div className="col-12">
                <label htmlFor="permissions">Permissions:</label>
                <Form.Item
                  name="permissions"
                  rules={[
                    {
                      required: true,
                      message: "Please select a permission!",
                    },
                  ]}
                >
                  <Checkbox.Group>
                    <Row>
                      <Col span={12}>
                        <Checkbox value="rejectRequest" className="mb-1">
                          Reject Requests
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="negotiate" className="mb-1">
                          Negotiate
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="complete" className="mb-1">
                          Complete
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="verifyPayment" className="mb-1">
                          Verify Payment
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="approveUpdates" className="mb-1">
                          Approve Requested Updates
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="declineUpdates" className="mb-1">
                          Decline Requested Updates
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="blockUser" className="mb-1">
                          Block Users
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="unblockUser" className="mb-1">
                          Unblock Users
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

const UsersTable = ({ tabIndex, data, handleEditModal }) => {
  const role = UseGetRole();

  const permissions = GetPermissions();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
  ];

  if (tabIndex === "1") {
    columns.push(
      {
        title: "Email Verified",
        dataIndex: "emailVerified",
        key: "emailVerified",
        render: (item) => (item === true ? "Yes" : "No"),
      },
      {
        title: "Quick Actions",
        render: (record) => (
          <div className="d-flex justify-content-center">
            <Button
              disabled={
                role === "moderator" && !permissions.includes("blockUser")
              }
              danger
              className="block-btn"
            >
              {!record.isBlocked ? "Block" : "Unblock"}
            </Button>
          </div>
        ),
      }
    );
  } else {
    columns.push(
      {
        title: "Permissions",
        dataIndex: "permissions",
        key: "permissions",
        render: (permissions) => {
          return permissions
            ?.map((permission) => {
              switch (permission) {
                case "rejectRequest":
                  return "Reject Requests";
                case "negotiate":
                  return "Negotiate";
                case "complete":
                  return "Complete";
                case "verifyPayment":
                  return "Verify Payment";
                case "approveUpdates":
                  return "Approve Requested Updates";
                case "declineUpdates":
                  return "Decline Requested Updates";
                case "blockUser":
                  return "Block Users";
                case "unblockUser":
                  return "Unblock Users";
                default:
                  return permission;
              }
            })
            .join(", ");
        },
      },
      {
        title: "Quick Actions",
        render: (_, record) => (
          <div className="d-flex justify-content-center gap-3">
            <Button
              danger
              className="edit-btn"
              onClick={() => handleEditModal(record)}
            >
              Edit
            </Button>
            <Button danger className="block-btn">
              {!record.isBlocked ? "Block" : "Unblock"}
            </Button>
          </div>
        ),
      }
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record._id}
    />
  );
};

export default ManageUsers;
