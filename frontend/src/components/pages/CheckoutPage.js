import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import { useCart } from "../../context/cart-context";

function CartSummary() {
  const handlePriceConversion = (priceInCents) => {
    return (priceInCents / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const navigate = useNavigate();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;

  // grab global cartItems data from cart-context
  const {
    subtractFromCart,
    removeFromCart,
    checkoutCart,
    cartItems,
    subTotal,
  } = useCart();

  const handleSubtractFromCart = (locationId, menuItemId) => {
    subtractFromCart(locationId, menuItemId);
  };

  const handleRemoveFromCart = (locationId, menuItemId) => {
    removeFromCart(locationId, menuItemId);
  };

  const handleCheckoutCart = () => {
    checkoutCart();
    navigate("/confirmation");
  };

  return (
    <div>
      <div>
        <button className="p-1 border" onClick={() => navigate("/menu")}>
          Back to menu
        </button>
      </div>
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.menuItem.id}>
            <h3>{cartItem.menuItem.name}</h3>
            <p>Description: {cartItem.menuItem.description}</p>
            <p>Price: ${handlePriceConversion(cartItem.menuItem.price)}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <button
              className="border p-1"
              onClick={() =>
                handleSubtractFromCart(locationId, cartItem.menuItem.id)
              }
            >
              Subtract from Cart
            </button>
            <button
              className="border p-1"
              onClick={() =>
                handleRemoveFromCart(locationId, cartItem.menuItem.id)
              }
            >
              Remove from Cart
            </button>
            <hr />
          </li>
        ))}
      </ul>
      <div>SUBTOTAL: ${handlePriceConversion(subTotal)}</div>
      <div>
        <button className="border p-1" onClick={() => handleCheckoutCart()}>
          Buy now!
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
