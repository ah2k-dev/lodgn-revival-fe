import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { bookOffer } from "../../actions/requestActions";
import { Button } from "antd";
import HotelPhotosCarousel from "./HotelPhotosCarousel";

const Card = (props) => {
  const location = useLocation();
  const {
    singlePrice,
    doublePrice,
    description,
    svgTxt,
    title,
    animalSupport,
    paymentLink,
    images,
    id,
    request,
  } = props;
  const dispatch = useDispatch();
  const handleBook = (url) => {
    window.open(url, "_blank");

    // dispatch(bookOffer(request._id, id))
  };

  console.log(props);

  return (
    <div className="detail-card d-flex flex-column align-items-center w-100">
      <div className="images-container w-100">
        <HotelPhotosCarousel images={images} />
      </div>
      <div className="cards-footer d-flex flex-column align-items-center gap-2 px-3 pt-3 pb-2 w-100">
        <span
          className="text-capitalize"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          {title}
        </span>
        <span className="text-sm hotel-description">{description}</span>
        {location.pathname !== "/dashboard/user/ongoing-stays" ? (
          <span className="room-rates-details d-flex justify-content-between gap-2 align-items-center w-100 mt-2">
            <span
              className={`d-flex ${
                !request.hasOwnProperty("bookedOffering") && "flex-column"
              } justify-content-center gap-2 text-xs`}
            >
              {singlePrice ? (
                <span className="price-span">Singles: ${singlePrice}</span>
              ) : null}
              {doublePrice ? (
                <span className="price-span">Doubles: ${doublePrice}</span>
              ) : null}
              {animalSupport ? (
                <span className="price-span">
                  Animal Support: ${animalSupport}
                </span>
              ) : null}
            </span>
            {/* handleBook is temp solution to book request as payment flow is pending*/}
            {/* {!request.hasOwnProperty('bookedOffering') && ( */}
            {/* <Link to={paymentLink} onClick={() => handleBook()}> */}
            <a href={paymentLink} target="_blank">
              <Button className="book-now-btn text-white">Book now</Button>
            </a>
            {/* </Link> */}
            {/* )} */}
          </span>
        ) : (
          <span className="d-flex justify-content-center align-items-center w-100">
            <span className="d-flex flex-column flex-wrap flex-wrap justify-content-center gap-2 text-xs">
              {singlePrice ? (
                <span className="price-span">Singles: ${singlePrice}</span>
              ) : null}
              {doublePrice ? (
                <span className="price-span">Doubles: ${doublePrice}</span>
              ) : null}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
