import React from "react";
import "../CSS/Categories.css";

// Composant représentant les 4 catégories
const FoodCategories = () => {
  return (
    <div className="Main">
      <div className="TitreDeProduits">
        <h2>Nos Produits</h2>
      </div>
      <div className="container">
        <div className="category">
          <img
            src="../../../Asset/Legumes.jpg"
            alt="Legumes"
            className="image"
            loading="lazy" // Lazy loading ici
          />
          <div className="title">Légume</div>
        </div>
        <div className="category">
          <img
            src="../../../Asset/Fruit.jpg"
            alt="Fruit"
            className="image"
            loading="lazy" // Lazy loading ici
          />
          <div className="title">Fruit</div>
        </div>
        <div className="category">
          <img
            src="../../../Asset/Laitier.jpg"
            alt="Produits laitiers"
            className="image"
            loading="lazy" // Lazy loading ici
          />
          <div className="title">Produits Laitiers</div>
        </div>
        <div className="category">
          <img
            src="../../../Asset/Autres.jpg"
            alt="Autre"
            className="image"
            loading="lazy" // Lazy loading ici
          />
          <div className="title">Autres</div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
