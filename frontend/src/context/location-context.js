import React, { createContext, useReducer, useContext } from "react";

// Define the initial state
let initialState = {
  selectedLocation: null,
  cartEmpty: true,
};

const LocationContext = createContext();

const locationReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_LOCATION":
      const newState = {
        ...state,
        selectedLocation: action.payload,
        cartEmpty: true,
      };
      localStorage.setItem("selectedLocation", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

const LocationProvider = ({ children }) => {
  const storedState = localStorage.getItem("selectedLocation");
  initialState = storedState
    ? JSON.parse(storedState)
    : { selectedLocation: null };
  const [state, dispatch] = useReducer(locationReducer, initialState);

  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook for using the context
const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation, LocationContext };
