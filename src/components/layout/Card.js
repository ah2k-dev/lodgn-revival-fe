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
  const handleBook = () => {
    // dispatch(bookOffer(request._id, id))
  };

  console.log(props);

  const imageUrls = [
    {
      url: "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png"
    },
    {
      url: "https://cdn.vox-cdn.com/thumbor/yJuBQtYK2euiOWE3lj_dtloWkvs=/160x0:1239x607/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/46708944/manyminions.0.jpg"
    },
    {
      url: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/11/11/1447263891657/Minions-009.jpg?width=620&quality=85&auto=format&fit=max&s=8a643616a29f6832d52a06ceafab39d6"
    },
  ] 

  return (
    <div className="detail-card rounded-3 d-flex flex-column align-items-center w-100">
      <div className="images-container w-100">
        <HotelPhotosCarousel images={imageUrls} />
      </div>
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
              {singlePrice ? <span className="price-span">Singles: ${singlePrice}</span> : null}
              {doublePrice ? <span className="price-span">Doubles: ${doublePrice}</span> : null}
              {animalSupport ? <span className="price-span">Animal Support: ${animalSupport}</span> : null}
            </span>
            {/* handleBook is temp solution to book request as payment flow is pending*/}
            {/* {!request.hasOwnProperty('bookedOffering') && ( */}
              <Link to="/dashboard/user/payment" onClick={() => handleBook()}>
                <Button className='book-now-btn text-white'>
                  Book now
                </Button>
              </Link>
            {/* )} */}
          </span>
        ) : (
          <span className="d-flex justify-content-center align-items-center w-100">
            <span className="d-flex flex-column flex-wrap flex-wrap justify-content-center gap-2 text-xs">
              {singlePrice ? <span className="price-span">Singles: ${singlePrice}</span> : null}
              {doublePrice ? <span className="price-span">Doubles: ${doublePrice}</span> : null}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
