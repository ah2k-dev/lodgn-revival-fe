import { Button, Form, Input, InputNumber, message, Upload } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import HotelPhotosCarousel from "./HotelPhotosCarousel";
import { useDispatch } from "react-redux";
import { updateOffer } from "../../actions/requestActions";

const UpdateHotelDetails = ({ offerings, setOfferings, flag, request }) => {
  const formRef = useRef();

  const [files, setFiles] = useState([]);
  const [uploadedImagesUrls, setUploadedImagesUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateDb, setUpdateDb] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);
  const dispatch = useDispatch();

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    let uploadedFiles = [...event.target.files];

    if (uploadedFiles.length > 10) {
      message.error(`Maximum image selection limit is 10.`);
      return;
    }

    uploadedFiles = uploadedFiles.map((file) => {
      if (file) {
        const fileType = file.type;

        if (
          fileType === "image/png" ||
          fileType === "image/jpeg" ||
          fileType === "image/webp" ||
          fileType === "image/jpg"
        ) {
          uploadedFiles.push(file);
        } else {
          message.error(`${file.name} is not a valid file formate`);
        }
        return file;
      }
    });

    setFiles(uploadedFiles);

    if (uploadedFiles.length === 1) {
      message.success({
        content: `${uploadedFiles.length} Image Added`,
      });
    } else if (uploadedFiles.length <= 10) {
      message.success({
        content: `${uploadedFiles.length} Images Added`,
      });
    } else if (uploadedFiles.length > 10) {
      return;
    }
  };

  const handleSave = async () => {
    setLoading(true);

    await Promise.all(
      files.map(async (image) => {
        let uploadedImage = "";
        const formData = new FormData();

        const upload_preset = "lodgn_app";
        const cloud_name = "dusn1ns53";

        formData.append("file", image);
        formData.append("upload_preset", upload_preset);
        formData.append("cloud_name", cloud_name);

        await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then(async (response) => {
            const data = await response.data;
            uploadedImage = data.url;
          });
        return uploadedImage;
      })
    )
      .then((result) => {
        setUploadedImagesUrls(result);
        formRef.current.setFieldsValue({
          files: result,
        });
        formRef.current.submit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFinish = (values) => {
    if (!updateDb) {
      let prvOffering = offerings.filter((offering) => offering.flag == flag);
      if (prvOffering.length > 0) {
        let index = offerings.indexOf(prvOffering[0]);
        offerings[index] = {
          images: values.files,
          title: values.hotel_title,
          description: values.description,
          rates: {
            single: values.single_rooms_rate > 0 && values.single_rooms_rate,
            double: values.double_rooms_rate > 0 && values.double_rooms_rate,
            animalSupport: values.animal_rate > 0 && values.animal_rate,
          },
          paymentLink:
            values.payment_link.indexOf("https://") == 0
              ? values.payment_link
              : "https://" + values.payment_link,
          flag: flag,
        };
        setOfferings([...offerings]);
        setLoading(false);
      } else {
        setOfferings([
          ...offerings,
          {
            images: values.files,
            title: values.hotel_title,
            description: values.description,
            rates: {
              single: values.single_rooms_rate > 0 && values.single_rooms_rate,
              double: values.double_rooms_rate > 0 && values.double_rooms_rate,
              animalSupport: values.animal_rate > 0 && values.animal_rate,
            },
            paymentLink:
              values.payment_link.indexOf("https://") == 0
                ? values.payment_link
                : "https://" + values.payment_link,
            flag: flag,
          },
        ]);
        setLoading(false);
      }
    } else {
      // console.log("api call here");
      let offer_id = request?.offerings?.find(
        (offering) => offering.flag == flag
      )._id;
      let payload = {
        images: values.files
          ? values.files
          : request?.offerings[flag - 1].images,
        title: values.hotel_title,
        description: values.description,
        rates: {
          single: values.single_rooms_rate > 0 && values.single_rooms_rate,
          double: values.double_rooms_rate > 0 && values.double_rooms_rate,
          animalSupport: values.animal_rate > 0 && values.animal_rate,
        },
        paymentLink:
          values.payment_link.indexOf("https://") == 0
            ? values.payment_link
            : "https://" + values.payment_link,
        flag: flag,
      };
      // console.log(offer_id, payload);
      dispatch(updateOffer(offer_id, payload));
      setLoading(false);
    }
  };

  const handleSaveDb = () => {
    setUpdateDb(true);

    if (files.length > 0) {
      handleSave();
    } else {
      formRef.current.submit();
    }
  };

  return (
    <Form
      ref={formRef}
      className="mt-xl-0 mt-4 add-hotel-form col-xl-4 px-xxl-4 px-xl-3 col-12 d-flex flex-column align-items-center gap-3"
      onFinish={handleFinish}
      onFinishFailed={(errorInfo) => {
        setLoading(false);
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
        files:
          request?.offerings[flag - 1] && request?.offerings[flag - 1].images,
      }}
    >
      <div className="upload-hotel-image d-flex flex-column w-100 gap-2">
        {showCarousel &&
        request?.offerings[flag - 1] &&
        request?.offerings[flag - 1].images ? (
          <>
            <HotelPhotosCarousel images={request?.offerings[flag - 1].images} />
            <button
              className="btn logoutBtn text-white mt-2"
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
              <Button
                className="upload-btn w-100 d-flex justify-content-center py-5"
                onClick={handleClick}
              >
                <i className="far fa-image fs-1"></i>
                {/* <svg
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
                </svg> */}
                <input
                  type="file"
                  id="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  multiple={true}
                />
              </Button>
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
      </div>
      <div className="row mt-2 w-100">
        {request?.offerings?.find((offering) => offering.flag == flag) ? (
          <Button
            loading={loading}
            className="saveBtn"
            onClick={() => handleSaveDb()}
          >
            Update
          </Button>
        ) : (
          <Button loading={loading} className="saveBtn" onClick={handleSave}>
            {offerings.find((offering) => offering.flag == flag)
              ? "Update"
              : "Save"}
          </Button>
        )}
      </div>
    </Form>
  );
};

export default UpdateHotelDetails;
