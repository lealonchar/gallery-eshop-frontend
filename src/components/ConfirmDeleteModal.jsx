import { Button, Modal } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm, itemName }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the item <strong>{itemName}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
