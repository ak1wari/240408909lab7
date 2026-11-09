import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../api/productsApi.js";
import { useFetch } from "../hooks/useFetch.js";
import { useCartStore } from "../store/cartStore.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const loadProduct = useCallback((signal) => fetchProduct(id, signal), [id]);
  const { loading, error, data: product } = useFetch(loadProduct, [loadProduct]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error">Product not found. ({error})</p>;
  if (!product) return <p className="error">Product not found.</p>;

  return (
    <section className="detail">
      <img src={product.thumbnail} alt={product.title} />
      <div>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>${product.price.toFixed(2)}</h2>
        <button className="primary-button" onClick={() => addItem(product)}>
          Add to cart
        </button>
        <button className="secondary-button" onClick={() => navigate("/products")}>
          Back to products
        </button>
      </div>
    </section>
  );
}