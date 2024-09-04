import { useEffect, useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { database } from '../config/firebaseConfig';
import { ref, push, update } from 'firebase/database';

const ProductEditorModal = ({ editorOpen, product, productKey, handleCloseModal }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [file, setFile] = useState(null);
    const [imageURLInput, setImageURLInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const resetData = () => {
            setTitle(product?.title || "");
            setDescription(product?.description || "");
            setPrice(product?.price || 0);
            setImageURL(product?.imageURL || "");
            setFile(null);
            setImageURLInput(product?.imageURL || "");
        };

        resetData();
    }, [product]);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const newFile = acceptedFiles[0];
            setFile(newFile);

            const fileURL = URL.createObjectURL(newFile);
            setImageURL(fileURL);
            setImageURLInput(""); // Clear URL input if file is dropped
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !description.trim()) {
            setError('Please fill in all required fields.');
            return;
        }

        if (price <= 0) {
            setError('Price must be greater than 0.');
            return;
        }

        const productData = {
            title,
            description,
            price: parseFloat(price),
            imageURL: imageURL.trim() || imageURLInput.trim()
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
            setError('Error saving product: ' + error.message);
        }
    };

    const isFormValid = title.trim() && description.trim() && price > 0;

    return (
        <Modal
            show={editorOpen}
            onHide={handleCloseModal}
            dialogClassName="modal-90w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {product ? 'Edit Product' : 'Create Product'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <div
                            {...getRootProps()}
                            className="border border-secondary border-dashed p-3 rounded d-flex justify-content-center align-items-center mb-3"
                        >
                            <input {...getInputProps()} />
                            {file ? (
                                <img src={URL.createObjectURL(file)} alt="Preview" className="img-fluid" />
                            ) : (
                                <p className="text-muted">Drag & drop an image here, or click to select one</p>
                            )}
                        </div>
                        <Form.Control
                            type="text"
                            placeholder="Or enter image URL here"
                            value={imageURLInput}
                            onChange={(e) => setImageURLInput(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
                        disabled={!isFormValid}
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductEditorModal;
