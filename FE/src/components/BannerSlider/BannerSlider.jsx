import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerSlider.css";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Placeholder images for banner
  const banners = [
    {
      id: 1,
      image: "https://via.placeholder.com/1200x400/FF5733/FFFFFF?text=Banner+1",
      link: "/promo/1",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/1200x400/33FF57/FFFFFF?text=Banner+2",
      link: "/promo/2",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/1200x400/3357FF/FFFFFF?text=Banner+3",
      link: "/promo/3",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/1200x400/F333FF/FFFFFF?text=Banner+4",
      link: "/promo/4",
    },
  ];

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <a href={banner.link}>
              <img
                src={banner.image}
                alt={`Banner ${banner.id}`}
                className="w-100 rounded"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
