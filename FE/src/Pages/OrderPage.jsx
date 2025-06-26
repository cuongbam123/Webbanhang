import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./CSS/OrderPage.css";

const OrderPage = () => {
  const { cartItems, all_product, getTotalCartAmount, setCartItems } =
    useContext(ShopContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("COD");

  const navigate = useNavigate();

  const products = all_product
    .filter((product) => cartItems[product._id])
    .map((product) => ({
      id_product: product._id,
      name_product: product.name_product,
      price_product: product.price_product,
      count: cartItems[product._id],
      size: "M",
    }));

  const createNote = async () => {
    const token = localStorage.getItem("token");
    const noteData = { fullname, phone, content: note };

    const res = await fetch("http://localhost:3001/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noteData),
    });

    const data = await res.json();

    if (!res.ok || !data?.data?._id) {
      console.error("Tạo ghi chú lỗi:", data);
      throw new Error("Không thể tạo ghi chú");
    }

    return data.data._id;
  };

  const createOrderToServer = async (customData) => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customData),
    });
    const result = await res.json();
    if (result.success) {
      setCartItems({});
      const orderId = result?.data?._id || result?.order?._id;
      if (!orderId) throw new Error("Không nhận được ID đơn hàng từ server");
      navigate(`/order-success/${orderId}`);
    } else {
      alert("Tạo đơn hàng thất bại");
    }
  };

  const handleCODSubmit = async () => {
    if (!fullname || !phone || !address || products.length === 0) {
      alert("Vui lòng điền đầy đủ thông tin và giỏ hàng không được rỗng.");
      return;
    }
    const noteId = await createNote();
    const orderData = {
      address,
      total: getTotalCartAmount(),
      status: "Chờ xử lý",
      pay: false,
      feeship: 30000,
      id_payment: "COD",
      id_note: noteId,
      products,
    };
    await createOrderToServer(orderData);
  };

  const renderPayPal = () => (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AZ1yjvwq5m_1hf_Ioy2SgJRz2P2O3ZPZk_uWTMZKZPs5eovHFBn71u1DFo08RU8VuqkHj-0v5zgi06AB",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "pill",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: (getTotalCartAmount() / 23000).toFixed(2),
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          const noteId = await createNote();
          const orderData = {
            address,
            total: getTotalCartAmount(),
            status: "Chờ xử lý",
            pay: true,
            feeship: 30000,
            id_payment: "PAYPAL",
            id_note: noteId,
            products,
          };
          await createOrderToServer(orderData);
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          alert("Thanh toán PayPal thất bại.");
        }}
      />
    </PayPalScriptProvider>
  );

  return (
    <div className="order-bg">
      <div className="order-page">
        <h2 className="order-title">📦 Thông tin đặt hàng</h2>
        <form className="order-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Họ tên người nhận"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="order-input"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="order-input"
          />
          <textarea
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="order-input"
          ></textarea>
          <textarea
            placeholder="Ghi chú (ví dụ: gọi trước khi giao...)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="order-input"
          ></textarea>
          <div className="order-row">
            <label className="order-label">Phương thức thanh toán:</label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="order-select"
            >
              <option value="COD">Thanh toán khi nhận hàng</option>
              <option value="PAYPAL">PayPal</option>
            </select>
          </div>
          <div className="order-total">
            🧾 Tổng tiền: {getTotalCartAmount().toLocaleString()} VNĐ + 30.000
            VNĐ phí ship
          </div>
          {payment === "COD" ? (
            <button onClick={handleCODSubmit} className="order-btn">
              🚀 Xác nhận đặt hàng
            </button>
          ) : (
            <div className="order-paypal">{renderPayPal()}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
