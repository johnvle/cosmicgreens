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
  // const handlePriceConversion = (priceInCents) => {
  //   return (priceInCents / 100).toLocaleString(undefined, {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   });
  // };
  // grab global cartItems data from cart-context
  // const { subTotal } = useCart();

  // location-context
  const { state } = useLocation();
  const locationId = state.selectedLocation;
  console.log("locationId", locationId);
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
      <div>
        <div className="text-2xl font-bold underline ">Thank you</div>
        <div>Ordered From: {name}</div>
        <div>Address: {location}</div>
        <button onClick={() => navigate("/locations")}>Order more</button>
      </div>
    </>
  );
}

export default ConfirmationPage;
