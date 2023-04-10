import { Button, DatePicker, message, Upload } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import JobDetailsGrid from '../../components/layout/JobDetailsGrid'
import RoomPicker from '../../components/layout/RoomPicker'

const { RangePicker } = DatePicker;

const props = {
    beforeUpload: (file) => {
        const fileType = file.type;
        if (fileType === 'application/pdf') {
            return file.type || Upload.LIST_IGNORE;
        } else if (fileType === 'application/xls') {
            return file.type || Upload.LIST_IGNORE;
        } else if (fileType === 'application/docx') {
            return file.type || Upload.LIST_IGNORE;
        } else if (fileType === 'application/pdf') {
            return file.type || Upload.LIST_IGNORE;
        } else if (fileType === 'image/jpg') {
            return file.type || Upload.LIST_IGNORE;
        } else {
            message.error(`${file.name} is not a valid file formate`);
            return Upload.LIST_IGNORE;
        }
    },
    onChange: (info) => {
        console.log(info.fileList);
    },
};

const UpdateStay = () => {
    return (
        <div className='min-vh-100 w-100 p-5'>
            <div className='d-flex flex-column gap-5'>
                <h2 className='font-poppins mt-4 heading-green'>
                    Edit your stay
                </h2>
                <div>
                    <div className='d-flex flex-column gap-5 rounded-container bg-white p-5 position-relative'>
                        <JobDetailsGrid />
                        <span className='position-absolute end-0 top-0 me-2 mt-2'>
                            <span className="fs-5 font-poppins fst-italic green-span p-4 text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="54"
                                    height="59"
                                    fill="none"
                                    viewBox="0 0 54 59"
                                >
                                    <path
                                        stroke="#85C371"
                                        strokeLinecap="round"
                                        strokeWidth="5"
                                        d="M22.019 6.563c-2.264 2.82-7.426 15.41-9.962 43.202M38.32 3c-3.774 5.048-11.593 22.714-12.68 53M3 36.849c5.132-6.532 21.917-19.24 48-17.815"
                                    ></path>
                                </svg>
                                Holiday Inn
                            </span>
                        </span>
                        <div className='row justify-content-between mt-5'>
                            <div className='col-5'>
                                <span className='font-poppins ms-4 fw-semibold'>Add or remove current rooms</span>
                                <RoomPicker singleRooms={10} doubleRooms={10} animals={2} />
                            </div>
                            <div className='col-3 d-flex flex-column justify-content-start position-relative'>
                                <span className='font-poppins fw-semibold'>Edit dates</span>
                                <span className='updateDate shadow p-3 mt-2 fw-bold'>Apr 08 - Apr 14
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={18} className='ms-2'>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    <RangePicker className='position-absolute start-0' />
                                </span>
                            </div>
                            <div className='col-3 d-flex flex-column gap-2 justify-content-start position-relative'>
                                <span className='font-poppins fw-semibold overflow-hidden'>Edit roster</span>
                                <Upload {...props}>
                                    <Button className='py-4 d-flex align-items-center border-0 shadow font-poppins' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={18} className='me-2'>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                    </svg>
                                    }>Upload updated roster</Button>
                                </Upload>
                                <span style={{color:'#959595'}} className='ms-2'>xls , pdf , word , jpg</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Link>
                                <span className='confirm-changes-btn font-poppins rounded-3 px-5 py-3 text-white'>Confirm changes</span>
                            </Link>
                        </div>
                    </div>
                    <span className='font-poppins mt-2 ms-3 d-block update-note-span'>After consuming these changes a representative will call you shortly to attend all reservation details.</span>
                </div>
            </div>
        </div>
    )
}

export default UpdateStay
