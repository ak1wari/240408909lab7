import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCartStore } from "../store/cartStore.js";

export default function NavBar({ theme, setTheme }) {
  const { user, logOut } = useAuth();
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="navbar">
      <NavLink className="brand" to="/">ak1wari shop</NavLink>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({itemCount})</NavLink>
        {user ? (
          <span className="user-area">
            {user.username}
            <button className="link-button" onClick={logOut}>Logout</button>
          </span>
        ) : <NavLink to="/login">Login</NavLink>}
        <button className="theme-button" onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }>
          {theme === "light" ? "Dark" : "Light"} mode
        </button>
      </nav>
    </header>
  );
}
