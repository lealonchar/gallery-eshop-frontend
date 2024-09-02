import { Button, Card } from 'react-bootstrap';

const ProductCard = ({ productKey, product, handleEditProduct, handleRemoveProduct, authenticated }) => {
  return (
    <Card className="mb-3" style={{ width: '18rem' }}>
      {product.imageURL && (
        <Card.Img variant="top" src={product.imageURL} alt={product.title} />
      )}
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.artist}</Card.Subtitle>
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
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
