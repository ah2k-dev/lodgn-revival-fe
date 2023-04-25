import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReportsTable from '../../components/layout/ReportsTable'
import { LoadingOutlined } from "@ant-design/icons";
import { getPreviousStays } from '../../actions/requestActions';

const AdminReports = () => {

    const dispatch = useDispatch();
    const { error, loading } = useSelector(
        (state) => state.request
    );

    const fetch = () => {
        dispatch(getPreviousStays());
    };

    useEffect(() => {
        fetch();
    }, []);


    const data = [
        {
            key: '1',
            request: 'Karachi, Pakistan',
            start_date: '03 April',
            end_date: '27 April',
            total_paid: 50.45,
            paid_per_single_room: 5.45,
            paid_per_double_room: 10.00,
            paid_for_animals: 4.00,
            // room_details: '6 singles, 3 doubles, 3 animal support',
            status: ['recieved'],
        },
        {
            key: '2',
            request: 'Balochistan, Pakistan',
            start_date: '07 May',
            end_date: '30 May',
            total_paid: 35.33,
            paid_per_single_room: 6.50,
            // room_details: '4 singles',
            status: ['negotiating'],
        },
        {
            key: '3',
            request: 'North Nazimabad, Karachi, Pakistan',
            start_date: '07 May',
            end_date: '21 May',
            total_paid: 15.95,
            paid_per_double_room: 11.67,
            // room_details: '3 doubles',
            status: ['completed'],
        },
        {
            key: '4',
            request: 'Johar Town, Lahore, Pakistan',
            start_date: '07 May',
            end_date: '21 May',
            total_paid: 20.19,
            paid_per_double_room: 12.12,
            // room_details: '3 doubles',
            status: ['paymentverified'],
        },
    ];

    return (
        <div className="min-vh-100 w-100 px-lg-5 px-md-3 px-4 py-5">
            <div className="reports d-flex flex-column gap-4 mt-md-0 mt-5">
                {loading ? (
                    <div className="loader w-100 d-flex justify-content-center align-items-center">
                        <LoadingOutlined style={{ fontSize: 65 }} spin />
                    </div>
                ) : (
                    <>
                        {
                            data.length > 0 ? 
                            <ReportsTable tableData={data} />
                            : <h2 className="font-poppins mt-4 heading-green">
                                Reports not found
                            </h2>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminReports
