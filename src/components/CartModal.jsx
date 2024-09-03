import React from 'react';
import { Modal, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { useCart } from './CartContext';

const Cart = ({ show, handleClose }) => {
  const { cart, removeFromCart } = useCart();

  const handleRemove = (productKey) => {
    removeFromCart(productKey);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ListGroup>
              {cart.map((item) => (
                <ListGroup.Item key={item.key}>
                  <Row>
                    <Col xs={8}>
                      <h5>{item.title}</h5>
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </Col>
                    <Col xs={4} className="text-end">
                      <Button variant="danger" onClick={() => handleRemove(item.key)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* Optionally, add a checkout button or other actions */}
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
