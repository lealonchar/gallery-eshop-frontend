import { Button, Card } from 'react-bootstrap'

const ProductCard = ({ product, handleEditProduct, handleRemoveProduct }) => {
  return (
    <Card>
      <p>{product.title}</p>
      <p>{product.artist}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Button variant="primary" onClick={handleEditProduct}>Edit</Button>
      <Button variant="danger" onClick={handleRemoveProduct}>Remove</Button>
    </Card>
  )
}

export default ProductCard
