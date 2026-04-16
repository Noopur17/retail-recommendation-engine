import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function getCategoryGradient(category = "") {
  const key = category.toLowerCase();

  if (key.includes("grocery") || key.includes("dairy") || key.includes("food")) {
    return "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)";
  }
  if (key.includes("electronics")) {
    return "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)";
  }
  if (key.includes("clothing") || key.includes("fashion") || key.includes("apparel")) {
    return "linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)";
  }
  if (key.includes("home") || key.includes("kitchen")) {
    return "linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)";
  }
  if (key.includes("beauty")) {
    return "linear-gradient(135deg, #fecdd3 0%, #fda4af 100%)";
  }

  return "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)";
}

function getCategoryIcon(category = "") {
  const key = category.toLowerCase();

  if (key.includes("grocery") || key.includes("dairy") || key.includes("food")) return "🥛";
  if (key.includes("electronics")) return "📱";
  if (key.includes("clothing") || key.includes("fashion") || key.includes("apparel")) return "👕";
  if (key.includes("home") || key.includes("kitchen")) return "🏠";
  if (key.includes("beauty")) return "🧴";
  return "🛍️";
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [topK, setTopK] = useState("5");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) throw new Error("Failed to load products");

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchRecommendations = async (product) => {
    setSelectedProduct(product);
    setLoadingRecommendations(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch(
        `${API_BASE}/recommendations/${product.product_id}?top_k=${topK}`
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch recommendations");
      }

      const data = await response.json();
      setResults(data);

      setTimeout(() => {
        document.getElementById("recommendations-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ).sort();
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const haystack = [
        item.product_name,
        item.brand,
        item.category,
        item.sub_category,
        item.tags,
        item.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchTerm.trim() || haystack.includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  const renderImageArea = (item) => {
    const imageUrl = item.image_url || item.image;

    if (imageUrl) {
      return <img src={imageUrl} alt={item.product_name || "Product"} className="image" />;
    }

    return (
      <div
        className="image-fallback"
        style={{ background: getCategoryGradient(item.category) }}
      >
        <div className="image-fallback-icon">{getCategoryIcon(item.category)}</div>
        <div className="image-fallback-label">{item.category || "Product"}</div>
      </div>
    );
  };

  return (
    <div className="page">
      <header className="navbar">
        <a href="#top" className="brand">
          RetailRec
        </a>

        <nav className="nav">
          <a href="#catalog">Catalog</a>
          <a href="#recommendations-section">Recommendations</a>
        </nav>
      </header>

      <main className="container" id="top">
        <section className="hero">
          <div className="hero-left hero-left-compact">
            <div className="hero-badge">AI Retail Discovery</div>
            <h1>Discover products faster with smarter recommendations</h1>
            <p>
              Browse the catalog, select a product, and get ranked recommendations
              powered by similarity, category alignment, and retail-aware scoring.
            </p>

            <div className="hero-mini-stats">
              <div className="mini-stat">
                <span className="mini-stat-label">Catalog</span>
                <strong>{products.length} products</strong>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-label">Filters</span>
                <strong>Category + Search</strong>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-label">Ranking</span>
                <strong>Smart scoring</strong>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="settings-card settings-card-premium">
              <div className="settings-header">
                <div>
                  <h2>Recommendation Settings</h2>
                  <p>Adjust result count and review the active product.</p>
                </div>
              </div>

              <label className="label">Top Results</label>
              <input
                className="input"
                type="number"
                value={topK}
                onChange={(e) => setTopK(e.target.value)}
              />

              <div className="selected-box selected-box-premium">
                <div className="selected-title">Selected Product</div>

                {selectedProduct ? (
                  <>
                    <div className="selected-name">{selectedProduct.product_name}</div>
                    <div className="selected-meta">
                      <span>{selectedProduct.brand || "Unknown Brand"}</span>
                      <span>{selectedProduct.category || "Category"}</span>
                      <span>
                        $
                        {selectedProduct.price !== undefined
                          ? selectedProduct.price
                          : "N/A"}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="selected-name">No product selected</div>
                    <div className="selected-helper">
                      Choose a product card from the catalog below to generate recommendations.
                    </div>
                  </>
                )}
              </div>

              <a href="#catalog" className="hero-secondary-link">
                Browse Catalog
              </a>
            </div>
          </div>
        </section>

        {error && <div className="alert error">{error}</div>}

        <section id="catalog" className="section-header">
          <div>
            <h2>Product Catalog</h2>
            <p>Browse products visually and click any card to see recommendations.</p>
          </div>
        </section>

        <section className="catalog-toolbar">
          <div className="search-box">
            <input
              className="input"
              type="text"
              placeholder="Search by product, brand, category, or tags"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="chip-row">
            {categories.map((category) => (
              <button
                key={category}
                className={`chip ${activeCategory === category ? "chip-active" : ""}`}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {loadingProducts ? (
          <div className="empty-state">Loading products...</div>
        ) : (
          <section className="grid">
            {filteredProducts.map((item) => (
              <article
                key={item.product_id}
                className={`card product-card ${
                  selectedProduct?.product_id === item.product_id ? "selected" : ""
                }`}
                onClick={() => fetchRecommendations(item)}
              >
                <div className="image-wrap">{renderImageArea(item)}</div>

                <div className="card-body">
                  <div className="tags">
                    <span className="tag">{item.category || "Category"}</span>
                    <span className="tag muted">{item.sub_category || "Sub-category"}</span>
                  </div>

                  <h3 className="product-title">
                    {item.product_name || `Product ${item.product_id}`}
                  </h3>

                  <p className="brand-name">{item.brand || "Unknown Brand"}</p>

                  <div className="price-row">
                    <div className="price">
                      ${item.price !== undefined ? item.price : "N/A"}
                    </div>
                    <div className="stock">{item.stock_status || "In Stock"}</div>
                  </div>

                  <button className="ghost-btn" type="button">
                    View Recommendations
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        <section
          id="recommendations-section"
          className="section-header recommendations-header"
        >
          <div>
            <h2>Recommended Products</h2>
            <p>
              {selectedProduct
                ? `Recommendations for ${selectedProduct.product_name}`
                : "Select a product to view recommendations"}
            </p>
          </div>

          {results && <div className="badge-box">Top {results.top_k}</div>}
        </section>

        {loadingRecommendations && (
          <div className="empty-state">Loading recommendations...</div>
        )}

        {!loadingRecommendations && results && (
          <section className="grid">
            {results.recommendations.map((item) => (
              <article key={item.product_id} className="card product-card">
                <div className="image-wrap">{renderImageArea(item)}</div>

                <div className="card-body">
                  <div className="tags">
                    <span className="tag">{item.category || "Category"}</span>
                    <span className="tag muted">{item.sub_category || "Sub-category"}</span>
                  </div>

                  <h3 className="product-title">
                    {item.product_name || `Product ${item.product_id}`}
                  </h3>

                  <p className="brand-name">{item.brand || "Unknown Brand"}</p>

                  {item.description && (
                    <p className="description">{item.description}</p>
                  )}

                  <div className="price-row">
                    <div className="price">
                      ${item.price !== undefined ? item.price : "N/A"}
                    </div>
                    <div className="stock">{item.stock_status || "In Stock"}</div>
                  </div>

                  <div className="metrics">
                    <div className="metric">
                      <span>Rating</span>
                      <strong>{item.rating ?? "N/A"}</strong>
                    </div>
                    <div className="metric">
                      <span>Reviews</span>
                      <strong>{item.review_count ?? "N/A"}</strong>
                    </div>
                  </div>

                  <div className="scores">
                    <div>
                      <span>Similarity</span>
                      <strong>{item.similarity_score ?? "N/A"}</strong>
                    </div>
                    <div>
                      <span>Final</span>
                      <strong>{item.final_score ?? "N/A"}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}