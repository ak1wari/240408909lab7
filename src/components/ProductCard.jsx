import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <div className="product-card-body">
        <h3>{product.title}</h3>
        <p>{product.category}</p>
        <strong>${product.price.toFixed(2)}</strong>
        <Link to={`/products/${product.id}`}>View details</Link>
      </div>
    </article>
  );
}