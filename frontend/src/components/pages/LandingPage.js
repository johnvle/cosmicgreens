import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="text-4xl font-bold underline ">cosmicgreens</div>
        <div>
          <button onClick={() => navigate("/locations")}>Order Now</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
