import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "../../context/location-context";
// import { useCart } from "../../context/cart-context";
import NavBar from "../common/NavBar";

const GET_LOCATION = gql`
  query Location($locationId: ID!) {
    location(id: $locationId) {
      name
      location
    }
  }
`;

function ConfirmationPage() {
  const navigate = useNavigate();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;
  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { locationId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const name = data.location.name;
  const location = data.location.location;

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-col items-center justify-center h-screen bg-[#E8DBC5] space-y-2">
        <div className="font-serif text-4xl font-bold mb-4">Thank you</div>
        <div className="text-lg font-light">Ordered From: {name}</div>
        <div className="text-lg font-thin">Address: {location}</div>
        <button
          className="border border-slate-200 px-12 py-3 rounded-full text-md bg-lime-300 text-[#00473B] hover:bg-[#00483C] hover:text-white transition ease-in-out "
          onClick={() => navigate("/locations")}
        >
          Order more
        </button>
      </div>
    </>
  );
}

export default ConfirmationPage;
