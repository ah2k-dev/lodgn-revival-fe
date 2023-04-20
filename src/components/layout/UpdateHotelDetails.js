import { Button, Upload } from "antd";
import React, { useState } from "react";

const UpdateHotelDetails = ({ offerings, setOfferings, flag, request }) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [singleRates, setSingleRates] = useState(0);
  const [doubleRates, setDoubleRates] = useState(0);
  const [animalSupport, setAnimalSupport] = useState(0);
  // const [rates, setRates] = useState({
  //     single: 0,
  //     double: 0,
  //     animalSupport: 0,
  // })

  const [payLink, setPayLink] = useState("");

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFiles(newFileList);
    console.log(files);
  };

  const props = {
    action: "",
    multiple: true,
    onChange: handleChange,
  };

  const [validationError, setValidationError] = useState({
    filesError: "",
    titleError: "",
    descriptionError: "",
    singleRateError: "",
    doubleRateError: "",
    animalSupportError: "",
    payLinkError: "",
  });

  const handleValidation = () => {
    if (files.length < 1) {
      setValidationError({ filesError: "Hotel images are required" });
    } else if (title == "") {
      setValidationError({ titleError: "Hotel title is required" });
    } else if (description == "") {
      setValidationError({ descriptionError: "Description is required" });
    } else if (
      request.roomRequirements.single &&
      request.roomRequirements.single > 0 &&
      singleRates == 0
    ) {
      setValidationError({ singleRateError: "Room rates are required" });
    } else if (
      request.roomRequirements.double &&
      request.roomRequirements.double > 0 &&
      doubleRates == 0
    ) {
      setValidationError({ doubleRateError: "Room rates are required" });
    } else if (
      request.roomRequirements.animalSupport &&
      request.roomRequirements.animalSupport > 0 &&
      animalSupport == 0
    ) {
      setValidationError({ animalSupportError: "Animal support is required" });
    } else if (payLink == "") {
      setValidationError({ payLinkError: "Payment link is required" });
    } else {
      console.log(
        "files: ",
        files,
        "title: ",
        title,
        "description: ",
        description,
        "singleRates: ",
        singleRates,
        "doubleRates: ",
        doubleRates,
        "animalSupport: ",
        animalSupport,
        "payLink: ",
        payLink,
        "request: ",
        request,
        "flag: ",
        flag
      );
      setOfferings([
        ...offerings,
        {
          // images: files,
          title: title,
          description: description,
          rates: {
            single: singleRates > 0 && singleRates,
            double: doubleRates > 0 && doubleRates,
            animalSupport: animalSupport > 0 && animalSupport,
          },
          paymentLink: payLink,
          flag: flag,
        },
      ]);
    }
  };

  return (
    <div className="col-xl-4 px-xxl-4 px-xl-3 col-12 update-hotel-details d-flex flex-column gap-3">
      <div className="upload-hotel-image d-flex flex-column w-100 gap-2">
        <label className="font-lato fw-semibold">Upload hotel image.</label>
        <Upload {...props} fileList={files}>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="31"
              fill="none"
              viewBox="0 0 48 31"
            >
              <mask id="path-1-inside-1_6_2634" fill="#fff">
                <rect width="42.339" height="28.522" rx="0.987"></rect>
              </mask>
              <rect
                width="42.339"
                height="28.522"
                stroke="#494949"
                strokeWidth="2"
                mask="url(#path-1-inside-1_6_2634)"
                rx="0.987"
              ></rect>
              <path
                fill="#494949"
                d="M9.945 15.095l-9.747 5.88-.198.102V28.8l42.24-.102v-9.094l-8.825-9.044-15.17 10.416-8.3-5.881z"
              ></path>
              <circle cx="9.573" cy="7.007" r="4.046" fill="#494949"></circle>
              <circle
                cx="42.24"
                cy="24.96"
                r="5.28"
                fill="#fff"
                stroke="#494949"
                strokeWidth="0.96"
              ></circle>
              <path
                fill="#494949"
                d="M41.944 27.876a.296.296 0 00.592 0h-.592zm.505-5.045a.296.296 0 00-.418 0l-1.885 1.884a.296.296 0 00.42.419l1.674-1.675 1.675 1.675a.296.296 0 00.419-.42l-1.885-1.883zm.087 5.045V23.04h-.592v4.836h.592z"
              ></path>
            </svg>
          </Button>
        </Upload>
        {validationError.filesError && (
          <span className="text-danger fw-semibold">
            {validationError.filesError}
          </span>
        )}
      </div>
      <div className="d-flex flex-column gap-2 w-100">
        <label className="font-lato fw-semibold">Add hotel title.</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        {validationError.titleError && (
          <span className="text-danger fw-semibold">
            {validationError.titleError}
          </span>
        )}
      </div>
      <div className="d-flex flex-column gap-2 w-100">
        <label className="font-lato fw-semibold">Add text description.</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        {validationError.descriptionError && (
          <span className="text-danger fw-semibold">
            {validationError.descriptionError}
          </span>
        )}
      </div>
      {request.roomRequirements.single &&
      request.roomRequirements.single > 0 ? (
        <div className="d-flex flex-column gap-2 w-100">
          <label className="font-lato fw-semibold">
            Add single room rates.
          </label>
          <input
            type="number"
            min={0}
            onChange={(e) => setSingleRates(e.target.value)}
          />
          {validationError.singleRateError && (
            <span className="text-danger fw-semibold">
              {validationError.singleRateError}
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
      {request.roomRequirements.double &&
      request.roomRequirements.double > 0 ? (
        <div className="d-flex flex-column gap-2 w-100">
          <label className="font-lato fw-semibold">
            Add double room rates.
          </label>
          <input
            type="number"
            min={0}
            onChange={(e) => setDoubleRates(e.target.value)}
          />
          {validationError.doubleRateError && (
            <span className="text-danger fw-semibold">
              {validationError.doubleRateError}
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
      {request.roomRequirements.animalSupport &&
      request.roomRequirements.animalSupport > 0 ? (
        <div className="d-flex flex-column gap-2 w-100">
          <label className="font-lato fw-semibold">Add animal support.</label>
          <input
            type="number"
            min={0}
            onChange={(e) => setAnimalSupport(e.target.value)}
          />
          {validationError.animalSupportError && (
            <span className="text-danger fw-semibold">
              {validationError.animalSupportError}
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="d-flex flex-column gap-2 w-100">
        <label className="font-lato fw-semibold">Add Payment Link.</label>
        <input type="url" onChange={(e) => setPayLink(e.target.value)} />
        {validationError.payLinkError && (
          <span className="text-danger fw-semibold">
            {validationError.payLinkError}
          </span>
        )}
      </div>
      <div className="saveBtn d-flex flex-column gap-2 w-100 mt-2">
        <Button type="primary" onClick={() => handleValidation()}>
          {offerings.find((offering => offering.flag == flag)) ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateHotelDetails;
