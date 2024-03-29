export const typeDefs = `#graphql
type Location {
  id: ID!
  name: String!
  location: String!
  menuItems: [MenuItem!]!
}

type MenuItem {
  id: String!
  name: String!
  description: String
  price: Float!
}

type ShoppingCartItem {
  menuItem: MenuItem!
  quantity: Int!
}

type ShoppingCart {
  items: [ShoppingCartItem!]!
  subTotal: Float!
}

type Query {
  location(id: ID!): Location!
  locations: [Location]!
  # menuItems(locationId: ID!): [MenuItem!]!
  shoppingCart: ShoppingCart!
}

type Mutation {
  addToCart(locationId: ID!, menuItemId: ID!, quantity: Int!): ShoppingCart!
  removeFromCart(locationId: ID!, menuItemId: ID!): ShoppingCart!
  subtractFromCart(locationId: ID!, menuItemId: ID!): ShoppingCart!
  checkout: ShoppingCart!
}
`;
