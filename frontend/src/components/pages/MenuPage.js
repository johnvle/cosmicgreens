import React from "react";
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

function MenuPage() {
  const navigate = useNavigate();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;

  const { loading, error, data } = useQuery(GET_MENU_ITEMS, {
    variables: { locationId },
  });

  // cart-context
  const { addToCart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const location = data.location;
  const menuItems = location.menuItems;

  const handleAddToCart = (menuItem) => {
    console.log('menu Item', menuItem); 
    addToCart(menuItem); // Call addToCart from the cart-context
  };

  return (
    <>
      <NavBar></NavBar>
      <div>
        <div className="text-2xl font-bold underline">Menu items:</div>
        <ul>
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <h3>{menuItem.name}</h3>
              <p>{menuItem.description}</p>
              <p>Price: ${menuItem.price}</p>
              <p>ID: {menuItem.id}</p>
              <button onClick={() => handleAddToCart(menuItem.id)}>
                Add to Cart
              </button>
              <hr />
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => navigate("/checkout")}>Check out</button>
        </div>
      </div>
    </>
  );
}

export default MenuPage;
