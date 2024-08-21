import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

const ProductEditorModal = ({ editorOpen, product, handleCloseModal }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [artist, setArtist] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        setTitle(product?.title || "");
        setDescription(product?.description || "");
        setArtist(product?.artist || "");
        setPrice(product?.price || 0);
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: implement firebase saving

        handleCloseModal();
    }

    return (
        <Modal
            show={editorOpen}
            onHide={handleCloseModal}
            dialogClassName="modal-90w"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {product ? 'Edit Product' : 'Create Product'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ProductEditorModal
