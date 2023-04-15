import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { bookOffer } from "../../actions/requestActions";
import { Button } from "antd";

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
  const handleBook = () => {
    dispatch(bookOffer(request._id, id))
  };

  console.log(props);

  return (
    <div className="detail-card rounded-3 d-flex flex-column align-items-center w-100">
      <span className="svg-span p-4 text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
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
        {svgTxt}
      </span>
      <div className="cards-footer d-flex flex-column align-items-center gap-2 rounded-3 p-4 w-100">
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </span>
        <span className="text-sm">{description}</span>
        {location.pathname !== "/dashboard/user/ongoing-stays" ? (
          <span className="d-flex justify-content-center gap-2 align-items-center w-100">
            <span className={`d-flex ${!request.hasOwnProperty('bookedOffering') && 'flex-column'} justify-content-center gap-2 text-xs`}>
              <span className="price-span">Singles: ${singlePrice}</span>
              <span className="price-span">Doubles: ${doublePrice}</span>
              <span className="price-span">Animal Support: {animalSupport}</span>
            </span>
        {/* handleBook is temp solution to book request as payment flow is pending*/}
            {!request.hasOwnProperty('bookedOffering') && (
                <Link to="/dashboard/user/payment" onClick={() => handleBook()}>
                  <Button className='book-now-btn text-white'>
                    Book now
                  </Button>
              </Link>
            )}
          </span>
        ) : (
          <span className="d-flex justify-content-center align-items-center w-100">
            <span className="d-flex flex-column flex-wrap flex-wrap justify-content-center gap-4 text-xs">
              <span className="price-span">Singles: ${singlePrice}</span>
              <span className="price-span">Doubles: ${doublePrice}</span>
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
