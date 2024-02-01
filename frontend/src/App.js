import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import pages
import LocationsPage from "./components/pages/LocationsPage";
import LandingPage from "./components/pages/LandingPage";
import MenuPage from "./components/pages/MenuPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";

import { CartContextProvider } from "./context/cart-context";

function App() {
  return (
    <div>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
