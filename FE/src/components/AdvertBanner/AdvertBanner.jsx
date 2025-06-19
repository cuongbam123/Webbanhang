import React from "react";
import "./AdvertBanner.css";

const AdvertBanner = ({ imageUrl, link }) => {
  return (
    <div className="advert-banner">
      <a href={link}>
        <img src={imageUrl} alt="Quảng cáo" className="w-100" />
      </a>
    </div>
  );
};

export default AdvertBanner;
