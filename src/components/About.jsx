import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-4" style={{ minHeight: '80vh' }}>
      <Row className="h-100 align-items-center">
        <Col md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <div className="text-center text-md-start" style={{ maxWidth: '90%' }}>
            <h1>About the Artist</h1>
            <p>All of the art is drawn by frostina</p>
            <p>
              Instagram: <a href="https://www.instagram.com/xfrostinax?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">@xfrostinax</a>
            </p>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <Image
            src="/images/about.png"
            alt="Artist"
            fluid
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
