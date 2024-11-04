// src/Frontend/Composants/Cart.jsx
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import Header2 from "./Header2";
import { useNavigate } from "react-router-dom";
import "../CSS/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    isEmpty,
    items,
    totalUniqueItems,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromoCode = () => {
    if (promoCode === "PROMO20") {
      setDiscount(0.2); // 20% de réduction
    } else {
      alert("Code promo invalide !");
    }
  };

  const finalTotal = cartTotal * (1 - discount);

  if (isEmpty)
    return (
      <div className="panier-vide">
        <Header2 />
        <h2 className="text">Votre panier est vide</h2>
        <button className="btn" onClick={() => navigate("/products")}>
          Faire mes achats
        </button>
      </div>
    );

  return (
    <section className="py-4 container">
      <Header2 />
      <div className="row justify-content-between">
        <div className="col-md-8">
          <h2 className="text-center">Panier</h2>
          <h5>Articles uniques : {totalUniqueItems}</h5>
          <h5>Nombre total d'articles : {totalItems}</h5>
          <table className="table table-light table-hover m-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.img}
                      style={{ height: "6rem" }}
                      alt={item.title}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price} €</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => removeItem(item.id)}
                    >
                      Retirer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <h4>Total : {cartTotal.toFixed(2)} €</h4>
            {discount > 0 && (
              <h5>Prix après remise : {finalTotal.toFixed(2)} €</h5>
            )}
          </div>
          <button className="btn btn-danger mt-3" onClick={() => emptyCart()}>
            Vider le panier
          </button>
        </div>
        <div className="col-md-4 text-center">
          <h3>Résumé de la commande</h3>
          <h4>Total : {cartTotal.toFixed(2)} €</h4>
          {discount > 0 && (
            <h5>Remise appliquée : -{(cartTotal * discount).toFixed(2)} €</h5>
          )}
          <div className="promo-code">
            <input
              type="text"
              placeholder="Entrez votre code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="form-control my-3"
            />
            <button onClick={handleApplyPromoCode} className="btn btn-primary">
              Appliquer
            </button>
          </div>
          <button className="btn btn-success btn-lg mt-3">Payer</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
