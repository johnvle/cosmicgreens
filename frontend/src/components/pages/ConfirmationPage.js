import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";

function ConfirmationPage() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar></NavBar>
      <div>
        <div class="text-2xl font-bold underline ">Thank you</div>
        <button onClick={() => navigate("/locations")}>Order more</button>
      </div>
    </>
  );
}

export default ConfirmationPage;
