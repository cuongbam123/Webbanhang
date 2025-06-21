import React from "react";
import "./BrandShowcase.css";
import apple from "../Assets/apple.png";
import samsung from "../Assets/samsung.png";
import sony from "../Assets/sony.png";
import dell from "../Assets/dell.png";
import hp from "../Assets/hp.png";
import lg from "../Assets/lg.png";

const BrandShowcase = () => {
  const brands = [
    {
      id: 1,
      name: "Apple",
      logo: apple,
      description: "Innovation at its finest",
    },
    {
      id: 2,
      name: "Samsung",
      logo: samsung,
      description: "Leading the future",
    },
    {
      id: 3,
      name: "Sony",
      logo: sony,
      description: "Make. Believe.",
    },
    {
      id: 4,
      name: "Dell",
      logo: dell,
      description: "Innovation that matters",
    },
    {
      id: 5,
      name: "HP",
      logo: hp,
      description: "Keep reinventing",
    },
    {
      id: 6,
      name: "LG",
      logo: lg,
      description: "Life's Good",
    },
  ];

  return (
    <div className="brand-showcase">
      <h1>Featured Brands</h1>
      <div className="brands-container">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-card">
            <div className="brand-logo">
              <img src={brand.logo} alt={brand.name} />
            </div>
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
            <button className="view-products-btn">View Products</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandShowcase;
