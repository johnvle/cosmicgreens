// convert pennies to dollars and format
export const handlePriceConversion = (priceInCents) => {
  return (priceInCents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// menu item utils, operations on cartItem

export const  isItemInCart = (cartItems, menuItemID) => {
  return cartItems.some(
    (item) => item.menuItem.id === menuItemID && item.quantity > 0
  );
}
export const getCartItemQuantity = (cartItems, menuItemID) => {
  const cartItem = cartItems.find((item) => item.menuItem.id === menuItemID);
  return cartItem ? cartItem.quantity : 0;
}