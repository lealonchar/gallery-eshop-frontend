import { useEffect, useState } from "react";
import { app } from "./config/firebaseConfig";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import ProductEditorModal from "./components/ProductEditorModal";
import ProductCard from "./components/ProductCard";
import { Button, Navbar, Nav, Form, FormControl,Container, Row, Col } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [indexOfEditProduct, setIndexOfEditProduct] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    const database = getDatabase(app);
    const productsRef = ref(database, "products");
    const fetchData = () => {
      onValue(productsRef, (snapshot) => {
        const products = snapshot.val();
        setProducts(products);
      });
    };

    fetchData();
  }, []);

  const handleEditProduct = (key) => {
    setIndexOfEditProduct(key);
    setEditorOpen(true);
  }

  const handleCloseModal = () => {
    setIndexOfEditProduct(null);
    setEditorOpen(false);
  }

  const handleRemoveProduct = async (key) => {
    const database = getDatabase(app);
    const productsRef = ref(database, `products/${key}`);
    try {
      await remove(productsRef);
    } catch (error) {
      alert('Error removing product:', error);
    }
  }

  return (
    <>
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
      <div>

      </div>


      <Button variant="success"  className="m-3" onClick={() => handleEditProduct(null)} >Add new item</Button>


      <div className="main">
        {/* Your main content goes here */}
      </div>
      <div className="bottom-banner position-fixed bottom-0 start-0 end-0 bg-success text-light text-center py-3">
      <Container>
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
    </div>
      <div>
        {Object.keys(products).map((key) => {
          return (
            <ProductCard key={key}
              productKey={key}
              product={products[key]}
              handleEditProduct={() => handleEditProduct(key)}
              handleRemoveProduct={() => handleRemoveProduct(key)}
            />
          );
        })}
      </div>

      <ProductEditorModal editorOpen={editorOpen}
        product={products[indexOfEditProduct]}
        productKey={indexOfEditProduct}
        handleCloseModal={handleCloseModal}
      />
    </>
  )
}

export default App
