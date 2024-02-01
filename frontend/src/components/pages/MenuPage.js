import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import { useCart } from "../../context/cart-context";
import NavBar from "../common/NavBar";
import { GET_MENU_ITEMS } from "../../graphql/queries";
import {
  handlePriceConversion,
  isItemInCart,
  getCartItemQuantity,
} from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// import MenuItemsList from "../common/MenuItemList";

// BONUS: local storage for menu items
function MenuPage() {
  const [currentCartTotal, setCurrentCartTotal] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});
  const navigate = useNavigate();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;

  const { loading, error, data } = useQuery(GET_MENU_ITEMS, {
    variables: { locationId },
  });

  // cart-context
  const { addToCart, subtractFromCart, removeFromCart, cartItems } = useCart();

  useEffect(() => {
    let total = 0;
    for (let shoppingCartItem of cartItems) {
      total += shoppingCartItem.quantity;
    }
    setCurrentCartTotal(total);
  }, [cartItems, itemQuantities]);

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

  const handleSubtractFromCart = (locationId, menuItemID) => {
    const isItemPresent = isItemInCart(cartItems, menuItemID);
    if (isItemPresent) {
      subtractFromCart(locationId, menuItemID);
    }
  };
  // REMOVE FROM CART as defined by GraphQL resolvers and cart-context
  // client-side validation: break if the count is already 0
  const handleRemoveFromCart = (locationId, menuItemID) => {
    const isItemPresent = isItemInCart(cartItems, menuItemID);
    if (isItemPresent) {
      removeFromCart(locationId, menuItemID);
    }
  };
  return (
    <>
      <NavBar currentCartLength={currentCartTotal} />{" "}
      <div className="bg-[#F4F3E7] ">
        <header className="border-b border-slate-400 flex md:h-48 md:w-full">
          <div
            id="ordering-from"
            className="font-serif md:w-1/3 md:text-3xl lg:text-4xl flex flex-col justify-center ml-8"
          >
            <div>Ordering From</div>
            <div
              className=" font-thin text-emerald-900 underline"
              onClick={() => navigate("/locations")}
            >
              {location.name}
            </div>
          </div>
          <div
            id="location-info"
            className="md:w-1/3 flex flex-col justify-center px-8"
          >
            <div>{location.location}</div>
            <div className=" font-thin">Pickup available</div>
          </div>
          <div
            id="menu-local-shopping-cart"
            className=" md:w-1/3 flex flex-col justify-center px-8 relative"
          ></div>
        </header>
        <div className="text-2xl font-light mt-10 mb-4 ml-8">Menu items:</div>
        <section className="flex flex-wrap max-w-screen justify-evenly">
          {menuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              className="bg-[#E8DBC5] flex flex-col shrink rounded-lg h-[30rem] w-[22rem] my-4 p-6 relative"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/015/698/916/original/cartoon-food-doodle-kawaii-anime-coloring-page-cute-illustration-drawing-clipart-character-chibi-manga-comics-free-png.png"
                alt="snapshot of the item"
                className="scale-80"
              ></img>
              <div className="absolute top right-4 rounded-full">
                {isItemInCart(cartItems, menuItem.id) && (
                  <div className="font-medium border border-black px-3 p-1 rounded-full">
                    {getCartItemQuantity(cartItems, menuItem.id)}
                  </div>
                )}
              </div>
              <div className="font-bold">{menuItem.name}</div>
              <div className="font-light ">{menuItem.description}</div>
              <div className="font-extralight text-sm absolute bottom-6 border-black border px-4 py-1 rounded-full ">
                ${handlePriceConversion(menuItem.price)}
              </div>
              <div className="flex flex-row absolute bottom-6 right-4 ">
                <div className="flex flex-row items-center">
                  <button
                    className="p-1 px-3 hover:bg-[#d2d1d1] transition ease-in-out  bg-[#EBEADF] hover:border-[#00473B] font-light  rounded-full mr-2"
                    onClick={() => handleAddToCart(locationId, menuItem.id, 1)}
                  >
                    +
                  </button>
                  {isItemInCart(cartItems, menuItem.id) && (
                    <button
                      className="p-1 px-3  hover:bg-[#d2d1d1] transition ease-in-out  bg-[#EBEADF] hover:border-[#00473B] font-light rounded-full"
                      onClick={() =>
                        handleSubtractFromCart(locationId, menuItem.id)
                      }
                    >
                      {"-"}
                    </button>
                  )}
                  {isItemInCart(cartItems, menuItem.id) && (
                    <button
                      className="px-2 py-1 ml-2"
                      onClick={() =>
                        handleRemoveFromCart(locationId, menuItem.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default MenuPage;
