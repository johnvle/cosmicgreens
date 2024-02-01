import { locations } from "../mockDB/_db.js";

let shoppingCart = {
  items: [],
  subTotal: 0,
};

const resolvers = {
  Query: {
    location: (parent, { id }) => {
      // Find the location with the specified id
      const location = locations.find((loc) => loc.id === id);

      if (!location) {
        throw new Error("Location not found");
      }

      return location;
    },
    locations: () => locations,
    shoppingCart: () => shoppingCart,
  },
  Mutation: {
    addToCart: (parent, { locationId, menuItemId, quantity }) => {
      const location = locations.find((loc) => loc.id === locationId);

      if (!location) {
        throw new Error("Location not found");
      }

      const menuItem = location.menuItems.find(
        (item) => item.id === menuItemId
      );

      if (!menuItem) {
        throw new Error("MenuItem not found");
      }

      const existingItemIndex = shoppingCart.items.findIndex(
        (item) => item.menuItem.id === menuItemId
      );

      if (existingItemIndex !== -1) {
        shoppingCart.items[existingItemIndex].quantity += quantity;
      } else {
        shoppingCart.items.push({ menuItem, quantity });
      }

      shoppingCart.subTotal += menuItem.price * quantity;

      return {
        items: shoppingCart.items,
        subTotal: shoppingCart.subTotal,
      };
    },
    subtractFromCart: (parent, { locationId, menuItemId }) => {
      const location = locations.find((loc) => loc.id === locationId);

      if (!location) {
        throw new Error("Location not found");
      }

      const menuItem = location.menuItems.find(
        (item) => item.id === menuItemId
      );

      if (!menuItem) {
        throw new Error("MenuItem not found");
      }

      const existingItemIndex = shoppingCart.items.findIndex(
        (item) => item.menuItem.id === menuItemId
      );

      if (existingItemIndex !== -1) {
        // Decrease the quantity if greater than 1, otherwise remove the item
        if (shoppingCart.items[existingItemIndex].quantity > 1) {
          shoppingCart.items[existingItemIndex].quantity -= 1;
        } else {
          shoppingCart.items.splice(existingItemIndex, 1);
        }
        shoppingCart.subTotal -= menuItem.price;
      }
    
      return {
        items: shoppingCart.items,
        subTotal: shoppingCart.subTotal,
      };
    },
    removeFromCart: (parent, { locationId, menuItemId }) => {
      const location = locations.find((loc) => loc.id === locationId);

      if (!location) {
        throw new Error("Location not found");
      }

      const existingItemIndex = shoppingCart.items.findIndex(
        (item) => item.menuItem.id === menuItemId
      );

      if (existingItemIndex !== -1) {
        const removedItem = shoppingCart.items.splice(existingItemIndex, 1)[0];
        shoppingCart.subTotal -=
          removedItem.menuItem.price * removedItem.quantity;
      }
      return {
        items: shoppingCart.items,
        subTotal: shoppingCart.subTotal,
      };
    },
    checkout: () => {
      const checkedOutCart = { ...shoppingCart };
      shoppingCart = { items: [], subTotal: 0 };

      return {
        items: shoppingCart.items,
        subTotal: shoppingCart.subTotal,
      };
    },
  },
};

export default resolvers;
