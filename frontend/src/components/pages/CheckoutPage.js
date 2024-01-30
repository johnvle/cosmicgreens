import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../common/NavBar";

const GET_CART_ITEMS = gql`
  query GetCartItems($itemIds: [ID!]!) {
    locations {
      menuItems(ids: $itemIds) {
        id
        name
        description
        price
      }
    }
  }
`;

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Extract item ids from cartItems
  const itemIds = cartItems.map((item) => item.menuItem.id);

  // Fetch details of items in the cart using GraphQL query
  const { loading, error, data } = useQuery(GET_CART_ITEMS, {
    variables: { itemIds },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cartItemsDetails = data.locations.flatMap((location) => location.menuItems);

  return (
    <>
      <div>
        <NavBar></NavBar>
        <div className="text-2xl font-bold underline">Your cart:</div>
        <ul>
          {cartItemsDetails.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <hr />
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/confirmation")}>Buy now</button>
      </div>
    </>
  );
}

export default CheckoutPage;
