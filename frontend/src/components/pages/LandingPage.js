import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex bg-[#F4F3E7] flex-col border-4 items-center justify-center min-h-screen">
        <main className="flex flex-col  border-black items-center">
          <div className="flex h-20 mb-5">
            <h1 className="text-7xl font-semibold drop-shadow-lg bg-gradient-to-r from-blue-600 via-red-800 to-indigo-400 text-transparent bg-clip-text">
              cosmic
            </h1>
            <h1 className="text-7xl text-center font-semibold drop-shadow-lg bg-gradient-to-r from-[#00473B] via-[#006251] to-[#00473B] text-transparent bg-clip-text ">
              greens
            </h1>
          </div>
          <div id="mission statement"className="mb-10">
            <h2 className="font-light text-xl text-slate-800 ">
              Building healthier communities by connecting people{" "}
              <span className ="italic font-normal text-[#00473B]">{"- and martians - "} </span>
              to real food.
            </h2>
          </div>
          <section>
            <button
              className="border border-[#00473B] px-12 py-3 rounded-full text-md bg-lime-200 text-[#00473B] hover:bg-[#00483C] hover:text-white transition ease-in-out "
              onClick={() => navigate("/locations")}
            >
              ORDER NOW
            </button>
          </section>
        </main>
      </div>
    </>
  );
}

export default LandingPage;
