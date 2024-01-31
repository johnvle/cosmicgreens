import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex bg-[#F4F3E7] flex-col border-4 items-center justify-center min-h-screen">
        <main className="flex p-6 my-4 h-32">
          <h1 className="text-7xl font-semibold drop-shadow-lg bg-gradient-to-r from-blue-600 via-red-800 to-indigo-400 text-transparent bg-clip-text">
            cosmic
          </h1>
          <h1 className="text-7xl text-center font-semibold drop-shadow-lg bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 text-transparent bg-clip-text ">
            greens
          </h1>
        </main>
        <div className=" mb-4 p-2">
          <h2 className="text-slate-500 ">
            building healthier communities by connecting people{" "}
            {"(and martians)"} to real food
          </h2>
        </div>
        <section>
          <button
            className="border border-slate-200 px-12 py-3 rounded-full bg-transparent text-md bg-lime-300 text-[#00473B] hover:bg-[#00483C] hover:text-white transition ease-in-out "
            onClick={() => navigate("/locations")}
          >
            ORDER NOW
          </button>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
