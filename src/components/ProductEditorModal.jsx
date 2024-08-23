import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { database } from '../config/firebaseConfig';
import { ref, push, update } from 'firebase/database';

const ProductEditorModal = ({ editorOpen, product, productKey, handleCloseModal }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [artist, setArtist] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const resetData = () => {
            setTitle(product?.title || "");
            setDescription(product?.description || "");
            setArtist(product?.artist || "");
            setPrice(product?.price || 0);
        }

        resetData();
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            title: title,
            description: description,
            artist: artist,
            price: price
        };
        // TODO: Dodadi validacija polinjata da ne se prazen string, cenata da e pogolema od 0
        // ako nesto e e validno ne mu davaj da zacuva i prikazi mu error message
        let productRef;
        if (productKey) {
            productRef = ref(database, `products/${productKey}`);
        } else {
            productRef = ref(database, 'products');
        }
        try {
            if (productKey) {
                await update(productRef, product);
            } else {
                await push(productRef, product);
            }
            handleCloseModal();
        } catch (error) {
            console.log(error)
            alert('Error saving product:', error);
        }
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
