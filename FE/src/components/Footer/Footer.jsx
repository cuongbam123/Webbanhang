import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5 className="mb-4">THÔNG TIN</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none">
                  Giới thiệu
                </a>
              </li>
              <li className="mb-2">
                <a href="/news" className="text-white text-decoration-none">
                  Tin tức
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/promotions"
                  className="text-white text-decoration-none"
                >
                  Khuyến mãi
                </a>
              </li>
              <li className="mb-2">
                <a href="/careers" className="text-white text-decoration-none">
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5 className="mb-4">CHÍNH SÁCH</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/warranty" className="text-white text-decoration-none">
                  Chính sách bảo hành
                </a>
              </li>
              <li className="mb-2">
                <a href="/return" className="text-white text-decoration-none">
                  Chính sách đổi trả
                </a>
              </li>
              <li className="mb-2">
                <a href="/shipping" className="text-white text-decoration-none">
                  Chính sách giao hàng
                </a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="text-white text-decoration-none">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5 className="mb-4">HỖ TRỢ</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/guide/buying"
                  className="text-white text-decoration-none"
                >
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/guide/payment"
                  className="text-white text-decoration-none"
                >
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/guide/return"
                  className="text-white text-decoration-none"
                >
                  Hướng dẫn đổi trả
                </a>
              </li>
              <li className="mb-2">
                <a href="/faq" className="text-white text-decoration-none">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5 className="mb-4">LIÊN HỆ</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" /> 123 Đường ABC, Quận XYZ,
                TP.HCM
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaPhone className="me-2" /> 1900 1234
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaEnvelope className="me-2" /> support@eshop.com
              </li>
            </ul>
            <div className="social-icons d-flex mt-3">
              <a href="https://facebook.com" className="text-white me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://youtube.com" className="text-white">
                <FaYoutube size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="mt-4" />
        <div className="text-center pt-2">
          <p>
            &copy; {new Date().getFullYear()} E-SHOP. Tất cả các quyền được bảo
            lưu.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
