export const typeDefs = `#graphql
type Location {
  id: ID!
  name: String!
  location: String!
}

type MenuItem {
  id: ID!
  name: String!
  description: String
  price: Float!
  location: Location!
}

type Query {
  # Query to fetch menu items for a specific location
  locations: [Location]!
  menuItems(locationId: ID!): [MenuItem!]!
}
`