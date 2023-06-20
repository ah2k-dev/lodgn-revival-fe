import { Carousel } from "antd";
import React from "react";

const HotelPhotosCarousel = ({ images }) => {
  return (
    <>
      {images.length > 1 ? (
        <Carousel autoplay>
          {images.map((imgsrc, i) => {
            return (
              <img
                src={imgsrc}
                width="100%"
                key={i}
                alt={"hotel image " + i + 1}
              />
            );
          })}
        </Carousel>
      ) : (
        <img
          src={images[0]}
          className="singal-image"
          width="100%"
          alt="hotel"
        />
      )}
    </>
  );
};

export default HotelPhotosCarousel;
