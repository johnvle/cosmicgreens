import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

const GET_SHOPPING_CART = gql`
  query {
    shoppingCart {
      items {
        menuItem {
          id
          name
          description
          price
        }
        quantity
      }
      subTotal
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($locationId: ID!, $menuItemId: ID!, $quantity: Int!) {
    addToCart(
      locationId: $locationId
      menuItemId: $menuItemId
      quantity: $quantity
    ) {
      items {
        menuItem {
          id
          name
          description
          price
        }
        quantity
      }
      subTotal
    }
  }
`;

const SUBTRACT_FROM_CART = gql`
  mutation SubtractFromCart($locationId: ID!, $menuItemId: ID!) {
    subtractFromCart(locationId: $locationId, menuItemId: $menuItemId) {
      items {
        menuItem {
          id
          name
          description
          price
        }
        quantity
      }
      subTotal
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($locationId: ID!, $menuItemId: ID!) {
    removeFromCart(locationId: $locationId, menuItemId: $menuItemId) {
      items {
        menuItem {
          id
          name
          description
          price
        }
        quantity
      }
      subTotal
    }
  }
`;

const CHECKOUT_CART = gql`
  mutation CheckoutCart {
    checkout {
      items {
        menuItem {
          id
          name
          description
          price
        }
        quantity
      }
      subTotal
    }
  }
`;

const CartContext = createContext();

const CartContextProvider = (props) => {
  // cartItems in the shape of an array of objects
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0); 

  const { loading, error, data, refetch } = useQuery(GET_SHOPPING_CART);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [subtractFromCartMutation] = useMutation(SUBTRACT_FROM_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
  const [checkoutMutation] = useMutation(CHECKOUT_CART);
  useEffect(() => {
    if (data && data.shoppingCart) {
      const { items, subTotal } = data.shoppingCart;
      setCartItems(items);
      setSubTotal(subTotal);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addToCart = async (locationId, menuItemId, quantity) => {
    try {
      await addToCartMutation({
        variables: { locationId, menuItemId, quantity },
      });
      // Refetch the shopping cart after the mutation
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const subtractFromCart = async (locationId, menuItemId) => {
    try {
      await subtractFromCartMutation({
        variables: { locationId, menuItemId },
      });
      // Refetch the shopping cart after the mutation
      refetch();
    } catch (error) {
      console.error("Error subtracting from cart:", error);
    }
  };

  const removeFromCart = async (locationId, menuItemId) => {
    try {
      await removeFromCartMutation({
        variables: { locationId, menuItemId },
      });
      // Refetch the shopping cart after the mutation
      refetch();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const checkoutCart = async () => {
    try {
      await checkoutMutation();
      // Refetch the shopping cart after the checkout
      refetch();
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, subTotal, addToCart, subtractFromCart, removeFromCart, checkoutCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCart, CartContext };
