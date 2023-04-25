import { Carousel } from 'antd'
import React from 'react'

const contentStyle = {
    // height: '160px',
    // color: '#fff',
    // lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const HotelPhotosCarousel = ({ images }) => {
    return (
        <>
            {
                images.length > 1 ? <Carousel autoplay>
                    {images.map((imgsrc, i) => {
                        return <img src={imgsrc.url} width="100%" key={i} />
                    })}
                </Carousel> : <img src={images[0].url} width="100%" />
            }
        </>
    )
}

export default HotelPhotosCarousel
