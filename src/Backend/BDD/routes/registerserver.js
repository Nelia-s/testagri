// routes/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User'); // Assurez-vous que ce chemin est correct

const router = express.Router();

// Route pour enregistrer un utilisateur
router.post('/', async (req, res) => {
    const { nom, prenom, email, utilisateur, motDePasse, numDeRue, nomDeRue, codePostal, ville, role, siret } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ utilisateur });
        if (existingUser) {
            return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris.' });
        }

        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Créer un nouvel utilisateur à partir des données du formulaire
        const newUser = new User({
            nom,
            prenom,
            email,
            utilisateur,
            motDePasse: hashedPassword,
            numDeRue,
            nomDeRue,
            codePostal,
            ville,
            role,
            siret: role === 'Agriculteur' ? siret : undefined
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
    }
});

module.exports = router; // Exporter le routeur
