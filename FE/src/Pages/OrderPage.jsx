// // import React, { useState } from "react";
// // import PaypalCheckoutButton from "../Components/PaypalCheckoutButton/PaypalCheckoutButton";
// // import { v4 as uuidv4 } from "uuid";
// // import { useNavigate } from "react-router-dom";
// // import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
// // import exchange_icon from "../Components/Assets/exchange_icon.png";

// // function OrderPage() {
// //   const [shipping, setShipping] = useState("FAST");
// //   const [paymentMethod, setPaymentMethod] = useState("paypal");
// //   const [usdTotal, setUsdTotal] = useState(1175.0); // ✅ Giá USD trực tiếp
// //   const [orderSuccess, setOrderSuccess] = useState(false);

// //   const [address, setAddress] = useState("Huỳnh Tấn Phát, TP.HCM");
// //   const [isEditingAddress, setIsEditingAddress] = useState(false);
// //   const [selectedProvince, setSelectedProvince] = useState("");
// //   const [selectedDistrict, setSelectedDistrict] = useState("");
// //   const [selectedWard, setSelectedWard] = useState("");
// //   const [street, setStreet] = useState("");
// //   const navigate = useNavigate();

// //   const handleCodOrder = async () => {
// //     const orderData = {
// //       _id: uuidv4(),
// //       address: address,
// //       total: usdTotal, // ✅ Dùng USD thay vì VND
// //       status: "CHỜ XÁC NHẬN",
// //       pay: false,
// //       feeship: 0,
// //       id_user: "USER123",
// //       id_payment: "COD",
// //       id_note: null,
// //       id_coupon: null,
// //     };

// //     try {
// //       const res = await fetch("http://localhost:3001/api/orders", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(orderData),
// //       });

// //       if (res.ok) {
// //         setOrderSuccess(true);
// //       } else {
// //         alert("❌ Đặt hàng thất bại!");
// //       }
// //     } catch (err) {
// //       console.error("Lỗi đặt hàng:", err);
// //       alert("⚠️ Đã xảy ra lỗi khi đặt hàng");
// //     }
// //   };

// //   if (orderSuccess) {
// //     return (
// //       <div
// //         style={{
// //           position: "fixed",
// //           top: 0,
// //           left: 0,
// //           width: "100vw",
// //           height: "100vh",
// //           backgroundColor: "rgba(0,0,0,0.5)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           zIndex: 9999,
// //         }}
// //       >
// //         <div
// //           style={{
// //             background: "#fff",
// //             padding: "40px 50px",
// //             borderRadius: "12px",
// //             textAlign: "center",
// //             boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
// //             maxWidth: "500px",
// //             width: "90%",
// //           }}
// //         >
// //           <div
// //             style={{ fontSize: "80px", color: "green", marginBottom: "20px" }}
// //           >
// //             ✔
// //           </div>
// //           <h1
// //             style={{ color: "green", fontSize: "28px", marginBottom: "20px" }}
// //           >
// //             Đặt hàng thành công!
// //           </h1>
// //           <button
// //             onClick={() => navigate("/")}
// //             style={{
// //               marginTop: "20px",
// //               padding: "12px 24px",
// //               backgroundColor: "#0070f3",
// //               color: "white",
// //               border: "none",
// //               borderRadius: "6px",
// //               fontSize: "16px",
// //               cursor: "pointer",
// //             }}
// //           >
// //             Trở về trang chủ
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       {/* Nút Quay lại */}
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "flex-end",
// //           marginBottom: "1rem",
// //         }}
// //       >
// //         <button
// //           onClick={() => navigate(-1)}
// //           style={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             gap: "10px",
// //             padding: "10px 20px",
// //             background: "linear-gradient(135deg, #667eea, #764ba2)",
// //             color: "#fff",
// //             border: "none",
// //             borderRadius: "999px",
// //             cursor: "pointer",
// //             fontSize: "15px",
// //             fontWeight: "600",
// //             boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// //             transition: "all 0.2s ease",
// //           }}
// //           onMouseOver={(e) => {
// //             e.currentTarget.style.transform = "translateY(-2px)";
// //             e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
// //           }}
// //           onMouseOut={(e) => {
// //             e.currentTarget.style.transform = "translateY(0)";
// //             e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
// //           }}
// //         >
// //           <span style={{ fontSize: "18px" }}>←</span>
// //         </button>
// //       </div>

// //       {/* Tiêu đề */}
// //       <span
// //         style={{
// //           display: "inline-block",
// //           fontSize: "40px",
// //           fontWeight: "800",
// //           textTransform: "uppercase",
// //           letterSpacing: "2px",
// //           background:
// //             "linear-gradient(90deg, #7f00ff, #e100ff, #00c9ff, #7f00ff)",
// //           backgroundSize: "400% 100%",
// //           WebkitBackgroundClip: "text",
// //           WebkitTextFillColor: "transparent",
// //           animation: "galaxyText 6s linear infinite",
// //           textShadow: "0 0 10px rgba(255,255,255,0.3)",
// //         }}
// //       >
// //         Thanh toán
// //       </span>

// //       <style>
// //         {`
// //                 @keyframes galaxyText {
// //                 0% { background-position: 0% 50%; }
// //                 50% { background-position: 100% 50%; }
// //                 100% { background-position: 0% 50%; }
// //                 }
// //                 body {
// //                     background: linear-gradient(135deg, #f0f4f8, #e0e7ff);
// //                     font-family: 'Arial', sans-serif;
// //                     color: #333;
// //                 }
// //                 `}
// //             </style>
// //             <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
// //                 {/* BÊN TRÁI */}
// //                 <div style={{ flex: 3, border: "1px solid #ddd", padding: "1rem", background: "#f9f9ff" }}>
// //                     <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
// //                         <h4>Chọn phương thức giao hàng</h4>
// //                         <label>
// //                             <input type="radio" name="shipping" value="FAST"
// //                                 checked={shipping === "FAST"} onChange={() => setShipping("FAST")} />
// //                             <span style={{ marginLeft: "5px", fontWeight: "bold", color: "#0070ba" }}>FAST</span> Giao hàng tiết kiệm
// //                         </label>
// //                         <br />
// //                         <label>
// //                             <input type="radio" name="shipping" value="GO_JEK"
// //                                 checked={shipping === "GO_JEK"} onChange={() => setShipping("GO_JEK")} />
// //                             <span style={{ marginLeft: "5px", fontWeight: "bold", color: "#f0932b" }}>GO_JEK</span> Giao hàng tiết kiệm
// //                         </label>
// //                     </div>

// //           <div
// //             style={{
// //               border: "1px solid #ddd",
// //               padding: "1.5rem 1.5rem 1.2rem 1.5rem",
// //               borderRadius: "12px",
// //               background: "#fff",
// //               lineHeight: 1.7,
// //             }}
// //           >
// //             <h4 style={{ marginBottom: "1rem" }}>
// //               Chọn phương thức thanh toán
// //             </h4>

// //                         <div onClick={() => setPaymentMethod("cod")} style={{
// //                             display: "flex", alignItems: "center", padding: "10px", borderRadius: "6px",
// //                             cursor: "pointer", backgroundColor: paymentMethod === "cod" ? "#e9f7ef" : "#f8f9fa",
// //                             border: paymentMethod === "cod" ? "2px solid #28a745" : "1px solid #ccc",
// //                             marginBottom: "10px"
// //                         }}>
// //                             <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"}
// //                                 onChange={() => setPaymentMethod("cod")} style={{ marginRight: "10px" }} />
// //                             <div>
// //                                 <strong>Thanh toán khi nhận hàng (COD)</strong><br />
// //                                 <span style={{ fontSize: "12px", color: "#555" }}>
// //                                     Bạn sẽ thanh toán bằng tiền mặt khi hàng được giao đến.
// //                                 </span>
// //                             </div>
// //                         </div>

// //                         <div onClick={() => setPaymentMethod("paypal")} style={{
// //                             display: "flex", alignItems: "center", padding: "10px", borderRadius: "6px",
// //                             cursor: "pointer", backgroundColor: paymentMethod === "paypal" ? "#e6f0fd" : "#f8f9fa",
// //                             border: paymentMethod === "paypal" ? "2px solid #0070ba" : "1px solid #ccc"
// //                         }}>
// //                             <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"}
// //                                 onChange={() => setPaymentMethod("paypal")} style={{ marginRight: "10px" }} />
// //                             <div>
// //                                 <strong>Thanh toán qua PayPal (USD)</strong><br />
// //                                 <span style={{ fontSize: "12px", color: "#555" }}>
// //                                     Thanh toán an toàn bằng tài khoản PayPal hoặc thẻ quốc tế.
// //                                 </span>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //         {/* BÊN PHẢI */}
// //         <div
// //           style={{
// //             flex: 2,
// //             border: "1px solid #ddd",
// //             padding: "2.5rem 2.5rem 2.5rem 2.5rem",
// //             height: "100%",
// //             boxSizing: "border-box",
// //             display: "flex",
// //             flexDirection: "column",
// //             gap: "2rem",
// //             lineHeight: 1.4,
// //             background: "#fff",
// //             fontSize: "20px",
// //           }}
// //         >
// //           {!isEditingAddress ? (
// //             <p>
// //               <strong>Địa chỉ:</strong> {address}{" "}
// //               <img
// //                 src={exchange_icon}
// //                 alt="Thay đổi"
// //                 onClick={() => setIsEditingAddress(true)}
// //                 style={{
// //                   width: "22px",
// //                   height: "22px",
// //                   cursor: "pointer",
// //                   marginLeft: "8px",
// //                   verticalAlign: "middle",
// //                 }}
// //               />
// //             </p>
// //           ) : (
// //             <div style={{ marginBottom: "1rem" }}>
// //               <select
// //                 value={selectedProvince}
// //                 onChange={(e) => {
// //                   setSelectedProvince(e.target.value);
// //                   setSelectedDistrict("");
// //                   setSelectedWard("");
// //                 }}
// //                 style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
// //               >
// //                 <option value="">Chọn tỉnh/thành</option>
// //                 {getProvinces().map((province) => (
// //                   <option key={province.code} value={province.code}>
// //                     {province.name}
// //                   </option>
// //                 ))}
// //               </select>

// //               {selectedProvince && (
// //                 <select
// //                   value={selectedDistrict}
// //                   onChange={(e) => {
// //                     setSelectedDistrict(e.target.value);
// //                     setSelectedWard("");
// //                   }}
// //                   style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
// //                 >
// //                   <option value="">Chọn quận/huyện</option>
// //                   {getDistricts()
// //                     .filter((d) => d.province_code === selectedProvince)
// //                     .map((district) => (
// //                       <option key={district.code} value={district.code}>
// //                         {district.name}
// //                       </option>
// //                     ))}
// //                 </select>
// //               )}

// //               {selectedDistrict && (
// //                 <select
// //                   value={selectedWard}
// //                   onChange={(e) => setSelectedWard(e.target.value)}
// //                   style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
// //                 >
// //                   <option value="">Chọn phường/xã</option>
// //                   {getWards()
// //                     .filter((w) => w.district_code === selectedDistrict)
// //                     .map((ward) => (
// //                       <option key={ward.code} value={ward.name}>
// //                         {ward.name}
// //                       </option>
// //                     ))}
// //                 </select>
// //               )}

// //               <input
// //                 type="text"
// //                 placeholder="Số nhà, tên đường"
// //                 value={street}
// //                 onChange={(e) => setStreet(e.target.value)}
// //                 style={{
// //                   width: "100%",
// //                   padding: "8px",
// //                   marginBottom: "8px",
// //                   border: "1px solid #ccc",
// //                   borderRadius: "4px",
// //                 }}
// //               />

// //               <div style={{ display: "flex", gap: "10px" }}>
// //                 <button
// //                   onClick={() => {
// //                     const provinceName =
// //                       getProvinces().find((p) => p.code === selectedProvince)
// //                         ?.name || "";
// //                     const districtName =
// //                       getDistricts()
// //                         .filter((d) => d.province_code === selectedProvince)
// //                         .find((d) => d.code === selectedDistrict)?.name || "";
// //                     const fullAddress = `${street}, ${selectedWard}, ${districtName}, ${provinceName}`;
// //                     setAddress(fullAddress);
// //                     setIsEditingAddress(false);
// //                   }}
// //                   style={{
// //                     padding: "6px 12px",
// //                     backgroundColor: "#28a745",
// //                     color: "white",
// //                     border: "none",
// //                     borderRadius: "4px",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   Lưu
// //                 </button>
// //                 <button
// //                   onClick={() => setIsEditingAddress(false)}
// //                   style={{
// //                     padding: "6px 12px",
// //                     backgroundColor: "#ccc",
// //                     border: "none",
// //                     borderRadius: "4px",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   Hủy
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <hr />
// //           <p>
// //             Tạm tính: <strong>${usdTotal.toFixed(2)}</strong>
// //           </p>
// //           <p>
// //             Giảm giá: <strong>$0.00</strong>
// //           </p>
// //           <p>
// //             Phí giao hàng: <strong>$0.00</strong>
// //           </p>
// //           <p style={{ fontSize: "18px", color: "red" }}>
// //             Tổng tiền: <strong>${usdTotal.toFixed(2)}</strong>
// //           </p>
// //           <p style={{ fontSize: "12px", color: "gray" }}>
// //             (Đã bao gồm VAT nếu có)
// //           </p>

// //           {paymentMethod === "paypal" ? (
// //             <>
// //               <PaypalCheckoutButton amount={usdTotal} />
// //               <button
// //                 style={{
// //                   marginTop: "10px",
// //                   width: "100%",
// //                   backgroundColor: "#2c2e2f",
// //                   color: "white",
// //                   padding: "10px",
// //                   border: "none",
// //                   borderRadius: "4px",
// //                 }}
// //               >
// //                 Debit or Credit Card
// //               </button>
// //             </>
// //           ) : (
// //             <button
// //               onClick={handleCodOrder}
// //               style={{
// //                 marginTop: "10px",
// //                 width: "100%",
// //                 backgroundColor: "#0070ba",
// //                 color: "white",
// //                 padding: "10px",
// //                 border: "none",
// //                 borderRadius: "4px",
// //                 fontSize: "16px",
// //               }}
// //             >
// //               Đặt hàng (COD)
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default OrderPage;


// import React, {useContext, useState, useEffect } from "react";
// import PaypalCheckoutButton from "../Components/PaypalCheckoutButton/PaypalCheckoutButton";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import { getProvinces, getDistricts, getWards } from "vietnam-provinces";
// import exchange_icon from "../Components/Assets/exchange_icon.png";
// import { ShopContext } from "../Context/ShopContext";

// function OrderPage() {
//   const [shipping, setShipping] = useState("FAST");
//   const [paymentMethod, setPaymentMethod] = useState("paypal");
//   // const [usdTotal, setUsdTotal] = useState(0); // ✅ Khởi tạo là 0
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [address, setAddress] = useState("Huỳnh Tấn Phát, TP.HCM");
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedWard, setSelectedWard] = useState("");
//   const [street, setStreet] = useState("");
//   const navigate = useNavigate();
//   const { cartItems, all_product,getTotalCartAmount, setCartItems } = useContext(ShopContext);
//   const [usdTotal, setUsdTotal] = useState(0);


//   useEffect(() => {
//     const total = Object.entries(cartItems).reduce((sum, [id, quantity]) => {
//       const product = all_product.find((p) => p._id === id);
//       return product ? sum + product.price_product * quantity : sum;
//     }, 0);
//     setUsdTotal(Math.ceil(total / 24000));
//   }, [cartItems, all_product]);
  
//   const handleCodOrder = async () => {
//     const total = getTotalCartAmount();
//     const address = "Địa chỉ mặc định";
//     const userId = "USER_ID";  // TODO: Lấy từ token hoặc context đăng nhập
//     const paymentId = "COD";
//     const orderId = Date.now().toString();

//     const orderData = {
//       _id: orderId,
//       address,
//       total,
//       status: "Chờ xử lý",
//       pay: false,
//       feeship: 30000,
//       id_user: userId,
//       id_payment: paymentId,
//       //Thêm
//       products: Object.entries(cartItems).map(([productId, quantity]) => {
//         const product = all_product.find((p) => p._id === productId);
//         return {
//           id_product: productId,
//           name_product: product.name_product,
//           price_product: product.price_product,
//           count: quantity,
//           size: "M", // nếu bạn có size thì truyền, không thì hardcode
//         };
//       }),
//     };

//     try {
//       const response = await fetch('http://localhost:3001/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(orderData)
//       });

//       if (!response.ok) throw new Error('Tạo đơn hàng thất bại');

//       const result = await response.json();

//       setCartItems({});
//       navigate(`/orders/${result.data._id}`);
//     } catch (error) {
//       console.error('Lỗi khi đặt hàng COD:', error);
//       alert('Đặt hàng không thành công');
//     }
//   };
  
//   if (orderSuccess) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 9999,
//         }}
//       >
//         <div
//           style={{
//             background: "#fff",
//             padding: "40px 50px",
//             borderRadius: "12px",
//             textAlign: "center",
//             boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
//             maxWidth: "500px",
//             width: "90%",
//           }}
//         >
//           <div
//             style={{ fontSize: "80px", color: "green", marginBottom: "20px" }}
//           >
//             ✔
//           </div>
//           <h1
//             style={{ color: "green", fontSize: "28px", marginBottom: "20px" }}
//           >
//             Đặt hàng thành công!
//           </h1>
//           <button
//             onClick={() => navigate("/")}
//             style={{
//               marginTop: "20px",
//               padding: "12px 24px",
//               backgroundColor: "#0070f3",
//               color: "white",
//               border: "none",
//               borderRadius: "6px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             Trở về trang chủ
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       {/* Nút Quay lại */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginBottom: "1rem",
//         }}
//       >
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "10px",
//             padding: "10px 20px",
//             background: "linear-gradient(135deg, #667eea, #764ba2)",
//             color: "#fff",
//             border: "none",
//             borderRadius: "999px",
//             cursor: "pointer",
//             fontSize: "15px",
//             fontWeight: "600",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//             transition: "all 0.2s ease",
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.transform = "translateY(-2px)";
//             e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
//           }}
//         >
//           <span style={{ fontSize: "18px" }}>←</span>
//         </button>
//       </div>

//       {/* Tiêu đề */}
//       <span
//         style={{
//           display: "inline-block",
//           fontSize: "40px",
//           fontWeight: "800",
//           textTransform: "uppercase",
//           letterSpacing: "2px",
//           background:
//             "linear-gradient(90deg, #7f00ff, #e100ff, #00c9ff, #7f00ff)",
//           backgroundSize: "400% 100%",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           animation: "galaxyText 6s linear infinite",
//           textShadow: "0 0 10px rgba(255,255,255,0.3)",
//         }}
//       >
//         Thanh toán
//       </span>

//       <style>
//         {`
//                 @keyframes galaxyText {
//                 0% { background-position: 0% 50%; }
//                 50% { background-position: 100% 50%; }
//                 100% { background-position: 0% 50%; }
//                 }
//                 body {
//                     background: linear-gradient(135deg, #f0f4f8, #e0e7ff);
//                     font-family: 'Arial', sans-serif;
//                     color: #333;
//                 }
//                 `}
//             </style>
//             <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
//                 {/* BÊN TRÁI */}
//                 <div style={{ flex: 3, border: "1px solid #ddd", padding: "1rem", background: "#f9f9ff" }}>
//                     <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
//                         <h4>Chọn phương thức giao hàng</h4>
//                         <label>
//                             <input type="radio" name="shipping" value="FAST"
//                                 checked={shipping === "FAST"} onChange={() => setShipping("FAST")} />
//                             <span style={{ marginLeft: "5px", fontWeight: "bold", color: "#0070ba" }}>FAST</span> Giao hàng tiết kiệm
//                         </label>
//                         <br />
//                         <label>
//                             <input type="radio" name="shipping" value="GO_JEK"
//                                 checked={shipping === "GO_JEK"} onChange={() => setShipping("GO_JEK")} />
//                             <span style={{ marginLeft: "5px", fontWeight: "bold", color: "#f0932b" }}>GO_JEK</span> Giao hàng tiết kiệm
//                         </label>
//                     </div>

//           <div
//             style={{
//               border: "1px solid #ddd",
//               padding: "1.5rem 1.5rem 1.2rem 1.5rem",
//               borderRadius: "12px",
//               background: "#fff",
//               lineHeight: 1.7,
//             }}
//           >
//             <h4 style={{ marginBottom: "1rem" }}>
//               Chọn phương thức thanh toán
//             </h4>

//                         <div onClick={() => setPaymentMethod("cod")} style={{
//                             display: "flex", alignItems: "center", padding: "10px", borderRadius: "6px",
//                             cursor: "pointer", backgroundColor: paymentMethod === "cod" ? "#e9f7ef" : "#f8f9fa",
//                             border: paymentMethod === "cod" ? "2px solid #28a745" : "1px solid #ccc",
//                             marginBottom: "10px"
//                         }}>
//                             <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"}
//                                 onChange={() => setPaymentMethod("cod")} style={{ marginRight: "10px" }} />
//                             <div>
//                                 <strong>Thanh toán khi nhận hàng (COD)</strong><br />
//                                 <span style={{ fontSize: "12px", color: "#555" }}>
//                                     Bạn sẽ thanh toán bằng tiền mặt khi hàng được giao đến.
//                                 </span>
//                             </div>
//                         </div>

//                         <div onClick={() => setPaymentMethod("paypal")} style={{
//                             display: "flex", alignItems: "center", padding: "10px", borderRadius: "6px",
//                             cursor: "pointer", backgroundColor: paymentMethod === "paypal" ? "#e6f0fd" : "#f8f9fa",
//                             border: paymentMethod === "paypal" ? "2px solid #0070ba" : "1px solid #ccc"
//                         }}>
//                             <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"}
//                                 onChange={() => setPaymentMethod("paypal")} style={{ marginRight: "10px" }} />
//                             <div>
//                                 <strong>Thanh toán qua PayPal (USD)</strong><br />
//                                 <span style={{ fontSize: "12px", color: "#555" }}>
//                                     Thanh toán an toàn bằng tài khoản PayPal hoặc thẻ quốc tế.
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//         {/* BÊN PHẢI */}
//         <div
//           style={{
//             flex: 2,
//             border: "1px solid #ddd",
//             padding: "2.5rem 2.5rem 2.5rem 2.5rem",
//             height: "100%",
//             boxSizing: "border-box",
//             display: "flex",
//             flexDirection: "column",
//             gap: "2rem",
//             lineHeight: 1.4,
//             background: "#fff",
//             fontSize: "20px",
//           }}
//         >
//           {!isEditingAddress ? (
//             <p>
//               <strong>Địa chỉ:</strong> {address}{" "}
//               <img
//                 src={exchange_icon}
//                 alt="Thay đổi"
//                 onClick={() => setIsEditingAddress(true)}
//                 style={{
//                   width: "22px",
//                   height: "22px",
//                   cursor: "pointer",
//                   marginLeft: "8px",
//                   verticalAlign: "middle",
//                 }}
//               />
//             </p>
//           ) : (
//             <div style={{ marginBottom: "1rem" }}>
//               <select
//                 value={selectedProvince}
//                 onChange={(e) => {
//                   setSelectedProvince(e.target.value);
//                   setSelectedDistrict("");
//                   setSelectedWard("");
//                 }}
//                 style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
//               >
//                 <option value="">Chọn tỉnh/thành</option>
//                 {getProvinces().map((province) => (
//                   <option key={province.code} value={province.code}>
//                     {province.name}
//                   </option>
//                 ))}
//               </select>

//               {selectedProvince && (
//                 <select
//                   value={selectedDistrict}
//                   onChange={(e) => {
//                     setSelectedDistrict(e.target.value);
//                     setSelectedWard("");
//                   }}
//                   style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
//                 >
//                   <option value="">Chọn quận/huyện</option>
//                   {getDistricts()
//                     .filter((d) => d.province_code === selectedProvince)
//                     .map((district) => (
//                       <option key={district.code} value={district.code}>
//                         {district.name}
//                       </option>
//                     ))}
//                 </select>
//               )}

//               {selectedDistrict && (
//                 <select
//                   value={selectedWard}
//                   onChange={(e) => setSelectedWard(e.target.value)}
//                   style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
//                 >
//                   <option value="">Chọn phường/xã</option>
//                   {getWards()
//                     .filter((w) => w.district_code === selectedDistrict)
//                     .map((ward) => (
//                       <option key={ward.code} value={ward.name}>
//                         {ward.name}
//                       </option>
//                     ))}
//                 </select>
//               )}

//               <input
//                 type="text"
//                 placeholder="Số nhà, tên đường"
//                 value={street}
//                 onChange={(e) => setStreet(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "8px",
//                   marginBottom: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                 }}
//               />

//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button
//                   onClick={() => {
//                     const provinceName =
//                       getProvinces().find((p) => p.code === selectedProvince)
//                         ?.name || "";
//                     const districtName =
//                       getDistricts()
//                         .filter((d) => d.province_code === selectedProvince)
//                         .find((d) => d.code === selectedDistrict)?.name || "";
//                     const fullAddress = `${street}, ${selectedWard}, ${districtName}, ${provinceName}`;
//                     setAddress(fullAddress);
//                     setIsEditingAddress(false);
//                   }}
//                   style={{
//                     padding: "6px 12px",
//                     backgroundColor: "#28a745",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Lưu
//                 </button>
//                 <button
//                   onClick={() => setIsEditingAddress(false)}
//                   style={{
//                     padding: "6px 12px",
//                     backgroundColor: "#ccc",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Hủy
//                 </button>
//               </div>
//             </div>
//           )}

//           <hr />
//           <p>
//             Tạm tính: <strong>${usdTotal.toFixed(2)}</strong>
//           </p>
//           <p>
//             Giảm giá: <strong>$0.00</strong>
//           </p>
//           <p>
//             Phí giao hàng: <strong>$0.00</strong>
//           </p>
//           <p style={{ fontSize: "18px", color: "red" }}>
//             Tổng tiền: <strong>${usdTotal.toFixed(2)}</strong>
//           </p>
//           <p style={{ fontSize: "12px", color: "gray" }}>
//             (Đã bao gồm VAT nếu có)
//           </p>

//           {paymentMethod === "paypal" ? (
//             <>
//               <PaypalCheckoutButton amount={usdTotal} />
//               <button
//                 style={{
//                   marginTop: "10px",
//                   width: "100%",
//                   backgroundColor: "#2c2e2f",
//                   color: "white",
//                   padding: "10px",
//                   border: "none",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Debit or Credit Card
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handleCodOrder}
//               style={{
//                 marginTop: "10px",
//                 width: "100%",
//                 backgroundColor: "#0070ba",
//                 color: "white",
//                 padding: "10px",
//                 border: "none",
//                 borderRadius: "4px",
//                 fontSize: "16px",
//               }}
//             >
//               Đặt hàng (COD)
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderPage;

import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderPage = () => {
  const { cartItems, all_product, getTotalCartAmount, setCartItems } = useContext(ShopContext);
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
      size: "M"
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
    }
    else {
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
    <PayPalScriptProvider options={{ "client-id": "AZ1yjvwq5m_1hf_Ioy2SgJRz2P2O3ZPZk_uWTMZKZPs5eovHFBn71u1DFo08RU8VuqkHj-0v5zgi06AB" }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
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
    <div className="order-page" style={{ maxWidth: 800, margin: "40px auto", padding: 32, background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>📦 Thông tin đặt hàng</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="text"
          placeholder="Họ tên người nhận"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Địa chỉ giao hàng"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "none" }}
        ></textarea>
        <textarea
          placeholder="Ghi chú (ví dụ: gọi trước khi giao...)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          style={{ ...inputStyle, resize: "none" }}
        ></textarea>

        <div>
          <label style={{ fontWeight: 600, marginRight: 12 }}>Phương thức thanh toán:</label>
          <select value={payment} onChange={(e) => setPayment(e.target.value)} style={{ padding: 10, fontSize: 16 }}>
            <option value="COD">Thanh toán khi nhận hàng</option>
            <option value="PAYPAL">PayPal</option>
          </select>
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>
          🧾 Tổng tiền: {getTotalCartAmount().toLocaleString()} VNĐ + 30.000 VNĐ phí ship
        </div>

        {payment === "COD" ? (
          <button
            onClick={handleCODSubmit}
            style={{ marginTop: 24, padding: "12px 24px", background: "#0a84ff", color: "white", fontSize: 18, fontWeight: 700, border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            🚀 Xác nhận đặt hàng
          </button>
        ) : (
          <div style={{ marginTop: 20 }}>{renderPayPal()}</div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px 16px",
  fontSize: 16,
  borderRadius: 8,
  border: "1px solid #ccc",
};

export default OrderPage;