import React from "react";
import Header from "./Header2";
import Footer from "./Footer";
import ItemsCard from "./ItemsCard";
import data from "./Data";
import { CartProvider } from "react-use-cart";
import '../CSS/Products.css'

const ProductsListing = () => {
  return (
    <>
      <Header />
      <CartProvider>
      <div className="MainProduits">
        <h1 className="text-center mt-3">Nos Produits</h1>
        <section className="py-4 container">
          <div className="row justify-content-center">
            {data.productData.map((item, index) => {
              return (
                <ItemsCard
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  item={item}
                  key={index}
                />
              );
            })}
          </div>
        </section>
      </div>
      </CartProvider>
      <Footer />
    </>
  );
};

export default ProductsListing;
