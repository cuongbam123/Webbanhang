import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./NewsSection.css";

const NewsSection = ({ title, icon, news }) => {
  return (
    <div className="news-section mt-4 mb-5">
      <h2 className="section-title d-flex align-items-center">
        {icon && <span className="me-2">{icon}</span>} {title}
      </h2>
      <Row>
        {news.map((item) => (
          <Col md={4} sm={6} xs={12} key={item.id}>
            <Card className="news-card">
              <Card.Img variant="top" src={item.image} className="news-image" />
              <Card.Body className="news-content">
                <Card.Title className="news-title">{item.title}</Card.Title>
                <Card.Text>{item.content}</Card.Text>
                <Card.Link href={item.link} className="text-primary">
                  Đọc thêm
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewsSection;
