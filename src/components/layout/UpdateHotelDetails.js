import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import HotelPhotosCarousel from "./HotelPhotosCarousel";
import { useDispatch } from "react-redux";
import { updateOffer } from "../../actions/requestActions";

const UpdateHotelDetails = ({ offerings, setOfferings, flag, request }) => {
  const formRef = useRef();

  const [files, setFiles] = useState([]);
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
        const cloud_name = "donwyp5jo";

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
      let prvOffering = offerings.filter((offering) => offering.flag === flag);
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
            values.payment_link.indexOf("https://") === 0
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
              values.payment_link.indexOf("https://") === 0
                ? values.payment_link
                : "https://" + values.payment_link,
            flag: flag,
          },
        ]);
        setLoading(false);
      }
    } else {
      let offer_id = request?.offerings?.find(
        (offering) => offering.flag === flag
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
          values.payment_link.indexOf("https://") === 0
            ? values.payment_link
            : "https://" + values.payment_link,
        flag: flag,
      };
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
            <label className="font-cairo fw-semibold">Upload hotel image.</label>
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
        <label className="font-cairo fw-semibold">Add hotel title.</label>
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
        <label className="font-cairo fw-semibold">Add hotel description.</label>
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
          <label className="font-cairo fw-semibold">
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
          <label className="font-cairo fw-semibold">
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
          <label className="font-cairo fw-semibold">Add animal support.</label>
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
        <label className="font-cairo fw-semibold">Add Payment Link.</label>
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
        {request?.offerings?.find((offering) => offering.flag === flag) ? (
          <Button
            loading={loading}
            className="saveBtn"
            onClick={() => handleSaveDb()}
          >
            Update
          </Button>
        ) : (
          <Button loading={loading} className="saveBtn" onClick={handleSave}>
            {offerings.find((offering) => offering.flag === flag)
              ? "Update"
              : "Save"}
          </Button>
        )}
      </div>
    </Form>
  );
};

export default UpdateHotelDetails;
