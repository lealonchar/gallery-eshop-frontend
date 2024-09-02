import { useEffect, useState } from "react";
import { app } from "./config/firebaseConfig";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import ProductEditorModal from "./components/ProductEditorModal";
import ProductCard from "./components/ProductCard";
import AuthModal from "./components/AuthModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { Button, Navbar, Nav, Form, FormControl, Container, Row, Col } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [indexOfEditProduct, setIndexOfEditProduct] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [sortOption, setSortOption] = useState('price-asc');

  useEffect(() => {
    const database = getDatabase(app);
    const productsRef = ref(database, "products");
    const fetchData = () => {
      onValue(productsRef, (snapshot) => {
        const products = snapshot.val();
        if (products) {
          console.log('Fetched products:', products);
          setProducts(products);
        }
      });
    };

    fetchData();
  }, []);

  const sortProducts = (products, option) => {
    console.log('Sorting option:', option);
    console.log('Products before sorting:', products);

    // Check if products are an array and sort accordingly
    const productKeys = Object.keys(products);
    if (option === 'default') {
      // Return products in the original order
      return productKeys.reduce((sorted, key) => {
        sorted[key] = products[key];
        return sorted;
      }, {});
    }

    // Sort products based on the selected option
    return productKeys.sort((a, b) => {
      const productA = products[a];
      const productB = products[b];

      switch (option) {
        case 'price-asc':
          return (productA.price || 0) - (productB.price || 0);
        case 'price-desc':
          return (productB.price || 0) - (productA.price || 0);
        default:
          return 0;
      }
    }).reduce((sorted, key) => {
      sorted[key] = products[key];
      return sorted;
    }, {});
  };

  const sortedProducts = sortProducts(products, sortOption);

  const handleEditProduct = (key) => {
    setIndexOfEditProduct(key);
    setEditorOpen(true);
  };

  const handleCloseModal = () => {
    setIndexOfEditProduct(null);
    setEditorOpen(false);
  };

  const handleRemoveProduct = (key, productName) => {
    setProductToDelete({ key, productName });
    setShowConfirmDelete(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      const { key } = productToDelete;
      const database = getDatabase(app);
      const productsRef = ref(database, `products/${key}`);
      try {
        await remove(productsRef);
        setProductToDelete(null);
        setShowConfirmDelete(false);
      } catch (error) {
        alert('Error removing product:', error);
      }
    }
  };

  const handleShowAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="ps-3">
        <Navbar.Brand href="#home">Gallery e-shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Items</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search item"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div className="flex-grow-1 position-relative">
        {/* Conditional rendering of buttons */}
        {!authenticated && (
          <Button
            variant="secondary"
            className="position-absolute bottom-0 end-0 m-3"
            style={{ zIndex: 1 }}
            onClick={handleShowAuthModal}
          >
            Admin Login
          </Button>
        )}

        {authenticated && (
          <Button
            variant="success"
            className="position-absolute bottom-0 end-0 m-3"
            style={{ zIndex: 1 }}
            onClick={() => handleEditProduct(null)}
          >
            Add new item
          </Button>
        )}

        <Container className="my-4">
          <Row className="mb-4">
            <Col xs="auto">
              <div className="d-flex align-items-center">
                <span className="me-2">Sort:</span>
                <Form.Select
                  aria-label="Sort items"
                  className="form-select-sm"  // Bootstrap class for smaller dropdown
                  style={{ width: '150px' }}  // Inline style to set width
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </Form.Select>
              </div>
            </Col>
          </Row>
          <Row>
            {Object.keys(sortedProducts).map((key) => (
              <Col key={key} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard
                  productKey={key}
                  product={sortedProducts[key]}
                  handleEditProduct={() => handleEditProduct(key)}
                  handleRemoveProduct={() => handleRemoveProduct(key, sortedProducts[key].name)}
                  authenticated={authenticated}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <ProductEditorModal
        editorOpen={editorOpen}
        product={products[indexOfEditProduct]}
        productKey={indexOfEditProduct}
        handleCloseModal={handleCloseModal}
      />

      <AuthModal
        show={showAuthModal}
        handleClose={handleCloseAuthModal}
        setAuthenticated={setAuthenticated}
      />

      <ConfirmDeleteModal
        show={showConfirmDelete}
        handleClose={() => setShowConfirmDelete(false)}
        handleConfirm={confirmDeleteProduct}
        itemName={productToDelete ? productToDelete.productName : ''}
      />

      <footer className="bg-success text-light text-center py-3 mt-auto">
        <Container className="my-4">
          <Row className="justify-content-center">
            <Col>
              <h3>Gallery e-shop</h3>
              <p>For additional information send us an email</p>
              <a href="mailto:lea.lonchar@gmail.com?subject=Question&body=Hello, I would like some additional information." className="btn btn-light">
                Email
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;