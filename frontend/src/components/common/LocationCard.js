// LocationCard.js
import React from "react";

const LocationCard = ({ location, onLocationClick }) => {
  return (
    <section
      key={location.location}
      className="w-72 h-[20rem] p-4 mb-4 relative flex flex-col  border- rounded-lg"
    >
      <div className="flex w-full justify-center border rounded-lg py-2">
        <div className=" w-36 ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/907/970/original/cute-fast-food-png.png"
            alt="store location"
            className="w-full h-full object-cover"
          ></img>
        </div>
      </div>

      <div className="font-semibold my-2">{location.name}</div>
      <div className="text-sm font-thin ">{location.location}</div>
      <div className="">
        <div className="flex flex-row-reverse mt-4">
          <button
            className="border text-sm rounded-full text-slate-600 py-2 px-5 transition ease-in-out bg-[#EBEADF] hover:border-[#00473B] font-light hover:bg-[#E2E5DA]"
            onClick={() => onLocationClick(location.id)}
          >
            ORDER HERE
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocationCard;
