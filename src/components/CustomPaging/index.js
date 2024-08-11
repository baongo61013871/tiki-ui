import React from 'react';
import Slider from 'react-slick';
import images from '~/assets/images';
import './CustomPaging.scss';
function CustomPaging() {
    const settings = {
        customPaging: function (i) {
            return (
                <a href="/">
                    <img src={images.slider01} alt="hello" />
                </a>
            );
        },
        dots: false,

        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className="slider-container" style={{ display: 'flex' }}>
            <Slider {...settings}>
                <div>
                    <img src={images.slider01} alt="hello" />
                    <img src={images.slider02} alt="hello" />
                    <img src={images.slider03} alt="hello" />
                    <img src={images.slider04} alt="hello" />

                    <img src={images.slider05} alt="hello" />
                    <img src={images.slider06} alt="hello" />
                    <img src={images.slider07} alt="hello" />
                    <img src={images.slider08} alt="hello" />
                    <img src={images.slider09} alt="hello" />

                    <img src={images.slider10} alt="hello" />
                </div>
            </Slider>
        </div>
    );
}

export default CustomPaging;
