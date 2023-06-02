import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import moment from "moment";

const ReportsTable = ({ tableData }) => {
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
              confirm({
                closeDropdown: true,
              });
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
      title: "Request",
      dataIndex: "request",
      key: "request",
      ...getColumnSearchProps("request"),
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("DD MMMM"),
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => moment(endDate).format("DD MMMM"),
    },
    {
      title: "Total paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
      render: (totalPaid) => `$${totalPaid}`,
    },
    {
      title: "Price/Single Room",
      dataIndex: "paidPerSingle",
      key: "paidPerSingle",
      render: (paidPerSingle) => (paidPerSingle ? `$${paidPerSingle}` : "N/A"),
    },
    {
      title: "Price/Double Room",
      dataIndex: "paidPerDouble",
      key: "paidPerDouble",
      render: (paidPerDouble) => (paidPerDouble ? `$${paidPerDouble}` : "N/A"),
    },
    {
      title: "Price/Animal Support",
      dataIndex: "paidPerAnimal",
      key: "paidPerAnimal",
      render: (paidPerAnimal) => (paidPerAnimal ? `$${paidPerAnimal}` : "N/A"),
    },
  ];

  if (tableData.some((item) => item.user)) {
    columns.push({
      title: "User",
      render: (record) =>
        `${record?.firstname !== undefined ? record?.firstname : ""} ${
          record?.lastname !== undefined ? record?.lastname : ""
        }`,
    });
    // columns.push({
    //   title: "User",
    //   dataIndex: "user",
    //   key: "user",
    // });
  }

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey={(record) => record._id}
    />
  );
};

export default ReportsTable;
//
