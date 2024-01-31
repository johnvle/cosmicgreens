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
// import MenuItemsList from "../common/MenuItemList";

// BONUS: local storage for menu items
function MenuPage() {
  const [currentCartLength, setCurrentCartLength] = useState(0);
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
    setCurrentCartLength(cartItems.length);
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
      <NavBar></NavBar>
      <div className="bg-[#F4F3E7] ">
        <header className="border-b border-slate-600 flex md:h-32 md:w-full">
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
          >
            <div className="font-light">{currentCartLength} unique items</div>
            <div className="font-light">
              {currentCartTotal} total items in cart
            </div>
            <div className="font-semibold rounded">
              <button
                className="border border-slate-200 px-12 py-3 rounded-full text-md bg-lime-300 text-[#00473B] hover:bg-[#00483C] hover:text-white transition ease-in-out absolute bottom right-12"
                onClick={() => navigate("/checkout")}
              >
                Check out
              </button>
            </div>
          </div>
        </header>
        <div className="text-2xl font-semibold mt-2 mb-4 ml-8">Menu items:</div>
        <section className="flex flex-wrap max-w-screen justify-evenly">
          {menuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              className="bg-[#E8DBC5]  flex flex-col shrink rounded h-[27rem] w-80 my-4 p-4 relative"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/015/698/916/original/cartoon-food-doodle-kawaii-anime-coloring-page-cute-illustration-drawing-clipart-character-chibi-manga-comics-free-png.png"
                alt="snapshot of the item"
                className="scale-80"
              ></img>
              <div className="absolute top right-4 rounded-full">
                {isItemInCart(cartItems, menuItem.id) && (
                  <div className="font-medium border border-black px-2 rounded-full">
                    {getCartItemQuantity(cartItems, menuItem.id)}
                  </div>
                )}
              </div>

              <div className="font-bold">{menuItem.name}</div>
              <div className="font-light ">{menuItem.description}</div>
              <div className="font-extralight text-sm absolute bottom-2 border border-slate-800 px-3 py-1 rounded-md">
                ${handlePriceConversion(menuItem.price)}
              </div>
              <div className="flex flex-row absolute bottom-2 right-2 ">
                <div className="flex flex-row items-center">
                  <button
                    className="px-2 hover:bg-[#d2d1d1] hover:border-emerald-800 border text-slate-800 border-slate-800 hover:text-emerald-800 rounded-full mr-2"
                    onClick={() => handleAddToCart(locationId, menuItem.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="px-2 hover:bg-[#d2d1d1] hover:border-emerald-800 border text-slate-800 border-slate-800 hover:text-emerald-800 rounded-full"
                    onClick={() =>
                      handleSubtractFromCart(locationId, menuItem.id)
                    }
                  >
                    -
                  </button>
                  <button
                    className="px-2 hover:bg-[#d2d1d1] hover:border-emerald-800 border text-slate-800 border-slate-800 hover:text-emerald-800 text-sm rounded-full ml-2"
                    onClick={() =>
                      handleRemoveFromCart(locationId, menuItem.id)
                    }
                  >
                    remove all
                  </button>
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
