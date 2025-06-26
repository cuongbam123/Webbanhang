import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-mig">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name_product}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-pricebox">
          <div className="productdisplay-pricebox-title">Giá sản phẩm</div>
          <div className="productdisplay-pricebox-main">
            <span className="productdisplay-pricebox-new">
              {product.price_product && product.price_product.toLocaleString()}đ
            </span>
            {product.old_price && (
              <span className="productdisplay-pricebox-old">
                {product.old_price.toLocaleString()}đ
              </span>
            )}
          </div>
        </div>
        <div className="productdisplay-right-description">
          <span className="productdisplay-right-description-label">
            Mô tả :
          </span>{" "}
          {product.describe}
        </div>
        <div className="productdisplay-right-quantity">
          <span>Số lượng còn lại: </span>
          {product.number}
        </div>
        <button
          onClick={() => {
            addToCart(product._id);
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
