import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

const ReportsTable = ({tableData}) => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
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
                    color: filtered ? '#1890ff' : undefined,
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
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            // width: '30%',
            ...getColumnSearchProps('location'),
        },
        {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
            // width: '20%',
            // ...getColumnSearchProps('start_date'),
        },
        {
            title: 'End date',
            dataIndex: 'end_date',
            key: 'end_date',
            // width: '20%',
            // ...getColumnSearchProps('end_date'),
        },
        {
            title: 'Total rooms',
            dataIndex: 'total_rooms',
            key: 'total_rooms',
            // ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Room details',
            dataIndex: 'room_details',
            key: 'room_details',
            // ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'recieved',
                    value: 'recieved',
                },
                {
                    text: 'negotiating',
                    value: 'negotiating',
                },
                {
                    text: 'completed',
                    value: 'completed',
                },
                {
                    text: 'paymentverified',
                    value: 'paymentverified',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, { status }) => (
                <>
                    {status.map((s, i) => {
                        let color = '#d5cc00';
                        if (s === 'completed') {
                            color = '#44A16F';
                        } else if (s === 'paymentverified') {
                            color = '#44A16F';
                        } else if (s === 'negotiating') {
                            color = '#07A4FD';
                        }
                        return (
                            <span style={{color: color}} className="fw-bold font-lato">
                                {s}
                            </span>
                            // <Tag color={color} key={i}>
                            //     <span className='text-white'>{s}</span>
                            // </Tag>
                        );
                    })}
                </>
            ),
        },
    ];
    return <Table columns={columns} dataSource={tableData} />;
};

export default ReportsTable;