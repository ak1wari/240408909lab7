import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [theme, setTheme] = useLocalStorage("shop-theme", "light");

  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
}
