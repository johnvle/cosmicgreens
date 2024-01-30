import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartContextProvider = (props) => {
  // cartItems in the shape of an array of objects
  const [cartItems, setCartItems] = useState({});

  // WORK IN PROGRESS 
  const addToCart = (item) => {

    if (cartItems[item]) {
      // If the item is already in the cart, update the quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[item].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems((prevItems) => [
        ...prevItems,
        { menuItem: item, quantity: 1 },
      ]);
    }
  };
  console.log(cartItems);
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.menuItem.id !== itemId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCart, CartContext };
