import React from "react";
import "./FeaturedCategories.css";
import smartphone from "../Assets/smartphone.png";
import laptop from "../Assets/laptop.png";
import accessories from "../Assets/accessories.png";
import audio from "../Assets/audio.png";

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      image: smartphone,
      description: "Latest smartphones from top brands",
    },
    {
      id: 2,
      name: "Laptops",
      image: laptop,
      description: "Powerful laptops for work and gaming",
    },
    {
      id: 3,
      name: "Accessories",
      image: accessories,
      description: "Essential tech accessories",
    },
    {
      id: 4,
      name: "Audio",
      image: audio,
      description: "Premium audio devices",
    },
  ];

  return (
    <div className="featured-categories">
      <h1>Featured Categories</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button className="explore-btn">Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
