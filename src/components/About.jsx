import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-4 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="text-center">
        <Col>
          <h1>About the Artist</h1>
          <p>Here you can provide information about the artist.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
