import React, { useContext } from 'react';
import Hero from '../Components/Hero/Hero';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import './Shop.css';

const Shop = () => {
  const { products } = useContext(ShopContext);

  const getCellClass = (idx) => {
    const mod = idx % 10;
    if (mod < 3) return 'cell-a';
    if (mod === 3) return 'cell-b-large';
    if (mod === 4) return 'cell-b-small';
    if (mod >= 5 && mod <= 7) return 'cell-a';
    if (mod === 8 || mod === 9) return 'cell-c';
    return 'cell-a';
  };

  return (
    <div className="shop-page">
      <Hero />
      <div className="product-grid">
        {products.map((item, idx) => (
          <div key={item.id} className={`grid-cell ${getCellClass(idx)}`}>
            <Item 
              id={item.id} 
              name={item.name} 
              image={item.image}
              imageHover={item.imageHover}
              price={item.price} 
              slug={item.slug}
            />
          </div>
        ))}
      </div>
      <div className="marquee">
        <div className="marquee-content">
          <span>DISRUPT. REDEFINE. PROGRESS.</span>
          <span>DISRUPT. REDEFINE. PROGRESS.</span>
          <span>DISRUPT. REDEFINE. PROGRESS.</span>
          <span>DISRUPT. REDEFINE. PROGRESS.</span>
        </div>
      </div>
    </div>
  );
};

export default Shop;
