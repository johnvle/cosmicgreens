import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import { LocationProvider } from "./context/location-context";
import { CartContextProvider } from "./context/cart-context";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <LocationProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </LocationProvider>
  </ApolloProvider>
);
