
import { Modal, Button } from 'react-bootstrap';

const ImageModal = ({ show, onHide, imageSrc }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center">
        <img
          src={imageSrc}
          alt="Full screen"
          className="img-fluid"
          style={{ maxWidth: '100%', maxHeight: '80vh' }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
