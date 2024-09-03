import { Container, Row, Col } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="my-4 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="text-center">
        <Col>
          <h1>Contact Us</h1>
          <p>Phone: +38975 538 981</p>
          <p>Mail: <a href="mailto:lea.lonchar@gmail.com">lea.lonchar@gmail.com</a></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
