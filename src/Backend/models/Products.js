const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  prix: {
    type: Number,
    required: true,
    min: 0,
  },
  quantite_en_stock: {
    type: Number,
    required: true,
    min: 0,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  creer_par: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creer_a: {
    type: Date,
    default: Date.now,
  },
  update: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the 'updated_at' field automatically on save
productSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
