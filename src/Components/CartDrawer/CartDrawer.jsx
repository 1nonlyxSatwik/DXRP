import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartOpen, setCartOpen, cartItems, products, removeFromCart, getTotalCartAmount, getTotalCartItems, clearCart } = useContext(ShopContext);

  if (!cartOpen) return null;

  const totalAmount = getTotalCartAmount();
  const totalItems = getTotalCartItems();

  const handleCheckout = () => {
    clearCart();
    setCartOpen(false);
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>bag ({totalItems})</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        
        <div className="cart-body">
          {products.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div className="cart-qty">
                      <span>qty: {cartItems[item.id]}</span>
                      <button onClick={() => removeFromCart(item.id)}>remove</button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        
        <div className="cart-footer">
          <div className="cart-total">
            <span>total</span>
            <span>${totalAmount}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
