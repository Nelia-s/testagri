import React, { useState } from "react";
import "../CSS/Register.css";
import Header from "./Header"; // Assurez-vous que ce chemin est correct

const FormulaireConnexion = () => {
  // États pour les champs de formulaire
  const [utilisateur, setUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher les messages d'erreur ou de succès

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = {
      utilisateur: utilisateur,
      motDePasse: motDePasse,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Connexion réussie !");
        // Redirection ou mise à jour de l'état utilisateur ici si nécessaire
      } else {
        setMessage("Erreur: " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    <div>
      <Header />
      <form className="FormRegister" onSubmit={handleSubmit}>
        <h2 className="Registerh2">Se connecter</h2>
        <div>
          <label htmlFor="utilisateur">Nom d'utilisateur:</label>
          <input
            type="text"
            id="utilisateur"
            value={utilisateur}
            onChange={(e) => setUtilisateur(e.target.value)}
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>

        <div>
          <label htmlFor="motDePasse">Mot de passe:</label>
          <input
            type="password"
            id="motDePasse"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <button type="submit">Se connecter</button>
        {message && <p>{message}</p>} {/* Affiche le message d'erreur ou de succès */}
      </form>
    </div>
  );
};

export default FormulaireConnexion;
