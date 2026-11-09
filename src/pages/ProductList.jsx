import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/productsApi.js";
import { useFetch } from "../hooks/useFetch.js";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const productsRequest = useCallback((signal) => fetchProducts(signal), []);
  const { loading, error, data: products } = useFetch(productsRequest, []);

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const categories = useMemo(() =>
    products ? [...new Set(products.map((product) => product.category))].sort() : [],
  [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) &&
      (!category || product.category === category)
    );
  }, [products, query, category]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">Could not load products: {error}</p>;

  return (
    <section>
      <h1>Products</h1>
      <div className="filters">
        <input
          aria-label="Search products"
          placeholder="Search by title"
          value={query}
          onChange={(event) => updateFilter("q", event.target.value)}
        />
        <select aria-label="Filter by category" value={category}
          onChange={(event) => updateFilter("category", event.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      {filteredProducts.length === 0
        ? <p>No products match your filters.</p>
        : <div className="product-grid">
            {filteredProducts.map((product) =>
              <ProductCard key={product.id} product={product} />
            )}
          </div>}
    </section>
  );
}