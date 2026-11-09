import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleQuantityChange(id, value) {
    const quantity = Number(value);

    if (Number.isInteger(quantity) && quantity >= 1) {
      setQuantity(id, quantity);
    }
  }

  if (items.length === 0) {
    return <section><h1>Your cart</h1><p>Your cart is empty.</p>
      <Link to="/products">Browse products</Link></section>;
  }

  return (
    <section>
      <h1>Your cart</h1>
      <div className="cart-list">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <div><strong>{item.title}</strong><p>${item.price.toFixed(2)} each</p></div>
            <label>Quantity
              <input type="number" min="1" step="1" value={item.quantity}
                onChange={(event) => handleQuantityChange(item.id, event.target.value)} />
            </label>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            <button className="link-button" onClick={() => removeItem(item.id)}>Remove</button>
          </article>
        ))}
      </div>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button className="secondary-button" onClick={clear}>Clear cart</button>
    </section>
  );
}


