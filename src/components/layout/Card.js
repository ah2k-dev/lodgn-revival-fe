import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import HotelPhotosCarousel from "./HotelPhotosCarousel";

const Card = (props) => {
  const location = useLocation();
  const {
    singlePrice,
    doublePrice,
    description,
    title,
    animalSupport,
    paymentLink,
    images,
  } = props;

  return (
    <div className="detail-card d-flex flex-column align-items-center w-100">
      <div className="images-container w-100">
        <HotelPhotosCarousel images={images} />
      </div>
      <div className="cards-footer d-flex flex-column align-items-center gap-2 px-3 pt-3 pb-2 w-100">
        <span
          className="text-capitalize hotel-name"
        >
          {title}
        </span>
        <span className="text-sm hotel-description">{description}</span>
        {location.pathname !== "/dashboard/user/ongoing-stays" ? (
          <span className="room-rates-details d-flex justify-content-between gap-2 align-items-center w-100 mt-2">
            <span
              className={`d-flex flex-column justify-content-center gap-2 text-xs`}
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
            <a className="cursor-pointer" href={paymentLink} target="_blank" rel="noreferrer">
              <Button className="book-now-btn text-white">Book now</Button>
            </a>
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
