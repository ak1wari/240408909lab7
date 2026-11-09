import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function Layout({ theme, setTheme }) {
  return (
    <>
      <NavBar theme={theme} setTheme={setTheme} />
      <main className="container"><Outlet /></main>
      <footer className="footer">Assignment 7 · Online Shop</footer>
    </>
  );
}