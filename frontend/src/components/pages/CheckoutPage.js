import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import { useCart } from "../../context/cart-context";
import { handlePriceConversion } from "../../utils/utils";
import NavBar from "../common/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartSummary() {
  const navigate = useNavigate();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;

  // grab global cartItems data from cart-context
  const {
    addToCart,
    subtractFromCart,
    removeFromCart,
    checkoutCart,
    cartItems,
    subTotal,
  } = useCart();

  // ADD TO CART as defined by GraphQL resolvers and cart-context
  const handleAddToCart = (locationId, menuItemID) => {
    addToCart(locationId, menuItemID, 1);
  };

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
    <>
      <NavBar></NavBar>
      <div className="bg-[#E8DBC5] min-h-screen h-full flex flex-col">
        <header className="font-serif text-4xl flex items-center justify-center border-black md:h-32 md:w-full font-thin ">
          Finish up your pickup order
        </header>
        <div className="flex items-center justify-center font-light">
          <button
            className="p-1 underline mb-8 text-md"
            onClick={() => navigate("/menu")}
          >
            or order more
          </button>
        </div>
        <main className="flex flex-col shrink h-auto justify-center items-center mb-8 ">
          <div className="flex flex-col w-[28rem] h-full relative bg-[#F4F3E7] rounded-lg p-4">
            <div className="text-slate-800 self-center border-b border-slate-700 my-6 ">
              Your Order Summary
            </div>
            <div className="flex flex-col">
              {cartItems.map((cartItem) => (
                <div
                  className="p-2 m-2 flex"
                  key={cartItem.menuItem.id}
                >
                  <aside
                    id="cartItem-img-container"
                    className="w-1/3 flex items-center"
                  >
                    <div className="">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/015/698/916/original/cartoon-food-doodle-kawaii-anime-coloring-page-cute-illustration-drawing-clipart-character-chibi-manga-comics-free-png.png"
                        alt="snapshot of the item"
                        className="object-cover scale-125"
                      ></img>
                    </div>
                  </aside>
                  <section
                    id="cartItem-summary"
                    className="px-2  w-full"
                  >
                    <div className="font-semibold">
                      {cartItem.menuItem.name}
                    </div>
                    <div className="text-sm italic py-4">
                      {cartItem.menuItem.description}
                    </div>
                    <span className="mb-2 flex items-center w-full justify-between space-x-2">
                      <div className="rounded-full border border-black px-2 py-1  text-sm ">
                        {cartItem.quantity}
                        {"x"}
                      </div>
                      <div className="font-thin italic">
                        $
                        {handlePriceConversion(
                          cartItem.menuItem.price * cartItem.quantity
                        )}
                      </div>
                    </span>
                    <div
                      id="item operations panel"
                      className="flex flex-row-reverse"
                    >
                      <button
                        className="px-2 py-1 ml-2"
                        onClick={() =>
                          handleRemoveFromCart(locationId, cartItem.menuItem.id)
                        }
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                      <button
                        className="p-1 px-3  hover:bg-[#d2d1d1] transition ease-in-out  bg-[#EBEADF] hover:border-[#00473B] font-light rounded-full"
                        onClick={() =>
                          handleSubtractFromCart(
                            locationId,
                            cartItem.menuItem.id
                          )
                        }
                      >
                        {"-"}
                      </button>
                      <button
                        className="p-1 px-3 hover:bg-[#d2d1d1] transition ease-in-out  bg-[#EBEADF] hover:border-[#00473B] font-light  rounded-full mr-2"
                        onClick={() =>
                          handleAddToCart(locationId, cartItem.menuItem.id, 1)
                        }
                      >
                        {"+"}
                      </button>
                    </div>
                  </section>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="ml-4 mr-4 border-b border-black"></div>
              <div className="flex flex-row justify-between ml-4 mr-4 mt-6 mb-4 p-1">
                <div>Subtotal:</div>
                <div>${handlePriceConversion(subTotal)}</div>
              </div>
              <div className="border border-slate-200 px-4 py-2 rounded-full text-md bg-[#00483C] text-white hover:bg-[#00725f] hover:text-white transition ease-in-out ml-4 mr-4 font-light text-center my-2">
                <button className="p-1 " onClick={() => handleCheckoutCart()}>
                  Place order
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CartSummary;
