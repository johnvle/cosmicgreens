import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query {
    locations {
      id
      name
      location
    }
  }
`;

export const GET_MENU_ITEMS = gql`
  query GetMenuItems($locationId: ID!) {
    location(id: $locationId) {
      name
      location
      menuItems {
        id
        name
        description
        price
      }
    }
  }
`;