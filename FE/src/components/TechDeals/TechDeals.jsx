import React from "react";
import "./TechDeals.css";
import deal1 from "../Assets/deal1.png";
import deal2 from "../Assets/deal2.png";
import deal3 from "../Assets/deal3.png";

const TechDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Flash Sale",
      description: "Up to 50% off on Premium Headphones",
      image: deal1,
      discount: "50% OFF",
      timeLeft: "Ends in 2 hours",
    },
    {
      id: 2,
      title: "Weekend Special",
      description: "Latest Smartphones with Free Accessories",
      image: deal2,
      discount: "80% OFF",
      timeLeft: "Ends in 3 days",
    },
    {
      id: 3,
      title: "Student Offer",
      description: "Special Discounts on Laptops for Students",
      image: deal3,
      discount: "20% OFF",
      timeLeft: "Valid till month end",
    },
  ];

  return (
    <div className="tech-deals">
      <h1>Special Tech Deals</h1>
      <div className="deals-container">
        {deals.map((deal) => (
          <div key={deal.id} className="deal-card">
            <div className="deal-image">
              <img src={deal.image} alt={deal.title} />
              <div className="discount-badge">{deal.discount}</div>
            </div>
            <div className="deal-content">
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
              <div className="time-left">{deal.timeLeft}</div>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechDeals;
