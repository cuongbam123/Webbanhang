import React, { useState } from "react";
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton/PaypalCheckoutButton";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
import exchange_icon from "../Components/Assets/exchange_icon.png";

function OrderPage() {
  const [shipping, setShipping] = useState("FAST");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [usdTotal, setUsdTotal] = useState(1175.0); // ✅ Giá USD trực tiếp
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [address, setAddress] = useState("Huỳnh Tấn Phát, TP.HCM");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const navigate = useNavigate();

  const handleCodOrder = async () => {
    const orderData = {
      _id: uuidv4(),
      address: address,
      total: usdTotal, // ✅ Dùng USD thay vì VND
      status: "CHỜ XÁC NHẬN",
      pay: false,
      feeship: 0,
      id_user: "USER123",
      id_payment: "COD",
      id_note: null,
      id_coupon: null,
    };

    try {
      const res = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setOrderSuccess(true);
      } else {
        alert("❌ Đặt hàng thất bại!");
      }
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      alert("⚠️ Đã xảy ra lỗi khi đặt hàng");
    }
  };

  if (orderSuccess) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px 50px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            maxWidth: "500px",
            width: "90%",
          }}
        >
          <div
            style={{ fontSize: "80px", color: "green", marginBottom: "20px" }}
          >
            ✔
          </div>
          <h1
            style={{ color: "green", fontSize: "28px", marginBottom: "20px" }}
          >
            Đặt hàng thành công!
          </h1>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Trở về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      {/* Nút Quay lại */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
        >
          <span style={{ fontSize: "18px" }}>←</span>
        </button>
      </div>

      {/* Tiêu đề */}
      <span
        style={{
          display: "inline-block",
          fontSize: "40px",
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: "2px",
          background:
            "linear-gradient(90deg, #7f00ff, #e100ff, #00c9ff, #7f00ff)",
          backgroundSize: "400% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "galaxyText 6s linear infinite",
          textShadow: "0 0 10px rgba(255,255,255,0.3)",
        }}
      >
        Thanh toán
      </span>

      <style>
        {`
                @keyframes galaxyText {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
                }
                body {
                    background: linear-gradient(135deg, #f0f4f8, #e0e7ff);
                    font-family: 'Arial', sans-serif;
                    color: #333;
                }
                `}
      </style>
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "stretch",
          minHeight: "700px",
        }}
      >
        {/* BÊN TRÁI */}
        <div
          style={{
            flex: 3,
            border: "1px solid #ddd",
            padding: "2.5rem 2.5rem 2.5rem 2.5rem",
            background: "#f9f9ff",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            lineHeight: 1.4,
            fontSize: "18px",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              padding: "1.5rem 1.5rem 1.2rem 1.5rem",
              marginBottom: 0,
              borderRadius: "12px",
              background: "#fff",
              lineHeight: 1.7,
            }}
          >
            <h4>Chọn phương thức giao hàng</h4>
            <label>
              <input
                type="radio"
                name="shipping"
                value="FAST"
                checked={shipping === "FAST"}
                onChange={() => setShipping("FAST")}
              />
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: "#0070ba",
                }}
              >
                FAST
              </span>{" "}
              Giao hàng tiết kiệm
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="shipping"
                value="GO_JEK"
                checked={shipping === "GO_JEK"}
                onChange={() => setShipping("GO_JEK")}
              />
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: "#f0932b",
                }}
              >
                GO_JEK
              </span>{" "}
              Giao hàng tiết kiệm
            </label>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              padding: "1.5rem 1.5rem 1.2rem 1.5rem",
              borderRadius: "12px",
              background: "#fff",
              lineHeight: 1.7,
            }}
          >
            <h4 style={{ marginBottom: "1rem" }}>
              Chọn phương thức thanh toán
            </h4>

            <div
              onClick={() => setPaymentMethod("cod")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor:
                  paymentMethod === "cod" ? "#e9f7ef" : "#f8f9fa",
                border:
                  paymentMethod === "cod"
                    ? "2px solid #28a745"
                    : "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                style={{ marginRight: "10px" }}
              />
              <div>
                <strong>Thanh toán khi nhận hàng (COD)</strong>
                <br />
                <span style={{ fontSize: "12px", color: "#555" }}>
                  Bạn sẽ thanh toán bằng tiền mặt khi hàng được giao đến.
                </span>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod("paypal")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor:
                  paymentMethod === "paypal" ? "#e6f0fd" : "#f8f9fa",
                border:
                  paymentMethod === "paypal"
                    ? "2px solid #0070ba"
                    : "1px solid #ccc",
              }}
            >
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                style={{ marginRight: "10px" }}
              />
              <div>
                <strong>Thanh toán qua PayPal (USD)</strong>
                <br />
                <span style={{ fontSize: "12px", color: "#555" }}>
                  Thanh toán an toàn bằng tài khoản PayPal hoặc thẻ quốc tế.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BÊN PHẢI */}
        <div
          style={{
            flex: 2,
            border: "1px solid #ddd",
            padding: "2.5rem 2.5rem 2.5rem 2.5rem",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            lineHeight: 1.4,
            background: "#fff",
            fontSize: "20px",
          }}
        >
          {!isEditingAddress ? (
            <p>
              <strong>Địa chỉ:</strong> {address}{" "}
              <img
                src={exchange_icon}
                alt="Thay đổi"
                onClick={() => setIsEditingAddress(true)}
                style={{
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                  marginLeft: "8px",
                  verticalAlign: "middle",
                }}
              />
            </p>
          ) : (
            <div style={{ marginBottom: "1rem" }}>
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict("");
                  setSelectedWard("");
                }}
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              >
                <option value="">Chọn tỉnh/thành</option>
                {getProvinces().map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>

              {selectedProvince && (
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedWard("");
                  }}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                >
                  <option value="">Chọn quận/huyện</option>
                  {getDistricts()
                    .filter((d) => d.province_code === selectedProvince)
                    .map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                </select>
              )}

              {selectedDistrict && (
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                >
                  <option value="">Chọn phường/xã</option>
                  {getWards()
                    .filter((w) => w.district_code === selectedDistrict)
                    .map((ward) => (
                      <option key={ward.code} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                </select>
              )}

              <input
                type="text"
                placeholder="Số nhà, tên đường"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => {
                    const provinceName =
                      getProvinces().find((p) => p.code === selectedProvince)
                        ?.name || "";
                    const districtName =
                      getDistricts()
                        .filter((d) => d.province_code === selectedProvince)
                        .find((d) => d.code === selectedDistrict)?.name || "";
                    const fullAddress = `${street}, ${selectedWard}, ${districtName}, ${provinceName}`;
                    setAddress(fullAddress);
                    setIsEditingAddress(false);
                  }}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsEditingAddress(false)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          <hr />
          <p>
            Tạm tính: <strong>${usdTotal.toFixed(2)}</strong>
          </p>
          <p>
            Giảm giá: <strong>$0.00</strong>
          </p>
          <p>
            Phí giao hàng: <strong>$0.00</strong>
          </p>
          <p style={{ fontSize: "18px", color: "red" }}>
            Tổng tiền: <strong>${usdTotal.toFixed(2)}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "gray" }}>
            (Đã bao gồm VAT nếu có)
          </p>

          {paymentMethod === "paypal" ? (
            <>
              <PaypalCheckoutButton amount={usdTotal} />
              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  backgroundColor: "#2c2e2f",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Debit or Credit Card
              </button>
            </>
          ) : (
            <button
              onClick={handleCodOrder}
              style={{
                marginTop: "10px",
                width: "100%",
                backgroundColor: "#0070ba",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            >
              Đặt hàng (COD)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
