import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import { useCart } from "../../context/cart-context";
import { handlePriceConversion } from "../../utils/utils";
import NavBar from "../common/NavBar";
function CartSummary() {
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
        <main className="flex flex-col shrink w-full h-auto justify-center items-center mb-8">
          <div className="flex flex-col border border-black w-[28rem] h-full relative ">
            <div className="text-slate-800 self-center border-b border-slate-700 my-6 ">
              Your Order Summary
            </div>
            <div className="flex flex-col">
              {cartItems.map((cartItem) => (
                <div className="p-2 m-2" key={cartItem.menuItem.id}>
                  <div className="font-semibold">{cartItem.menuItem.name}</div>
                  <div className="text-sm italic">
                    {cartItem.menuItem.description}
                  </div>
                  <span className="flex items-center space-x-2">
                    <div className="rounded-full border border-slate-800 px-2 py-1 w-min text-sm">
                      {cartItem.quantity}
                      {"x"}
                    </div>
                    <div>
                      $
                      {handlePriceConversion(
                        cartItem.menuItem.price * cartItem.quantity
                      )}
                    </div>
                  </span>
                  <button
                    className="px-2 hover:bg-[#d2d1d1] hover:border-emerald-800 border text-slate-800 border-slate-800 hover:text-emerald-800 text-sm rounded-full"
                    onClick={() =>
                      handleSubtractFromCart(locationId, cartItem.menuItem.id)
                    }
                  >
                    Subtract One
                  </button>
                  <button
                    className="px-2 mt-2 hover:bg-[#d2d1d1] hover:border-emerald-800 border text-slate-800 border-slate-800 hover:text-emerald-800 text-sm rounded-full ml-2"
                    onClick={() =>
                      handleRemoveFromCart(locationId, cartItem.menuItem.id)
                    }
                  >
                    Remove
                  </button>
                  <hr />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="flex flex-row justify-between ml-4 mr-4 border-t border-black my-4 p-1">
                <div>Subtotal:</div>
                <div>${handlePriceConversion(subTotal)}</div>
              </div>
              <div className="border border-slate-200 px-4 py-2 rounded-full bg-transparent text-md bg-[#00483C] text-white hover:bg-[#00725f] hover:text-white transition ease-in-out ml-4 mr-4 font-light text-center my-2">
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
