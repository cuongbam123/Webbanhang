import React from "react";
import "./FeaturedCategories.css";
import smartphone from "../Assets/smartphone.png";
import laptop from "../Assets/laptop.png";
import accessories from "../Assets/accessories.png";
import audio from "../Assets/audio.png";
import { useNavigate } from "react-router-dom";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      image: smartphone,
      description: "Latest smartphones from top brands",
      route: "/dien-thoai",
    },
    {
      id: 2,
      name: "Laptops",
      image: laptop,
      description: "Powerful laptops for work and gaming",
      route: "/laptop",
    },
    {
      id: 3,
      name: "Accessories",
      image: accessories,
      description: "Essential tech accessories",
      route: "/phu-kien",
    },
    {
      id: 4,
      name: "Audio",
      image: audio,
      description: "Premium audio devices",
      route: "/phu-kien?type=Tai%20nghe",
    },
  ];

  return (
    <div className="featured-categories" id="featured-categories">
      <h1>Featured Categories</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button className="explore-btn" onClick={() => navigate(category.route)}>Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
