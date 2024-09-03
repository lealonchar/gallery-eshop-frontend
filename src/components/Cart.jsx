import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const Cart = ({ show, handleClose, cartItems, removeFromCart }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0), 0);

  // Generate the mailto link
  const generateMailtoLink = () => {
    const itemNames = cartItems.map(item => item.title).join(', ');
    const subject = encodeURIComponent('Order Inquiry');
    const body = encodeURIComponent(`Hello, I would like to buy ${itemNames}.`);
    return `mailto:lea.lonchar@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.key} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.title}</strong>
                  <br />
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(item.key)}>Remove</Button>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Total</strong>
              <strong>${totalPrice.toFixed(2)}</strong>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <a href={generateMailtoLink()} className="btn btn-primary">
          Checkout
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
