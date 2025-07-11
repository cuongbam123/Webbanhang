import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>LATEST TECH INNOVATIONS</h2>
        <div>
          <div className="hero-tech-icon">
            <p>Discover</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Smart Devices</p>
          <p>For Your Life</p>
        </div>
        <div className="hero-latest-btn" onClick={() => {
          const el = document.getElementById('featured-categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}>
          <div>Explore Products</div>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
