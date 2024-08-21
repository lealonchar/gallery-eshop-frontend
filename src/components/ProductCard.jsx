import { Button, Card } from 'react-bootstrap'

const ProductCard = ({ product, handleEditProduct }) => {
  return (
    <Card>
      <p>{product.title}</p>
      <p>{product.artist}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Button variant="primary" onClick={handleEditProduct}>Edit</Button>
    </Card>
  )
}

export default ProductCard
