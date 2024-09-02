import { useEffect, useState } from 'react';
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

        // Validate inputs
        if (!title.trim() || !artist.trim() || !description.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        if (price <= 0) {
            alert('Price must be greater than 0.');
            return;
        }

        const productData = {
            title,
            description,
            artist,
            price: parseFloat(price) // Ensure price is a number
        };

        let productRef;
        if (productKey) {
            productRef = ref(database, `products/${productKey}`);
        } else {
            productRef = ref(database, 'products');
        }

        try {
            if (productKey) {
                await update(productRef, productData);
            } else {
                await push(productRef, productData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product: ' + error.message);
        }
    }

    const isFormValid = title.trim() && artist.trim() && description.trim() && price > 0;

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
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicArtist">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            min="0" 
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={handleSubmit}
                        disabled={!isFormValid} // Disable if form is invalid
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ProductEditorModal;
