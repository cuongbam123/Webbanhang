import React, { useState } from "react";
import "./DescriptionBox.css";

const mockReviews = [
  {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/40?img=1",
    rating: 5,
    content: "Sản phẩm chất lượng, giao hàng nhanh, đóng gói cẩn thận.",
    date: "2024-06-01",
  },
  {
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/40?img=2",
    rating: 4,
    content: "Giá tốt, tư vấn nhiệt tình, sẽ ủng hộ lần sau.",
    date: "2024-05-28",
  },
  {
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/40?img=3",
    rating: 5,
    content: "Đặt hàng dễ dàng, sản phẩm đúng mô tả.",
    date: "2024-05-20",
  },
];

const DescriptionBox = () => {
  const [tab, setTab] = useState("desc");
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box${tab === "desc" ? "" : " fade"}`}
          onClick={() => setTab("desc")}
          style={{ cursor: "pointer" }}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box${tab === "review" ? "" : " fade"}`}
          onClick={() => setTab("review")}
          style={{ cursor: "pointer" }}
        >
          Reviews (122)
        </div>
      </div>
      {tab === "desc" ? (
        <div className="descriptionbox-description">
          <p>
            Website bán thiết bị điện tử của chúng tôi chuyên cung cấp các sản
            phẩm công nghệ chính hãng như điện thoại thông minh, laptop, máy
            tính bảng, phụ kiện, thiết bị âm thanh, đồng hồ thông minh và nhiều
            sản phẩm điện tử hiện đại khác. Chúng tôi cam kết mang đến cho khách
            hàng trải nghiệm mua sắm tiện lợi, nhanh chóng cùng mức giá cạnh
            tranh nhất thị trường.
          </p>
          <p>
            Tất cả sản phẩm đều có thông tin chi tiết, hình ảnh sắc nét, giá bán
            rõ ràng và nhiều lựa chọn về mẫu mã, cấu hình, màu sắc. Khách hàng
            được hỗ trợ tư vấn tận tình, chính sách bảo hành minh bạch, giao
            hàng toàn quốc và nhiều chương trình khuyến mãi hấp dẫn. Mỗi sản
            phẩm đều có trang thông tin riêng giúp bạn dễ dàng so sánh, lựa chọn
            phù hợp với nhu cầu.
          </p>
        </div>
      ) : (
        <div
          className="descriptionbox-review-list"
          style={{
            border: "1px solid #D0D0D0",
            padding: 32,
            borderTop: "none",
          }}
        >
          {mockReviews.map((r, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 24,
                alignItems: "flex-start",
              }}
            >
              <img
                src={r.avatar}
                alt={r.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {r.name}{" "}
                  <span style={{ color: "#f5b301" }}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                <div style={{ fontSize: 15, margin: "4px 0 2px 0" }}>
                  {r.content}
                </div>
                <div style={{ fontSize: 13, color: "#888" }}>
                  {new Date(r.date).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
