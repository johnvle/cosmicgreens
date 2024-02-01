import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const cartSize = props.currentCartLength ? props.currentCartLength : 0;
  const navigate = useNavigate();

  return (
    <div className="bg-[#F4F3E7] h-20 flex items-center sticky top-0 z-50 border-black border-b">
      <div className="self-center flex w-full items-center justify-center relative">
        <button
          className="text-[#00473B] text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          cosmicgreens
        </button>
        {cartSize > 0 && (
          <div className="absolute right-20">
            <button
              className="border border-slate-200 px-6 py-2 rounded-full text-md bg-lime-300 text-[#00473B] hover:bg-[#00483C] hover:text-white transition ease-in-out "
              onClick={() => navigate("/checkout")}
            >
              <span className="mr-2 text-light">{cartSize}</span>
              <span><FontAwesomeIcon icon={faShoppingCart} /></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
