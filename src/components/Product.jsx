import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";

const ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { image, pname, price, id, stock } = data;

  const  urlImage = 'http://localhost:8000/storage/uploadedFiles/'+image;
  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCart(dispatch, product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3500);
  };

  return (

    <div className="product">
      <div className="product-image">
        <img src={urlImage} alt={pname} />
      </div>
      <h4 className="product-name">{pname}</h4>
      <p className="product-price">{price}</p>
      <div className="product-action">
        <button
          className={!isAdded ? "" : "added"}
          type="button"
          onClick={handleAddToCart}
        >
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
