import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/location-context";
import NavBar from "../common/NavBar";

export const GET_LOCATIONS = gql`
  query {
    locations {
      id
      name
      location
    }
  }
`;

function LocationsPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const { state, dispatch } = useLocation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleLocationClick = (locationId) => {
    // Dispatch an action to set the selected location
    dispatch({ type: 'SELECT_LOCATION', payload: locationId });
    navigate("/menu");
  };


  return (
    <>
    <NavBar></NavBar>
      <div>
        E-Commerce App
        {data.locations.map((location) => (
          <div key={location.location}>
            <p>Location Name: {location.name}</p>
            <p>Address: {location.location}</p>
            <p>Location ID: {location.id}</p>
            <button className="border" onClick={() => handleLocationClick(location.id)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default LocationsPage;
