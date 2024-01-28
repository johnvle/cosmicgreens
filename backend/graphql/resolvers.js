// resolvers.js

const locations = [
  { id: '1', name: 'Location 1', location: 'Earth' },
  { id: '2', name: 'Location 2', location: 'Earth' },
];

const menuItems = [
  { id: '1', name: 'Item 1', description: 'Description 1', price: 10.99, locationId: '1' },
  { id: '2', name: 'Item 2', description: 'Description 2', price: 15.99, locationId: '1' },
  { id: '3', name: 'Item 3', description: 'Description 3', price: 12.99, locationId: '2' },
  // Add more menu items as needed
];

const resolvers = {
  Query: {
    locations: () => locations,
  },
};

export default resolvers;
