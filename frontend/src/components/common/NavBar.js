import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-600 h-16 flex items-center justify-center">
      <button className="text-white text-xl font-bold" onClick={()=>navigate("/")}>cosmicgreens</button>
    </div>
  );
};

export default NavBar;