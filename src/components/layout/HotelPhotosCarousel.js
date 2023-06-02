import { Carousel } from "antd";
import React from "react";

const contentStyle = {
  textAlign: "center",
  background: "#364d79",
};

const HotelPhotosCarousel = ({ images }) => {
  return (
    <>
      {images.length > 1 ? (
        <Carousel autoplay>
          {images.map((imgsrc, i) => {
            return <img src={imgsrc} width="100%" key={i} />;
          })}
        </Carousel>
      ) : (
        <img src={images[0]} className="singal-image" width="100%" />
      )}
    </>
  );
};

export default HotelPhotosCarousel;
