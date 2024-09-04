import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="my-4" style={{ minHeight: '80vh' }}>
      <Row className="h-100 align-items-center">
        <Col md={6} className="d-flex justify-content-center">
          <Image
            src="/images/contact.png"
            alt="Contact"
            fluid
            className="my-4" 
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="text-center text-md-start mx-md-5">
            <h1>Contact</h1>
            <p>Phone: +38975 178 241</p>
            <p>Mail: <a href="mailto:frostpsycho100@gmail.com">frostpsycho100@gmail.com</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
