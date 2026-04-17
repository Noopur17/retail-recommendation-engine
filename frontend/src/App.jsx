import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const getRecommendations = async (product) => {
    setSelectedProduct(product);

    const res = await fetch(
      `http://127.0.0.1:8000/recommendations/${product.product_id}`
    );
    const data = await res.json();

    setRecommendations(data.products || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header">
        <h1>RetailRec</h1>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="nav">
          <span>Deals</span>
          <span>Electronics</span>
          <span>Home</span>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      {selectedProduct && (
        <div className="recommendation-section">
          <h2>Recommended for you</h2>
          <p>Based on: {selectedProduct.product_name}</p>

          <div className="grid">
            {recommendations.map((p) => (
              <ProductCard key={p.product_id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <div className="product-section">
        <h2>Shop products</h2>

        <div className="grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.product_id}
              product={p}
              onClick={() => getRecommendations(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={getImage(product.product_name)} />

      <div className="card-body">
        <p className="brand">{product.brand}</p>
        <h3>{product.product_name}</h3>

        <div className="price-row">
          <span className="price">${product.price}</span>
          <span className="rating">⭐ {product.rating}</span>
        </div>

        <button>View</button>
      </div>
    </div>
  );
}

/* SIMPLE IMAGE MAPPING */
function getImage(name) {
  const map = {
    "Vacuum Cleaner":
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    "Blender Mixer":
      "https://images.unsplash.com/photo-1577801593810-2c5f3b84c8e0",
    "Yoga Mat":
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
    "Bluetooth Wireless Headphones":
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b",
  };

  return map[name] || "https://via.placeholder.com/300";
}

export default App;