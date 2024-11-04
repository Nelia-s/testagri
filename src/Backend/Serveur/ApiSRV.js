const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 5000;

// Route pour vérifier le SIRET
app.get('/api/siret/:siret', async (req, res) => {
  const siret = req.params.siret;
  const apiUrl = `https://api.insee.fr/entreprises/sirene/V3.11/siret/${siret}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.SIRENE_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    // Vérifiez si la réponse est au format JSON
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(response.status).json({ message: 'Numéro de SIRET non valide ou erreur serveur.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion à l\'API Sirene' });
  }
});

app.listen(port, () => {
  console.log(`Serveur proxy écoute sur http://localhost:${port}`);
});
