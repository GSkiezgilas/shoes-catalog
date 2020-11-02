import React, { useState, useEffect } from 'react';
import ProductCard from "./Product";
import { PRODUCTS } from '../data/data';
import './Catalog.scss';


const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products])

  const renderCards = filteredProducts.map((product) => {
    return (
      <ProductCard key={product.id} product={product} />
    );
  });


  return(
    <div className="catalog">
      <h1 className="catalog__title">Category</h1>
      <div className="search-wrapper">
        <input type="text" placeholder="Search" className="search" onChange={(e) => setSearchQuery(e.target.value)}/>
        <select className="sort" id="sort" name="sort">
          <option value="" disabled selected hidden>Sort by</option>
          <option value="brand">Brand (A To Z)</option>
          {/* <option value="brand-desc">Brand (Z To A)</option> */}
          <option value="title">Title (A To Z)</option>
          {/* <option value="title-dsc">Title (Z To A)</option> */}
          <option value="price">Price (Low To High)</option>
          {/* <option value="price-desc">Price (High To Low)</option> */}
        </select>
      </div>
      <ul className="product-grid">
        {renderCards}
        {filteredProducts.length === 0 
          && <li className="not-found-msg">
                No products were found with name <q><strong>{searchQuery}</strong></q>. Check spelling or try other name.
              </li>
        }
      </ul>
      <div className="selected-product-wrapper">
        <h3>Selected product</h3>
        <div className="selected"></div>
      </div>
    </div>
  )
}

export default Catalog;