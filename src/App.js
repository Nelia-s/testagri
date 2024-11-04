import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Frontend/Composants/Home.jsx";
import Login from "./Frontend/Composants/Login.jsx";
import Register from "./Frontend/Composants/Register.jsx";
import Cart from "./Frontend/Composants/Cart.jsx";
import ProductsListing from "./Frontend/Composants/ProductsListing.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/testagri" element={<Home />} />
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsListing />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
