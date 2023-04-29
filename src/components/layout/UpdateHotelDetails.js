import { Button, Form, Input, InputNumber, message, Upload } from "antd";
import React, { useRef, useState } from "react";
import HotelPhotosCarousel from "./HotelPhotosCarousel";

const UpdateHotelDetails = ({ offerings, setOfferings, flag, request }) => {
  console.log(request);

  const image_urls = [
    {
      url: "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
    },
    {
      url: "https://cdn.vox-cdn.com/thumbor/yJuBQtYK2euiOWE3lj_dtloWkvs=/160x0:1239x607/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/46708944/manyminions.0.jpg",
    },
    {
      url: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/11/11/1447263891657/Minions-009.jpg?width=620&quality=85&auto=format&fit=max&s=8a643616a29f6832d52a06ceafab39d6",
    },
  ];

  const formRef = useRef();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [singleRates, setSingleRates] = useState(0);
  const [doubleRates, setDoubleRates] = useState(0);
  const [animalSupport, setAnimalSupport] = useState(0);

  const [showCarousel, setShowCarousel] = useState(true);

  // const [rates, setRates] = useState({
  //     single: 0,
  //     double: 0,
  //     animalSupport: 0,
  // })

  // console.log(request);

  const [payLink, setPayLink] = useState("");

  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    let uploadedFiles = [...event.target.files];
    // console.log(uploadedFiles);

    uploadedFiles = uploadedFiles.map((file) => {
      if (file) {
        const fileType = file.type;

        if (
          fileType === "image/png" ||
          fileType === "image/jpeg" ||
          fileType === "image/WebP" ||
          fileType === "image/jpg"
        ) {
          uploadedFiles.push(file);
        } else {
          message.error(`${file.name} is not a valid file formate`);
        }
        return file;
        // Component will show file.url as link
      }
    });

    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  // const handleChange = (info) => {
  //   let newFileList = [...info.fileList];

  //   // 2. Read from response and show file link
  //   newFileList = newFileList.map((file) => {
  //     if (file.response) {
  //       // Component will show file.url as link
  //       file.url = file.response.url;
  //     }
  //     return file;
  //   });
  //   setFiles(newFileList);
  //   console.log(files);
  // };

  // const props = {
  //   action: "",
  //   multiple: true,
  //   onChange: handleChange,
  // };

  // const [validationError, setValidationError] = useState({
  //   filesError: "",
  //   titleError: "",
  //   descriptionError: "",
  //   singleRateError: "",
  //   doubleRateError: "",
  //   animalSupportError: "",
  //   payLinkError: "",
  // });

  // const handleValidation = () => {
  //   if (files.length < 1) {
  //     setValidationError({ filesError: "Hotel images are required" });
  //   } else if (title == "") {
  //     setValidationError({ titleError: "Hotel title is required" });
  //   } else if (description == "") {
  //     setValidationError({ descriptionError: "Description is required" });
  //   } else if (
  //     request.roomRequirements.single &&
  //     request.roomRequirements.single > 0 &&
  //     singleRates == 0
  //   ) {
  //     setValidationError({ singleRateError: "Room rates are required" });
  //   } else if (
  //     request.roomRequirements.double &&
  //     request.roomRequirements.double > 0 &&
  //     doubleRates == 0
  //   ) {
  //     setValidationError({ doubleRateError: "Room rates are required" });
  //   } else if (
  //     request.roomRequirements.animalSupport &&
  //     request.roomRequirements.animalSupport > 0 &&
  //     animalSupport == 0
  //   ) {
  //     setValidationError({ animalSupportError: "Animal support is required" });
  //   } else if (payLink == "") {
  //     setValidationError({ payLinkError: "Payment link is required" });
  //   } else {
  //     console.log(
  //       "files: ",
  //       files,
  //       "title: ",
  //       title,
  //       "description: ",
  //       description,
  //       "singleRates: ",
  //       singleRates,
  //       "doubleRates: ",
  //       doubleRates,
  //       "animalSupport: ",
  //       animalSupport,
  //       "payLink: ",
  //       payLink,
  //       "request: ",
  //       request,
  //       "flag: ",
  //       flag
  //     );
  //     setOfferings([
  //       ...offerings,
  //       {
  //         // images: files,
  //         title: title,
  //         description: description,
  //         rates: {
    //           single: singleRates > 0 && singleRates,
    //           double: doubleRates > 0 && doubleRates,
  //           animalSupport: animalSupport > 0 && animalSupport,
  //         },
  //         paymentLink: payLink,
  //         flag: flag,
  //       },
  //     ]);
  //   }
  // };
  
  const handleSave = () => {
    formRef.current.submit();
    console.log(offerings);
  };
  
  const handleFinish = (values) => {
    // setOfferings([
    //   ...offerings,
    //   {
    //     // images: values.files,
    //     title: values.hotel_title,
    //     description: values.description,
    //     rates: {
    //       single: values.single_rooms_rate > 0 && values.single_rooms_rate,
    //       double: values.double_rooms_rate > 0 && values.double_rooms_rate,
    //       animalSupport: values.animal_rate > 0 && values.animal_rate,
    //     },
    //     paymentLink: values.payment_link,
    //     flag: flag,
    //   },
    // ]);
    let prvOffering = offerings.filter((offering) => offering.flag == flag);
    if (prvOffering) {
      let index = offerings.indexOf(prvOffering[0]);
      offerings[index] = {
        // images: values.files,
        title: values.hotel_title,
        description: values.description,
        rates: {
          single: values.single_rooms_rate > 0 && values.single_rooms_rate,
          double: values.double_rooms_rate > 0 && values.double_rooms_rate,
          animalSupport: values.animal_rate > 0 && values.animal_rate,
        },
        paymentLink: values.payment_link,
        flag: flag,
      };
      setOfferings([...offerings]);
    } else {
      setOfferings([
        ...offerings,
        {
          // images: values.files,
          title: values.hotel_title,
          description: values.description,
          rates: {
            single: values.single_rooms_rate > 0 && values.single_rooms_rate,
            double: values.double_rooms_rate > 0 && values.double_rooms_rate,
            animalSupport: values.animal_rate > 0 && values.animal_rate,
          },
          paymentLink: values.payment_link,
          flag: flag,
        },
      ]);
    }
  };


  return (
    <Form
      ref={formRef}
      className="mt-xl-0 mt-4 add-hotel-form col-xl-4 px-xxl-4 px-xl-3 col-12 d-flex flex-column align-items-center gap-3"
      onFinish={handleFinish}
      onFinishFailed={(errorInfo) => {
        console.log("Failed:", errorInfo);
      }}
      autoComplete="off"
      initialValues={{
        hotel_title:
          request?.offerings[flag - 1] && request?.offerings[flag - 1].title,
        description:
          request?.offerings[flag - 1] &&
          request?.offerings[flag - 1].description,
        single_rooms_rate:
          request?.offerings[flag - 1] &&
          request?.offerings[flag - 1].rates.single,
        double_rooms_rate:
          request?.offerings[flag - 1] &&
          request?.offerings[flag - 1].rates.double,
        animal_rate:
          request?.offerings[flag - 1] &&
          request?.offerings[flag - 1].rates.animalSupport,
        payment_link:
          request?.offerings[flag - 1] &&
          request?.offerings[flag - 1].paymentLink,
      }}
    >
      {/* {console.log(request.offerings[flag - 1])} */}
      <div className="upload-hotel-image d-flex flex-column w-100 gap-2">
        {showCarousel &&
        request?.offerings[flag - 1] &&
        request?.offerings[flag - 1].images ? (
          <>
            <HotelPhotosCarousel images={image_urls} />
            <button
              className="btn logoutBtn text-white"
              onClick={() => setShowCarousel(false)}
            >
              Update hotel images
            </button>
          </>
        ) : (
          <>
            <label className="font-lato fw-semibold">Upload hotel image.</label>
            <Form.Item
              name="files"
              rules={[
                {
                  required: true,
                  message: "Hotel images are required!",
                },
              ]}
            >
              <Button className="upload-btn d-flex justify-content-center py-5" onClick={handleClick}>
                <svg
                  width="48"
                  height="31"
                  viewBox="0 0 48 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_6_2634" fill="white">
                    <rect width="42.3387" height="28.5219" rx="0.986916" />
                  </mask>
                  <rect
                    width="42.3387"
                    height="28.5219"
                    rx="0.986916"
                    stroke="#494949"
                    strokeWidth="2"
                    mask="url(#path-1-inside-1_6_2634)"
                  />
                  <path
                    d="M9.94462 15.0946L0.19831 20.9757L0 21.0773V28.8001L42.24 28.6984V19.6038L33.4152 10.5601L18.2445 20.9757L9.94462 15.0946Z"
                    fill="#494949"
                  />
                  <circle
                    cx="9.57292"
                    cy="7.00705"
                    r="4.04635"
                    fill="#494949"
                  />
                  <circle
                    cx="42.24"
                    cy="24.96"
                    r="5.28"
                    fill="white"
                    stroke="#494949"
                    strokeWidth="0.96"
                  />
                  <path
                    d="M41.9439 27.876C41.9439 28.0395 42.0765 28.1721 42.24 28.1721C42.4035 28.1721 42.5361 28.0395 42.5361 27.876L41.9439 27.876ZM42.4494 22.8307C42.3337 22.7151 42.1463 22.7151 42.0306 22.8307L40.1464 24.7149C40.0308 24.8306 40.0308 25.018 40.1464 25.1337C40.2621 25.2493 40.4495 25.2493 40.5652 25.1337L42.24 23.4588L43.9149 25.1337C44.0305 25.2493 44.2179 25.2493 44.3336 25.1337C44.4492 25.018 44.4492 24.8306 44.3336 24.7149L42.4494 22.8307ZM42.5361 27.876L42.5361 23.0401L41.9439 23.0401L41.9439 27.876L42.5361 27.876Z"
                    fill="#494949"
                  />
                </svg>
                <input
                  type="file"
                  id="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  multiple={true}
                />
              </Button>
              {/* <Upload {...props} fileList={files}>
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
                    <circle
                      cx="9.573"
                      cy="7.007"
                      r="4.046"
                      fill="#494949"
                    ></circle>
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
              </Upload> */}
            </Form.Item>
          </>
        )}
      </div>
      <div className="d-flex flex-column gap-2 w-100">
        <label className="font-lato fw-semibold">Add hotel title.</label>
        <Form.Item
          name="hotel_title"
          rules={[
            {
              required: true,
              message: "Please add a hotel title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="d-flex flex-column gap-2 w-100">
        <label className="font-lato fw-semibold">Add hotel description.</label>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please add a hotel description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      {request.roomRequirements.single &&
      request.roomRequirements.single > 0 ? (
        <div className="d-flex flex-column gap-2 w-100">
          <label className="font-lato fw-semibold">
            Add single room rates.
          </label>
          <Form.Item
            name="single_rooms_rate"
            rules={[
              {
                required: true,
                message: "Please add single room rates!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </div>
      ) : null}
      {request.roomRequirements.double &&
      request.roomRequirements.double > 0 ? (
        <div className="d-flex flex-column gap-2 w-100">
          <label className="font-lato fw-semibold">
            Add double room rates.
          </label>
          <Form.Item
            name="double_rooms_rate"
            rules={[
              {
                required: true,
                message: "Please add single room rates!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </div>
      ) : null}
      {request.roomRequirements.animalSupport &&
      request.roomRequirements.animalSupport > 0 ? (
        <div className="d-flex flex-column gap-2 w-100">
          <label className="font-lato fw-semibold">Add animal support.</label>
          <Form.Item
            name="animal_rate"
            rules={[
              {
                required: true,
                message: "Please add single room rates!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </div>
      ) : null}
      <div className="d-flex flex-column gap-2 w-100">
        <label className="font-lato fw-semibold">Add Payment Link.</label>
        <Form.Item
          name="payment_link"
          rules={[
            {
              required: true,
              message: "Please add payment link!",
            },
            {
              type: "url",
              message: "Please enter a valid url.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <span className="d-block span-note">
          <span className="text-danger">*</span>payment link must include
          https://
        </span>
      </div>
      <div className="row mt-2 w-100">
        <Button className="saveBtn" onClick={handleSave}>
          {offerings.find((offering) => offering.flag == flag)
            ? "Update"
            : "Save"}
        </Button>
      </div>
    </Form>

    // Old Form

    // <div className="col-xl-4 px-xxl-4 px-xl-3 col-12 update-hotel-details d-flex flex-column gap-3">
    //   <div className="upload-hotel-image d-flex flex-column w-100 gap-2">
    //     <label className="font-lato fw-semibold">Upload hotel image.</label>
    //     <Upload {...props} fileList={files}>
    //       <Button>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="48"
    //           height="31"
    //           fill="none"
    //           viewBox="0 0 48 31"
    //         >
    //           <mask id="path-1-inside-1_6_2634" fill="#fff">
    //             <rect width="42.339" height="28.522" rx="0.987"></rect>
    //           </mask>
    //           <rect
    //             width="42.339"
    //             height="28.522"
    //             stroke="#494949"
    //             strokeWidth="2"
    //             mask="url(#path-1-inside-1_6_2634)"
    //             rx="0.987"
    //           ></rect>
    //           <path
    //             fill="#494949"
    //             d="M9.945 15.095l-9.747 5.88-.198.102V28.8l42.24-.102v-9.094l-8.825-9.044-15.17 10.416-8.3-5.881z"
    //           ></path>
    //           <circle cx="9.573" cy="7.007" r="4.046" fill="#494949"></circle>
    //           <circle
    //             cx="42.24"
    //             cy="24.96"
    //             r="5.28"
    //             fill="#fff"
    //             stroke="#494949"
    //             strokeWidth="0.96"
    //           ></circle>
    //           <path
    //             fill="#494949"
    //             d="M41.944 27.876a.296.296 0 00.592 0h-.592zm.505-5.045a.296.296 0 00-.418 0l-1.885 1.884a.296.296 0 00.42.419l1.674-1.675 1.675 1.675a.296.296 0 00.419-.42l-1.885-1.883zm.087 5.045V23.04h-.592v4.836h.592z"
    //           ></path>
    //         </svg>
    //       </Button>
    //     </Upload>
    //     {validationError.filesError && (
    //       <span className="text-danger fw-semibold">
    //         {validationError.filesError}
    //       </span>
    //     )}
    //   </div>
    //   <div className="d-flex flex-column gap-2 w-100">
    //     <label className="font-lato fw-semibold">Add hotel title.</label>
    //     <input type="text" onChange={(e) => setTitle(e.target.value)} />
    //     {validationError.titleError && (
    //       <span className="text-danger fw-semibold">
    //         {validationError.titleError}
    //       </span>
    //     )}
    //   </div>
    //   <div className="d-flex flex-column gap-2 w-100">
    //     <label className="font-lato fw-semibold">Add text description.</label>
    //     <input type="text" onChange={(e) => setDescription(e.target.value)} />
    //     {validationError.descriptionError && (
    //       <span className="text-danger fw-semibold">
    //         {validationError.descriptionError}
    //       </span>
    //     )}
    //   </div>
    //   {request.roomRequirements.single &&
    //   request.roomRequirements.single > 0 ? (
    //     <div className="d-flex flex-column gap-2 w-100">
    //       <label className="font-lato fw-semibold">
    //         Add single room rates.
    //       </label>
    //       <input
    //         type="number"
    //         min={0}
    //         onChange={(e) => setSingleRates(e.target.value)}
    //       />
    //       {validationError.singleRateError && (
    //         <span className="text-danger fw-semibold">
    //           {validationError.singleRateError}
    //         </span>
    //       )}
    //     </div>
    //   ) : (
    //     <></>
    //   )}
    //   {request.roomRequirements.double &&
    //   request.roomRequirements.double > 0 ? (
    //     <div className="d-flex flex-column gap-2 w-100">
    //       <label className="font-lato fw-semibold">
    //         Add double room rates.
    //       </label>
    //       <input
    //         type="number"
    //         min={0}
    //         onChange={(e) => setDoubleRates(e.target.value)}
    //       />
    //       {validationError.doubleRateError && (
    //         <span className="text-danger fw-semibold">
    //           {validationError.doubleRateError}
    //         </span>
    //       )}
    //     </div>
    //   ) : (
    //     <></>
    //   )}
    //   {request.roomRequirements.animalSupport &&
    //   request.roomRequirements.animalSupport > 0 ? (
    //     <div className="d-flex flex-column gap-2 w-100">
    //       <label className="font-lato fw-semibold">Add animal support.</label>
    //       <input
    //         type="number"
    //         min={0}
    //         onChange={(e) => setAnimalSupport(e.target.value)}
    //       />
    //       {validationError.animalSupportError && (
    //         <span className="text-danger fw-semibold">
    //           {validationError.animalSupportError}
    //         </span>
    //       )}
    //     </div>
    //   ) : (
    //     <></>
    //   )}
    //   <div className="d-flex flex-column gap-2 w-100">
    //     <label className="font-lato fw-semibold">Add Payment Link.</label>
    //     <input type="url" onChange={(e) => setPayLink(e.target.value)} />
    //     {validationError.payLinkError && (
    //       <span className="text-danger fw-semibold">
    //         {validationError.payLinkError}
    //       </span>
    //     )}
    //   </div>
    //   <div className="saveBtn d-flex flex-column gap-2 w-100 mt-2">
    //     <Button onClick={() => handleValidation()}>
    //       {offerings.find((offering => offering.flag == flag)) ? "Update" : "Save"}
    //     </Button>
    //   </div>
    // </div>
  );
};

export default UpdateHotelDetails;
