import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./ProductSection.css";

const ProductSection = ({ title, icon, products }) => {
  return (
    <div className="product-section mt-4">
      <h2 className="section-title d-flex align-items-center">
        {icon && <span className="me-2">{icon}</span>} {title}
      </h2>
      <Row>
        {products.map((product) => (
          <Col md={2} sm={4} xs={6} key={product.id}>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
              <Card.Body className="p-2">
                <Card.Title className="product-title">
                  {product.name}
                </Card.Title>
                <Card.Text className="product-price">{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductSection;
