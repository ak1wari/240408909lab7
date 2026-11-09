import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("240408909@biruni.edu.tr");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const destination = from ? `${from.pathname}${from.search || ""}${from.hash || ""}` : "/";

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await login(username, password);
      logIn(user);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-panel">
      <h1>Login</h1>
      <p>Demo password: <strong>demo123456</strong></p>
      <form onSubmit={handleSubmit}>
        <label>Student email
          <input type="email" autoComplete="username" value={username}
            onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label>Password
          <input type="password" autoComplete="current-password" value={password}
            onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </section>
  );
}



