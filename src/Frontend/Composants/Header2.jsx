// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "react-use-cart"; // Importez useCart pour accéder au contexte du panier
import "../CSS/Header.css";

const Header2 = () => {
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  const { totalItems } = useCart(); // Accédez au nombre total d'articles dans le panier

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo.token) {
      setIsAuthenticated(true);
      setUserData(userInfo);
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  const toggleAuthMenu = () => {
    setAuthMenuOpen(!authMenuOpen);
  };

  const handleLogin = () => {
    setAuthMenuOpen(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setAuthMenuOpen(false);
    navigate("/register");
  };

  return (
    <header className="header">
      <nav className="nav-bar">
        <div className="logo">
          <Link to="/">
            <img src="../../../Asset/logoblanc.webp" alt="logo" width="40%" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/products">Produits</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart className="cart-icon" />
              Panier
              {totalItems > 0 && ( // Affiche le nombre d'articles uniquement si > 0
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
          </li>
          <li className="auth-container">
            <div onClick={toggleAuthMenu} className="auth-menu-trigger">
              <FaUser className="auth-icon" />
              {isAuthenticated ? userData.name : "Compte"}
            </div>
            {authMenuOpen && (
              <div className="auth-dropdown">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="auth-item"
                      onClick={() => setAuthMenuOpen(false)}
                    >
                      Mon profil
                    </Link>
                  </>
                ) : (
                  <>
                    <button onClick={handleLogin} className="auth-item">
                      Se connecter
                    </button>
                    <button onClick={handleRegister} className="auth-item">
                      S'inscrire
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header2;
