import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import { useCart } from "../../context/cart-context";
import NavBar from "../common/NavBar";

const GET_MENU_ITEMS = gql`
  query GetMenuItems($locationId: ID!) {
    location(id: $locationId) {
      name
      menuItems {
        id
        name
        description
        price
      }
    }
  }
`;
// BONUS: local storage for menu items
function MenuPage() {
  // good to make a file like utils.ts for these funcs
  const handlePriceConversion = (priceInCents) => {
    return (priceInCents / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const [currentCartLength, setCurrentCartLength] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});

  const navigate = useNavigate();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;

  // put hooks in the same place on the top of the function
  const { loading, error, data } = useQuery(GET_MENU_ITEMS, {
    variables: { locationId },
  });

  // cart-context
  const { addToCart, subtractFromCart, removeFromCart, cartItems } = useCart();
  // updates state
  useEffect(() => {
    setCurrentCartLength(cartItems.length);
  }, [cartItems]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const location = data.location;
  const menuItems = location.menuItems;

  // ADD TO CART as defined by GraphQL resolvers and cart-context
  const handleAddToCart = (locationId, menuItemID, quantity) => {
    addToCart(locationId, menuItemID, 1);
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuItemID]: (prevQuantities[menuItemID] || 0) + 1,
    }));
  };
  // SUBTRACT FROM CART as defined by GraphQL resolvers and cart-context
  const handleSubtractFromCart = (locationId, menuItemID) => {
    subtractFromCart(locationId, menuItemID);
    // add some client side check here to break if zero already

    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuItemID]: (prevQuantities[menuItemID] || 0) - 1,
    }));
  };
  // REMOVE FROM CART as defined by GraphQL resolvers and cart-context
  const hanldeRemoveFromCart = (locationId, menuItemID) => {
    // add some client side check here to break if zero already

    removeFromCart(locationId, menuItemID);
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuItemID]: 0,
    }));
  };
  return (
    <>
      <NavBar></NavBar>
      <div>
        <div>
          Unique Items: {currentCartLength}
          <div>
            <button
              className="p-1 border"
              onClick={() => navigate("/checkout")}
            >
              Check out
            </button>
          </div>
        </div>
        <div className="text-2xl font-bold underline">Menu items:</div>
        <ul>
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <h3>{menuItem.name}</h3>
              <p>{menuItem.description}</p>
              <p>Price: ${handlePriceConversion(menuItem.price)}</p>
              <div className="flex flex-row">
                <div className="flex flex-row items-center">
                  <button
                    className="p-1 border"
                    onClick={() => handleAddToCart(locationId, menuItem.id, 1)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="p-1 border"
                    onClick={() =>
                      handleSubtractFromCart(locationId, menuItem.id)
                    }
                  >
                    Subtract from Cart
                  </button>
                  <button
                    className="p-1 border"
                    onClick={() =>
                      hanldeRemoveFromCart(locationId, menuItem.id)
                    }
                  >
                    Remove from Cart
                  </button>
                  <div>
                    {itemQuantities[menuItem.id] > 0 ? (
                      <div className="font-bold">
                        Count: {itemQuantities[menuItem.id] || 0}
                      </div>
                    ) : (
                      <>{""}</>
                    )}
                  </div>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MenuPage;
