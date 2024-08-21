import { useEffect, useState } from "react";
import app from "./config/firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import ProductEditorModal from "./components/ProductEditorModal";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [indexOfEditProduct, setIndexOfEditProduct] = useState(-1);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    const database = getDatabase(app);
    const collectionRef = ref(database, "products");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const products = snapshot.val();
        setProducts(products);
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleEditProduct = (index) => {
    setIndexOfEditProduct(index);
    setEditorOpen(true);
  }

  const handleCloseModal = () => {
    setIndexOfEditProduct(-1);
    setEditorOpen(false);
  }

  return (
    <>
      {console.log(products)}

      <button onClick={() => handleEditProduct(-1)} >Create</button>

      <div>
        {products.map((product, index) => {
          return (
            <ProductCard key={index} product={product} handleEditProduct={() => handleEditProduct(index)} />
          );
        })}
      </div>

      <ProductEditorModal editorOpen={editorOpen} product={products[indexOfEditProduct]} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default App
