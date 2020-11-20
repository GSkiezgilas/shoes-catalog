import React, { useState, useEffect } from 'react';
import ProductCard from "./Product";
import { PRODUCTS } from '../data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Catalog.scss';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('unsorted');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);
  
  useEffect(() => {
    setSearchedProducts([...filteredProducts].filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, filteredProducts])
  
  useEffect(() => {
    const sortArray = type => {
      const types = {
        unsorted: 'unsorted',
        brand: 'brand',
        title: 'title',
        price: ['price', 'finalPrice']
      };
      const sortProperty = types[type];
      let sortedArray;
      
      if (type === 'brand' || type === 'title') {
        sortedArray = [...products].sort((a, b) => {
          if (a[sortProperty] < b[sortProperty]) {
            return -1;
          } else if (a[sortProperty] > b[sortProperty]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (type === 'price') {
        sortedArray = [...products].sort((a, b) => a[sortProperty[0]][sortProperty[1]] - b[sortProperty[0]][sortProperty[1]]);
      } else {
        sortedArray = [...products];
      }
      setFilteredProducts(sortedArray);
    }
    
    sortArray(sortType);
    }, [sortType, products])

  const selectProduct = (prodObj) => setSelectedProduct(prodObj);
  const unselectProduct = () => setSelectedProduct(null);
  
  const renderCards = searchedProducts.map((product) => {
    return (
      <ProductCard 
        key={product.id} 
        product={product} 
        handleClick={selectProduct}
        selectedProduct={selectedProduct}
      />
    );
  });

  const renderSelectedCard = selectedProduct => {
      return (
        selectedProduct && (
          <>
            <h3 className="selected-product__title">{selectedProduct.title}</h3>
            <ul className="selected-product_prevent-shrink">
              <ProductCard product={selectedProduct}
                handleClick={unselectProduct}
              />
            </ul>
          </>
        )
      )
  }

  return(
    <div className="catalog">
      <h1 className="catalog__title">Men's shoes</h1>
      <div className="search-sort-wrapper">
        <div className="search-bar">
          <label htmlFor="search" className="search-icon">{searchIcon}</label>
          <input type="text" placeholder="Search" id="search" className="search-input" onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
        <select className="sort" id="sort" name="sort" value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="unsorted" disabled hidden>Sort by</option>
          <option value="brand">Brand</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </div>
      <ul className="product-grid">
        {renderCards}
        {searchedProducts.length === 0 
          && <li className="not-found-msg">
                No products were found with name <q><strong>{searchQuery}</strong></q>. Check spelling or try other name.
              </li>
        }
      </ul>
      <div className="selected-product__wrapper">
        {renderSelectedCard(selectedProduct)}
      </div>
    </div>
  )
}

export default Catalog;