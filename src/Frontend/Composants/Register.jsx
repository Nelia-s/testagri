import React, { useState } from "react";
import "../CSS/Register.css";
import Header from "./Header"; // Assure-toi que ce chemin est correct

const FormulaireInscription = () => {
  // États pour chaque champ de formulaire
  const [role, setRole] = useState("Client");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [utilisateur, setUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [numDeRue, setNumDeRue] = useState("");
  const [nomDeRue, setNomDeRue] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [siret, setSiret] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [siretValid, setSiretValid] = useState(null); // Null initialement, true si validé, false si invalide
  const [siretLoading, setSiretLoading] = useState(false); // Loader pendant la vérification
  const [siretError, setSiretError] = useState(""); // Message d'erreur en cas de problème

  // États pour les informations récupérées par l'API SIRET
  const [denominationUniteLegale, setDenominationUniteLegale] = useState("");
  const [numeroVoieEtablissement, setNumeroVoieEtablissement] = useState("");
  const [typeVoieEtablissement, setTypeVoieEtablissement] = useState("");
  const [libelleVoieEtablissement, setLibelleVoieEtablissement] = useState("");
  const [complementAdresseEtablissement, setComplementAdresseEtablissement] =
    useState("");
  const [codePostalEtablissement, setCodePostalEtablissement] = useState("");
  const [libelleCommuneEtablissement, setLibelleCommuneEtablissement] =
    useState("");

  // Gestion des changements de champ
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSiretChange = (e) => {
    setSiret(e.target.value);
    setSiretValid(null); // Réinitialiser la validation si le numéro change
  };

  const verifierSiret = async () => {
    if (siret.length === 14) {
      setSiretLoading(true); // Affiche un indicateur de chargement
      setSiretError(""); // Réinitialise le message d'erreur

      try {
        const response = await fetch(
          `https://api.insee.fr/entreprises/sirene/V3.11/siret/${siret}`,
          {
            headers: {
              Authorization: `Bearer cb33e579-7530-3631-8132-d94d3be28c95`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDenominationUniteLegale(
            data.etablissement.uniteLegale.denominationUniteLegale
          );
          setNumeroVoieEtablissement(
            data.etablissement.adresseEtablissement.numeroVoieEtablissement
          );
          setTypeVoieEtablissement(
            data.etablissement.adresseEtablissement.typeVoieEtablissement
          );
          setLibelleVoieEtablissement(
            data.etablissement.adresseEtablissement.libelleVoieEtablissement
          );
          setComplementAdresseEtablissement(
            data.etablissement.adresseEtablissement
              .complementAdresseEtablissement
          );
          setCodePostalEtablissement(
            data.etablissement.adresseEtablissement.codePostalEtablissement
          );
          setLibelleCommuneEtablissement(
            data.etablissement.adresseEtablissement.libelleCommuneEtablissement
          );

          setSiretValid(true); // Le SIRET est valide
        } else {
          setSiretValid(false); // Réponse non OK
          setSiretError("Erreur lors de la vérification du numéro SIRET.");
        }
      } catch (error) {
        setSiretValid(false);
        setSiretError("Erreur de connexion à l'API Sirene.");
      } finally {
        setSiretLoading(false); // Masquer l'indicateur de chargement
      }
    } else {
      setSiretValid(false);
      setSiretError("Le numéro de SIRET doit contenir 14 chiffres.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Vous devez accepter les termes d'utilisation pour continuer.");
      return;
    }

    if (role === "Agriculteur" && siretValid !== true) {
      alert("Veuillez entrer un numéro de SIRET valide avant de continuer.");
      return;
    }

    const formData = {
      nom: nom,
      prenom: prenom,
      email: email,
      utilisateur: utilisateur,
      motDePasse: motDePasse,
      numDeRue: numDeRue,
      nomDeRue: nomDeRue,
      codePostal: codePostal,
      ville: ville,
      role: role,
      ...(role === "Agriculteur" && { siret: siret }),
    };

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert("Erreur: " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  return (
    <div>
      <Header /> {/* Ajout du composant Header ici */}
      <form className="FormRegister" onSubmit={handleSubmit}>
        <h2 className="Registerh2">S'inscrire</h2>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div>
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Entrez votre prénom"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div>
          <label htmlFor="utilisateur">Nom d'utilisateur:</label>
          <input
            type="text"
            id="utilisateur"
            value={utilisateur}
            onChange={(e) => setUtilisateur(e.target.value)}
            placeholder="Entrez un nom d'utilisateur"
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
            placeholder="Entrez un mot de passe"
            required
          />
        </div>

        <div>
          <label htmlFor="NumerodeRue">Numéro de Rue:</label>
          <input
            type="text"
            id="numDeRue"
            value={numDeRue}
            onChange={(e) => setNumDeRue(e.target.value)}
            placeholder="Num de Rue"
            required
          />
        </div>

        <div>
          <label htmlFor="NomdeRue">Nom de Rue:</label>
          <input
            type="text"
            id="nomDeRue"
            value={nomDeRue}
            onChange={(e) => setNomDeRue(e.target.value)}
            placeholder="Nom de Rue"
            required
          />
        </div>

        <div>
          <label htmlFor="Code Postal">Code Postal:</label>
          <input
            type="text"
            id="codePostal"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            placeholder="Code Postal"
            required
          />
        </div>

        <div>
          <label htmlFor="Ville">Ville:</label>
          <input
            type="text"
            id="ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            placeholder="Ville"
            required
          />
        </div>

        <div>
          <label htmlFor="role">Rôle:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="Client">Client</option>
            <option value="Agriculteur">Agriculteur</option>
          </select>
        </div>

        {/* Champ SIRET pour les agriculteurs */}
        {role === "Agriculteur" && (
          <div>
            <label htmlFor="siret">Numéro de SIRET:</label>
            <input
              type="text"
              id="siret"
              value={siret}
              onChange={handleSiretChange}
              placeholder="Entrez votre numéro de SIRET"
            />
            <button
              type="button"
              onClick={verifierSiret}
              disabled={siretLoading}
            >
              {siretLoading ? "Vérification..." : "Vérifier"}
            </button>
            {!siretValid && siretError && (
              <p style={{ color: "red" }}>Le numéro de siret est invalide.</p>
            )}
          </div>
        )}

        {/* Affichage des informations SIRET */}
        {/* Affichage des informations SIRET */}
        {siretValid && (
          <div className="siret-info">
            <h3>Informations de l'établissement</h3>
            <p>
              <strong>Dénomination:</strong> {denominationUniteLegale || "N/A"}
            </p>
            <p>
              <strong>Numéro de voie:</strong>{" "}
              {numeroVoieEtablissement || "N/A"}
            </p>
            <p>
              <strong>Type de voie:</strong> {typeVoieEtablissement || "N/A"}
            </p>
            <p>
              <strong>Nom de voie:</strong> {libelleVoieEtablissement || "N/A"}
            </p>
            <p>
              <strong>Complément d'adresse:</strong>{" "}
              {complementAdresseEtablissement || "N/A"}
            </p>
            <p>
              <strong>Code postal:</strong> {codePostalEtablissement || "N/A"}
            </p>
            <p className="commune">
              <strong>Commune:</strong> {libelleCommuneEtablissement || "N/A"}
            </p>
          </div>
        )}

        <div>
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            J'accepte les termes et conditions
          </label>
        </div>

        <button
          type="submit"
          disabled={
            !termsAccepted || (role === "Agriculteur" && siretValid !== true)
          }
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default FormulaireInscription;
