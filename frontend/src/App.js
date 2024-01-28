// src/App.js
import React from 'react';// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query {
    locations {
      name
      location
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      E-Commerce App
      {data.locations.map(location => (
        <div key={location.location}>
          <p>Location Name: {location.name}</p>
          <p>Address: {location.location}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
