import { Button, DatePicker, message, Upload } from "antd";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import RoomPicker from "../../components/layout/RoomPicker";
import moment from "moment";
import HotelPhotosCarousel from "../../components/layout/HotelPhotosCarousel";
import UrgentBookingModal from "../../components/UrgentBookingModal";
import { useDispatch } from "react-redux";
import { updateRequest } from "../../actions/requestActions";

const { RangePicker } = DatePicker;

const UpdateStay = () => {
  const location = useLocation();

  const request = location.state;

  const [showTodayModal, setShowTodayModal] = useState(false);

  const [dateRange, setDateRange] = useState([
    request.dateRange[0],
    request.dateRange[1],
  ]);

  const [singleRoom, setSingleRoom] = useState(
    request?.roomRequirements?.single || 0
  );
  const [doubleRoom, setDoubleRoom] = useState(
    request?.roomRequirements?.double || 0
  );
  const [animalSupport, setAnimalSupport] = useState(
    request?.roomRequirements?.animalSupport || 0
  );

  const [rosterFile, setRosterFile] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSingleRoom = (rooms) => {
    setSingleRoom(rooms);
  };

  const handleDoubleRoom = (rooms) => {
    setDoubleRoom(rooms);
  };

  const handleAnimal = (animals) => {
    setAnimalSupport(animals);
  };

  const handleCalendarChange = (values, dateString) => {
    if (dateString && dateString.length === 2) {
      const startDate = moment(new Date(dateString[0]));
      const endDate = moment(new Date(dateString[1]));
      const today = moment();
      setDateRange([startDate.toISOString(), endDate.toISOString()]);
      if (startDate.isSame(today, "day") || endDate.isSame(today, "day")) {
        setShowTodayModal(true);
      }
    }
  };

  const disabledDate = (current) => {
    const today = moment().startOf("day");
    return (
      current &&
      (current < today || current > today.clone().add(365, "days").endOf("day"))
    );
  };

  const handleUpload = (info) => {
    setRosterFile(info.file);
    console.log(rosterFile);
  };

  //   const props = {
  //     beforeUpload: (file) => {
  //       const fileType = file.type;
  //       if (fileType === "application/pdf") {
  //         return file.type || Upload.LIST_IGNORE;
  //       } else if (fileType === "application/xls") {
  //         return file.type || Upload.LIST_IGNORE;
  //       } else if (fileType === "application/docx") {
  //         return file.type || Upload.LIST_IGNORE;
  //       } else if (fileType === "application/pdf") {
  //         return file.type || Upload.LIST_IGNORE;
  //       } else if (fileType === "image/jpg") {
  //         return file.type || Upload.LIST_IGNORE;
  //       } else {
  //         message.error(`${file.name} is not a valid file formate`);
  //         return Upload.LIST_IGNORE;
  //       }
  //     },
  //     onChange: handleUpload,
  //   };

  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const fileType = fileUploaded.type;

    if (
      fileType === "application/pdf" ||
      fileType === "application/xls" ||
      fileType === "application/docx" ||
      fileType === "image/jpg"
    ) {
      setRosterFile(fileUploaded);
      console.log(rosterFile);
    } else {
      message.error(`${fileUploaded.name} is not a valid file formate`);
    }
  };

  const handleConfirmChanges = async () => {
    const roomRequirements = {
      single: singleRoom,
      double: doubleRoom,
      animalSupport,
    };
    const formData = new FormData();
    formData.append("dateRange", JSON.stringify(dateRange));
    formData.append("roomRequirements", JSON.stringify(roomRequirements));
    formData.append("roaster", rosterFile);
    formData.append("requestId", request._id);

    const res = await dispatch(updateRequest(formData));
    if (res) {
      // navigate to request page
      navigate("/dashboard/user/requested-updates");
    }
  };

  return (
    <div className="min-vh-100 w-100 px-md-5 px-2 py-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="font-poppins mt-4 heading-green">Edit your stay</h2>
        <div className="d-flex flex-column gap-4 rounded-container bg-white p-md-5 p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center rounded-container bg-white position-relative">
            <div className="col-xl-9 col-12 d-flex justify-content-md-between align-items-center flex-wrap items justify-content-center">
              <JobDetailsGrid
                jobLocation={request.location.string}
                start_date={moment(request.dateRange[0]).format("DD")}
                end_date={moment(request.dateRange[1]).format("DD")}
                start_date_month={moment(request.dateRange[0]).format("MMMM")}
                end_date_month={moment(request.dateRange[1]).format("MMMM")}
                total_rooms={
                  request.roomRequirements.single +
                  request.roomRequirements.double
                }
                single_rooms={request.roomRequirements.single}
                double_rooms={request.roomRequirements.double}
                animalSupport={request.roomRequirements.animalSupport}
              />
            </div>
            <span className="col-xl-3 col-md-6 col-sm-8 col-12 mt-xl-0 mt-5">
              <HotelPhotosCarousel
                images={[
                  {
                    url: "https://cdn.vox-cdn.com/thumbor/yJuBQtYK2euiOWE3lj_dtloWkvs=/160x0:1239x607/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/46708944/manyminions.0.jpg",
                  },
                ]}
              />
              {/* <span className="fs-5 font-poppins fst-italic green-span text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
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
                                </span> */}
            </span>
          </div>
          <div className="row justify-content-xl-between justify-content-center mt-5 gap-xl-0 gap-5">
            <div className="col-xl-5 col-lg-11 col-12">
              <span className="font-poppins ms-4 fw-semibold">
                Add or remove current rooms
              </span>
              <RoomPicker
                onSingleRoomChange={handleSingleRoom}
                onDoubleRoomChange={handleDoubleRoom}
                onAnimalChange={handleAnimal}
                singleRooms={singleRoom}
                doubleRooms={doubleRoom}
                animals={animalSupport}
              />
              {/* <RoomPicker singleRooms={singleRoom} doubleRooms={doubleRoom} animals={animalSupport} /> */}
            </div>
            <div className="col-xl-3 col-md-5 col-12 d-flex flex-column justify-content-start position-relative">
              <span className="font-poppins fw-semibold">Edit dates</span>
              <span className="updateDate shadow p-3 mt-2 fw-bold">
                {moment(dateRange[0]).format("MMMM")}{" "}
                {moment(dateRange[0]).format("DD")} -{" "}
                {moment(dateRange[1]).format("MMMM")}{" "}
                {moment(dateRange[1]).format("DD")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={18}
                  className="ms-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                <RangePicker
                  className="position-absolute start-0"
                  onChange={handleCalendarChange}
                  onCalendarChange={handleCalendarChange}
                  disabledDate={disabledDate}
                />
              </span>
              {showTodayModal && (
                <UrgentBookingModal setShowModal={setShowTodayModal} />
              )}
            </div>
            <div className="col-xl-3 col-md-5 col-12 d-flex items flex-column gap-2 justify-content-start position-relative">
              <span className="font-poppins fw-semibold overflow-hidden">
                Edit roster
              </span>
              <Button className="upload-btn" onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  width={20}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
                Upload a file
              </Button>
              <input
                type="file"
                id="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {/* <input
                type="file"
                onChange={() => {
                  setRosterFile(document.getElementById("file").files[0]);
                }}
              /> */}
              {/* <Upload action="" {...props} className="upload-roster-btn w-100">
                                <Button className='py-4 d-flex align-items-center border-0 shadow font-poppins' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={18} className='me-2'>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                </svg>
                                }>Upload updated roster</Button>
                            </Upload> */}
              <span style={{ color: "#959595" }} className="ms-2">
                xls , pdf , word , jpg
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              className="confirm-changes-btn font-poppins"
              onClick={handleConfirmChanges}
            >
              Confirm changes
            </Button>
          </div>
        </div>
        <span className="font-poppins mt-2 ms-3 d-block update-note-span">
          After consuming these changes a representative will call you shortly
          to attend all reservation details.
        </span>
      </div>
    </div>
  );
};

export default UpdateStay;
