import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const GET_LOCATIONS = gql`
  query {
    locations {
      name
      location
    }
  }
`;

function LocationsPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {" "}
      E-Commerce App
      {data.locations.map((location) => (
        <div key={location.location}>
          <p>Location Name: {location.name}</p>
          <p>Address: {location.location}</p>
        </div>
      ))}
    </div>
  );
};

export default LocationsPage;