import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">WELCOME</p>
      <h1>Simple shopping, made easy.</h1>
      <p>Browse products, explore details, and add your favourites to the cart.</p>
      <Link className="primary-button" to="/products">Browse products</Link>
    </section>
  );
}