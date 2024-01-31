import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { LocationProvider } from "../../src/context/location-context";
import LocationsPage, {
  GET_LOCATIONS,
} from "../../src/components/pages/LocationsPage";

const mocks = [
  {
    request: {
      query: GET_LOCATIONS,
    },
    result: {
      data: {
        locations: [
          { id: "1", name: "Location A", location: "Address A" },
          { id: "2", name: "Location B", location: "Address B" },
        ],
      },
    },
  },
];

describe("Locations Page", () => {
  it("renders loading state, then data, and handles button click", async () => {
    render(
      <LocationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router>
            <LocationsPage />
          </Router>
        </MockedProvider>
      </LocationProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if loading state disappears and data is rendered
    expect(screen.getByText("Location Name: Location A")).toBeInTheDocument();
    expect(screen.getByText("Location Name: Location B")).toBeInTheDocument();

    const orderNowButtons = screen.getAllByText("Order Now");
    expect(orderNowButtons).toHaveLength(2); // Assuming there are two locations

    // Simulate button click on the first "Order Now" button
    fireEvent.click(orderNowButtons[0]);
  });
});
