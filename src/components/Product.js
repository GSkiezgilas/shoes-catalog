import React from 'react';
import './Product.scss';

const Product = ({product, handleClick, selectedProduct}) => {
  let curencySymbol = "€";
  
  if (product.price.currency.toUpperCase() !== "EUR") curencySymbol = product.price.currency;
  
  const toggleActiveStyle = (id) => {
    if (selectedProduct !== undefined && selectedProduct !== null && id === selectedProduct.id) {
      return "product-card product-card_active";
    } else {
      return "product-card";
    }
  }

  return (
    <li className={toggleActiveStyle(product.id)} onClick={() => handleClick(product)} >
      <div className="product-card__image-wrapper">
        <img src={`images/${product.image}`} alt={`${product.title}`}/>
      </div>
      <div className="product-card__text-wrapper">
        <div className="product-card__brand">{product.brand}</div>
        <div className="product-card__title">{product.title}</div>
        <div className="product-card__price-wrapper">
          {!product.hasDiscount 
            ? <span></span>
            : <span className="product-card__regular-price">{product.price.regularPrice} {curencySymbol}</span>
          }
          <span className="product-card__final-price">{product.price.finalPrice} {curencySymbol}</span>
        </div>
      </div>
    </li>
  );
}

export default Product;