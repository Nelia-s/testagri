// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const registerRoute = require('./routes/registerserver'); // Importer le fichier d'enregistrement
const authRoute = require('./routes/authserver'); // Importer le fichier de connexion

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuration de la session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Pour le développement
}));

// Connexion à MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.log('Erreur MongoDB :', err));

// Utiliser les routes
app.use('/api/register', registerRoute); // Route pour l'enregistrement
app.use('/api/auth', authRoute); // Route pour l'authentification

// Lancer le serveur sur le port 5000
app.listen(5000, () => {
    console.log('Serveur lancé sur le port 5000');
});
