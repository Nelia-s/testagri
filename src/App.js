import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Frontend/Composants/Home.jsx";
import Login from "./Frontend/Composants/Login.jsx";
import Register from "./Frontend/Composants/Register.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      {/*<Route path="/" element={<Home />} /> {/* Page d'accueil *
        <Route path="/about" element={<AboutUs />} />
         <Route path="/cart" element={<Cart />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> {/* Connexion}
         {Inscription}
        <Route path="/profile" element={<Profile />} /> {Profil}
        <Route path="/success" element={<Success />} /> {Succès du paiement}
        <Route path="/cancel" element={<Cancel />} /> {Annulation du paiement }
        <Route path="/payment" element={<PaymentPage />} /> {Paiement}
        <Route path="/categories" element={<ProductCategories />} /> {Catégories de produits/}*/}

    </div>
  );
}

export default App;
