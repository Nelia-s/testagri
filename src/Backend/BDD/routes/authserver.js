// routes/authserver.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const router = express.Router();

// Route pour se connecter
router.post('/login', async (req, res) => {
    const { utilisateur, motDePasse } = req.body;

    try {
        // Trouver l'utilisateur par nom d'utilisateur
        const user = await User.findOne({ utilisateur });
        if (!user) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!isMatch) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        // Authentification réussie
        req.session.userId = user._id; // Stocker l'identifiant utilisateur dans la session
        res.status(200).json({ message: 'Connexion réussie.', user });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});

module.exports = router; // Exporter le routeur
