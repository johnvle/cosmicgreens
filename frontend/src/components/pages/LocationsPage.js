import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import { useCart } from "../../context/cart-context";
import NavBar from "../common/NavBar";
import LocationCard from "../common/LocationCard";
import { GET_LOCATIONS } from "../../graphql/queries";

function LocationsPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const { dispatch } = useLocation();
  
  const {
    cartItems
  } = useCart();

  // location-context
  const { state } = useLocation();
  const selectedLocation = state.selectedLocation;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // grab global cartItems data from cart-context

  //  prod notes: might be better to serve location from backend like url?location=locationId. In this way, links persists the menu data from x location if user were to share url.

  const handleLocationClick = (locationId) => {
    console.log(selectedLocation); 
    if (cartItems.length > 0 && locationId !== selectedLocation) {
      window.alert("Cannot add item to cart from multiple locations. Please clear or checkout your existing shopping cart. Thank you!");
      return;
    }
    dispatch({ type: "SELECT_LOCATION", payload: locationId });
    navigate("/menu");
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex">
        <div className="md:w-full bg-[#A9C1A9] w-0 flex justify-center items-center">
          {"<Maps_API_Placeholder>"}
        </div>
        <div className="bg-[#F4F3E7] w-full min-h-screen md:w-1/3">
          <div className="flex justify-center py-6 underline">
            CURRENT LOCATIONS
          </div>
          <div className="flex flex-col items-center w-full  ">
            {data.locations.map((location) => (
              <LocationCard
                key={location.location}
                location={location}
                onLocationClick={handleLocationClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationsPage;
