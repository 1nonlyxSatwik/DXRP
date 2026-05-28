import React, { createContext, useState } from "react";
import { PRODUCTS } from "../constants/products";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products] = useState(PRODUCTS);
  const [cartOpen, setCartOpen] = useState(false);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = { 
    products, 
    getTotalCartItems, 
    cartItems, 
    addToCart, 
    removeFromCart, 
    getTotalCartAmount, 
    cartOpen, 
    setCartOpen, 
    clearCart 
  };
  
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
