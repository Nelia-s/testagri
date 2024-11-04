const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { email, nom } = req.body;

  // Configurez le transporteur d'e-mails
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Utilise un service d'e-mail comme Gmail
    auth: {
      user: 'votre.email@gmail.com', // Remplacez par votre e-mail
      pass: 'votre_mot_de_passe', // Remplacez par votre mot de passe
    },
  });

  // Configuration de l'e-mail
  let mailOptions = {
    from: 'votre.email@gmail.com', // Remplacez par votre e-mail
    to: email, // L'e-mail de l'utilisateur récupéré du formulaire
    subject: 'Bienvenue sur AgriRescue !',
    text: `Bonjour ${nom},\n\nMerci de vous être inscrit sur notre plateforme AgriRescue. Nous sommes ravis de vous accueillir !\n\nCordialement,\nL'équipe AgriRescue`,
  };

  // Envoi de l'e-mail
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès !' });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
});

app.listen(5001, () => {
  console.log('Le serveur est démarré sur le port 5001');
});