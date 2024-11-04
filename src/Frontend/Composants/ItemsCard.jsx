// src/Frontend/Composants/ItemsCard.jsx
import React from "react";
import { useCart } from "react-use-cart";

const ItemsCard = ({ img, title, price, desc, item }) => {
  const { addItem } = useCart();

  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <img className="card-img-top img-fluid" src={img} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h5 className="card-text">{price} €</h5>
          <p className="card-text">{desc}</p>
          <button
            className="btn btn-success"
            onClick={() => addItem({ id: item.id, img, title, price, desc, quantity: 1 })}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
