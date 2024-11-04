import React from "react";
import "../CSS/About.css"; // Assurez-vous d'inclure un fichier CSS pour le style

const AboutUs = () => {
  return (
    <div className="about-us-container" id="AboutUs">
      <h2>À propos de nous</h2>
      <div className="texte">
        <p>
          Bienvenue sur notre site ! Nous sommes une plateforme dédiée à la
          vente de produits agricoles de qualité, conçue pour réduire le
          gaspillage alimentaire. Notre mission est simple : offrir aux
          consommateurs des produits frais et locaux tout en soutenant les
          agriculteurs.
        </p>
        <p>
          Nous croyons fermement qu’il est possible de concilier consommation
          responsable et plaisir. En travaillant directement avec des
          producteurs, nous nous engageons à valoriser les surplus et à proposer
          des produits souvent négligés. Chaque achat contribue à une
          agriculture durable et à une lutte efficace contre le gaspillage.
        </p>
        </div>
        <p>
          Rejoignez-nous dans notre démarche ! Ensemble, faisons la différence
          pour un avenir où chaque produit compte.
        </p>
    </div>
  );
};

export default AboutUs;
