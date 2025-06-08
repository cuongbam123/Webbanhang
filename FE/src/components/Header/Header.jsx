import React from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaQuestionCircle,
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          E-SHOP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" style={{ width: "50%" }}>
            <FormControl
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">
              <FaSearch />
            </Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link href="/login" className="d-flex align-items-center">
              <FaUser className="me-1" /> Đăng nhập
            </Nav.Link>
            <Nav.Link href="/cart" className="d-flex align-items-center">
              <FaShoppingCart className="me-1" /> Giỏ hàng
            </Nav.Link>
            <Nav.Link href="/help" className="d-flex align-items-center">
              <FaQuestionCircle className="me-1" /> Hỗ trợ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
