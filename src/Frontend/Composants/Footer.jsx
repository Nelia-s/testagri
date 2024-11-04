import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Vente d'Invendus Agricoles. Tous droits réservés.</p>
        
        <div className="social-networks">
          <h4>Nos réseaux</h4>
          <ul>
            <li><a href="/login">Connexion</a></li>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;