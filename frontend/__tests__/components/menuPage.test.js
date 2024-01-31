import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import MenuPage, { GET_MENU_ITEMS } from "../../src/components/pages/MenuPage";
import { LocationProvider } from "../../src/context/location-context";

jest.mock("../../src/context/cart-context", () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    subtractFromCart: jest.fn(),
    removeFromCart: jest.fn(),
    cartItems: [],
  }),
}));

const mocks = [
  {
    request: {
      query: GET_MENU_ITEMS,
      variables: { locationId: null },
    },
    result: {
      data: {
        location: {
          name: "Location A",
          menuItems: [
            {
              id: "101",
              name: "Item 1",
              description: "Description 1",
              price: 500,
            },
            {
              id: "102",
              name: "Item 2",
              description: "Description 2",
              price: 750,
            },
          ],
        },
      },
    },
  },
];

describe("Menu Page", () => {
  it("renders loading state, then data, and handles cart interactions", async () => {
    render(
      <LocationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router>
            <MenuPage />
          </Router>
        </MockedProvider>
      </LocationProvider>
    );

    // Wait for loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Log the queried variables to check if they match
    console.log("Queried Variables:", mocks[0].request.variables);

    // Check if loading state disappears and data is rendered
    console.log("Loading State:", screen.queryByText("Loading..."));
    console.log("Item 1:", screen.getByText("Item 1"));
    console.log("Item 2:", screen.getByText("Item 2"));

    // Continue with other assertions
    expect(screen.getByText("Menu items:")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Simulate button click on "Add to Cart" button for Item 1
    const addToCartButton1 = screen.getAllByText("Add to Cart")[0]; // Get the first button with the text "Add to Cart"
    fireEvent.click(addToCartButton1);

    // Assert that the item has been added to the cart
    expect(screen.getByText("Count: 1")).toBeInTheDocument();

    // Assert that the item has been added to the cart
    expect(screen.getByText("Count: 1")).toBeInTheDocument();

    // Simulate button click on "Subtract from Cart" button for Item 1
    const subtractFromCartButton1 =
      screen.getAllByText("Subtract from Cart")[0];
    fireEvent.click(subtractFromCartButton1);

    // Assert that the item count has decreased
    expect(screen.getByText("Unique Items: 0")).toBeInTheDocument();

    // Simulate button click on "Remove from Cart" button for Item 2
    const removeFromCartButton2 = screen.getAllByText("Remove from Cart")[1];
    fireEvent.click(removeFromCartButton2);

    // Assert that the item has been removed from the cart
    expect(screen.queryByText("Count")).not.toBeInTheDocument();
    expect(screen.queryByText("Count: 1")).not.toBeInTheDocument();
  });
});
