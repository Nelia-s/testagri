const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  utilisateur: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  numDeRue: { type: Number, required: true },
  nomDeRue: { type: String, required: true },
  codePostal: { type: Number, required: true },
  ville: { type: String, required: true },
  role: { type: String, required: true },
  siret: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
