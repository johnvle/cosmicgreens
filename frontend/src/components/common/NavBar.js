import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F4F3E7] h-20 flex items-center justify-center border-black border-b">
      <button
        className="text-[#00473B] text-3xl font-bold"
        onClick={() => navigate("/")}
      >
        cosmicgreens
      </button>
    </div>
  );
};

export default NavBar;
