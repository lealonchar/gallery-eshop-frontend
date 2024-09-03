import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { app } from './config/firebaseConfig';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import ProductEditorModal from './components/ProductEditorModal';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import Cart from './components/Cart';
import { useCart } from './components/CartContext';
import About from './components/About';
import Contact from './components/Contact';
import { Button, Navbar, Form, FormControl, Container, Row, Col, Nav } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);
  const [indexOfEditProduct, setIndexOfEditProduct] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartVisible, setCartVisible] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const database = getDatabase(app);
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const products = snapshot.val();
      if (products) {
        setProducts(products);
      }
    });
  }, []);

  const sortProducts = (products, option) => {
    const productKeys = Object.keys(products);
    if (option === 'default') {
      return productKeys.reduce((sorted, key) => {
        sorted[key] = products[key];
        return sorted;
      }, {});
    }

    return productKeys.sort((a, b) => {
      const productA = products[a];
      const productB = products[b];

      switch (option) {
        case 'price-asc':
          return (productA.price || 0) - (productB.price || 0);
        case 'price-desc':
          return (productB.price || 0) - (productA.price || 0);
        case 'title-asc':
          return (productA.title || '').localeCompare(productB.title || '');
        case 'title-desc':
          return (productB.title || '').localeCompare(productA.title || '');
        default:
          return 0;
      }
    }).reduce((sorted, key) => {
      sorted[key] = products[key];
      return sorted;
    }, {});
  };

  const filterProducts = (products, query) => {
    if (!query) return products;

    const lowercasedQuery = query.toLowerCase();
    return Object.keys(products).reduce((filtered, key) => {
      const product = products[key];
      if ((product.title || '').toLowerCase().includes(lowercasedQuery)) {
        filtered[key] = product;
      }
      return filtered;
    }, {});
  };

  const sortedProducts = sortProducts(products, sortOption);
  const filteredProducts = filterProducts(sortedProducts, searchQuery);

  const handleEditProduct = (key) => {
    setIndexOfEditProduct(key);
    setEditorOpen(true);
  };

  const handleOpenEditor = () => {
    setIndexOfEditProduct(null);
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
  const handleCartToggle = () => setCartVisible(!cartVisible);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg" className="ps-3">
          <Navbar.Brand as={Link} to="/">Gallery e-shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <Form className="d-flex ms-auto me-4">
              <FormControl
                type="search"
                placeholder="Search item"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success">Search</Button>
              <Button variant="outline-info" className="ms-2 d-flex align-items-center" onClick={handleCartToggle}>
                Cart
                <span className="badge text-dark bg-info ms-2">{cartItems.length}</span>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={
              <Container className="my-4">
                <Row className="mb-4">
                  <Col xs="auto">
                    <div className="d-flex align-items-center">
                      <span className="me-2">Sort:</span>
                      <Form.Select
                        aria-label="Sort items"
                        className="form-select-sm"
                        style={{ width: '150px' }}
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="title-asc">Title: A to Z</option>
                        <option value="title-desc">Title: Z to A</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  {Object.keys(filteredProducts).map((key) => (
                    <Col key={key} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <ProductCard
                        productKey={key}
                        product={filteredProducts[key]}
                        handleEditProduct={() => handleEditProduct(key)}
                        handleRemoveProduct={() => handleRemoveProduct(key, filteredProducts[key].title)}
                        authenticated={authenticated}
                        addToCart={addToCart}
                      />
                    </Col>
                  ))}
                  {authenticated && (
                    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <Button
                        variant="outline-success"
                        className="w-100 h-100 d-flex align-items-center justify-content-center"
                        onClick={handleOpenEditor}
                        style={{ height: '100%' }}
                      >
                        Add New Item
                      </Button>
                    </Col>
                  )}
                </Row>
              </Container>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <Cart
          show={cartVisible}
          handleClose={handleCartToggle}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />

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
          {!authenticated && (
            <div className="text-center">
              <Button variant="secondary" className="mb-2" onClick={handleShowAuthModal}>
                Admin Login
              </Button>
            </div>
          )}
        </footer>
      </div>
    </Router>
  );
}

export default App;
