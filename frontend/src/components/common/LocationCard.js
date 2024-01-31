// LocationCard.js
import React from "react";

const LocationCard = ({ location, onLocationClick }) => {
  return (
    <section
      key={location.location}
      className="w-72 h-[25rem] p-4 mb-4 relative "
    >
      <img
        src="https://static.vecteezy.com/system/resources/previews/011/907/970/original/cute-fast-food-png.png"
        alt="store location"
      ></img>
      <div className="font-semibold my-2">{location.name}</div>
      <div className="text-sm font-thin mb-3">{location.location}</div>
      <div className="">
        <button
          className="border rounded-lg absolute bottom-4 right-4 py-1 px-6 transition ease-in-out bg-stone-200 hover:border-[#00473B]"
          onClick={() => onLocationClick(location.id)}
        >
          Order
        </button>
      </div>
    </section>
  );
};

export default LocationCard;
