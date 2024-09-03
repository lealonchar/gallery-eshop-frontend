import { useState } from 'react';
import { Button, Card, Modal, Row, Col } from 'react-bootstrap';
import { useCart } from './CartContext'; // Import Cart Context

const ProductCard = ({ productKey, product, handleEditProduct, handleRemoveProduct, authenticated }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const { addToCart } = useCart(); // Use Cart Context

  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);

  const handleBuy = () => {
    addToCart({ ...product, key: productKey });
    alert('Item added to cart!');
  };

  return (
    <>
      <Card className="mb-3" style={{ width: '18rem' }}>
        {product.imageURL && (
          <Card.Img
            variant="top"
            src={product.imageURL}
            alt={product.title}
            style={{ cursor: 'pointer' }}
            onClick={handleShowImageModal} // Add click handler
          />
        )}
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          {/* Removed the artist section */}
          {/* <Card.Subtitle className="mb-2 text-muted">{product.artist}</Card.Subtitle> */}
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>${product.price.toFixed(2)}</strong>
          </Card.Text>
          {authenticated && (
            <>
              <Button variant="primary" onClick={() => handleEditProduct(productKey)}>Edit</Button>
              <Button variant="danger" className="ms-2" onClick={() => handleRemoveProduct(productKey)}>Remove</Button>
            </>
          )}
          {/* Conditionally render the Buy button based on authentication */}
          {!authenticated && (
            <Button variant="success" className="mt-2" onClick={handleBuy}>Buy</Button>
          )}
        </Card.Body>
      </Card>

      {/* Full-screen image modal */}
      <Modal
        show={showImageModal}
        onHide={handleCloseImageModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Row className="align-items-center" style={{ height: '80vh' }}>
            <Col md={6} className="d-flex justify-content-center mb-3 mb-md-0">
              <img
                src={product.imageURL}
                alt={product.title}
                className="img-fluid"
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-center">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <h4>Price: ${product.price.toFixed(2)}</h4>
              {/* Conditionally render the Buy button based on authentication */}
              {!authenticated && (
                <Button variant="success" onClick={handleBuy}>Buy</Button>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
