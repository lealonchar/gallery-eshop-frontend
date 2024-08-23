import { useEffect, useState } from "react";
import { app } from "./config/firebaseConfig";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import ProductEditorModal from "./components/ProductEditorModal";
import ProductCard from "./components/ProductCard";

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

      <button onClick={() => handleEditProduct(null)} >Create</button>

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
