import React from "react";
import { Container, Nav } from "react-bootstrap";
import {
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaDesktop,
  FaHeadphones,
  FaEllipsisH,
} from "react-icons/fa";
import "./CategoryMenu.css";

const CategoryMenu = () => {
  return (
    <div className="category-menu bg-dark py-2">
      <Container>
        <Nav className="justify-content-between">
          <Nav.Link
            href="/products/phone"
            className="text-white d-flex align-items-center"
          >
            <FaMobileAlt className="me-2" /> Điện thoại
          </Nav.Link>
          <Nav.Link
            href="/products/laptop"
            className="text-white d-flex align-items-center"
          >
            <FaLaptop className="me-2" /> Laptop
          </Nav.Link>
          <Nav.Link
            href="/products/tablet"
            className="text-white d-flex align-items-center"
          >
            <FaTabletAlt className="me-2" /> Tablet
          </Nav.Link>
          <Nav.Link
            href="/products/pc"
            className="text-white d-flex align-items-center"
          >
            <FaDesktop className="me-2" /> PC
          </Nav.Link>
          <Nav.Link
            href="/products/accessories"
            className="text-white d-flex align-items-center"
          >
            <FaHeadphones className="me-2" /> Phụ kiện
          </Nav.Link>
          <Nav.Link
            href="/products/other"
            className="text-white d-flex align-items-center"
          >
            <FaEllipsisH className="me-2" /> Khác
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
};

export default CategoryMenu;
