import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { currency } from '../config';
import './Bag.css';

const Bag = () => {
  const { products, cartItems, removeFromCart, addToCart, getTotalCartAmount } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const isEmpty = totalAmount === 0;

  return (
    <div className="bag-page">
      <h1 className="bag-title">BAG</h1>
      
      {isEmpty ? (
        <div className="bag-empty">
          <p>your bag is empty.</p>
          <Link to="/" className="bag-return-link">Return to Drop</Link>
        </div>
      ) : (
        <div className="bag-content">
          <div className="bag-items">
            {products.map((item) => {
              if (cartItems[item.id] > 0) {
                return (
                  <div key={item.id} className="bag-item">
                    <img src={item.image} alt={item.name} className="bag-item-img" />
                    
                    <div className="bag-item-info">
                      <p className="bag-item-name">{item.name}</p>
                      <p className="bag-item-size">Size: M</p>
                      
                      <div className="bag-qty-controls">
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <span>{cartItems[item.id]}</span>
                        <button onClick={() => addToCart(item.id)}>+</button>
                      </div>
                    </div>
                    
                    <div className="bag-item-price-col">
                      <p className="bag-item-price">{currency}{item.price * cartItems[item.id]}</p>
                      <button className="bag-item-remove" onClick={() => {
                        // remove all quantities
                        for(let i=0; i<cartItems[item.id]; i++) removeFromCart(item.id);
                      }}>×</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          <div className="bag-summary">
            <div className="bag-subtotal">
              <span>Subtotal</span>
              <span>{currency}{totalAmount}</span>
            </div>
            <button className="bag-checkout-btn">CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bag;
