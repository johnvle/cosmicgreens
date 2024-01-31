// Data populated by Mockaroo
// NOTE: In production environments, it's very common—and highly recommended—to represent currency amounts in the smallest increment of money possible. But for this small-project I will be representing currency in dollars not cents
const nuwaMenuItems = [
  {
    id: "nuwa1",
    name: "Galactic Green Salad",
    description: "Ut at dolor quis odio consequat varius. Integer ac leo.",
    price: 1952,
    locationId: "2",
  },
  {
    id: "nuwa2",
    name: "Martian Quinoa Bowl",
    description: "Maecenas pulvinar lobortis est.",
    price: 690,
    locationId: "2",
  },
  {
    id: "nuwa3",
    name: "Cosmic Kale Smoothie",
    description:
      "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    price: 425,
    locationId: "2",
  },
  {
    id: "nuwa4",
    name: "Lunar Lentil Soup",
    description: "Duis bibendum. Morbi non quam nec dui luctus rutrum.",
    price: 1725,
    locationId: "2",
  },
  {
    id: "nuwa5",
    name: "Stellar Spinach Wrap",
    description:
      "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem.",
    price: 2000,
    locationId: "2",
  },
  {
    id: "nuwa6",
    name: "Astro Avocado Toast",
    description: "Sed ante.",
    price: 2120,
    locationId: "2",
  },
  {
    id: "nuwa7",
    name: "Celestial Chia Pudding",
    description:
      "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget.",
    price: 7790,
    locationId: "2",
  },
  {
    id: "nuwa8",
    name: "Nebula Noodle Bowl",
    description: "Morbi non lectus.",
    price: 1446,
    locationId: "2",
  },
  {
    id: "nuwa9",
    name: "Solar System Sushi Roll",
    description:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    price: 1880,
    locationId: "2",
  },
  {
    id: "nuwa10",
    name: "Supernova Salad Wrap",
    description:
      "Donec dapibus. Duis at velit eu est congue elementum.",
    price: 704,
    locationId: "2",
  },
];
const hollywoodMenuItems = [
  {
    id: "hw1",
    name: "Quinoa Salad",
    description:
      "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    price: 1526,
    locationId: "1",
  },
  {
    id: "hw2",
    name: "Sushi Rolls",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    price: 1860,
    locationId: "1",
  },
  {
    id: "hw3",
    name: "Greek Salad",
    description: "Ut at dolor quis odio consequat varius. Integer ac leo.",
    price: 18,
    locationId: "1",
  },
  {
    id: "hw4",
    name: "Hummus and Pita",
    description: "Cras pellentesque volutpat dui.",
    price: 1832,
    locationId: "1",
  },
  {
    id: "hw5",
    name: "Vegetable Stir-Fry",
    description: "Nullam varius.",
    price: 575,
    locationId: "1",
  },
  {
    id: "hw6",
    name: "Falafel Wrap",
    description: "Aliquam erat volutpat.",
    price: 1647,
    locationId: "1",
  },
  {
    id: "hw7",
    name: "Caprese Salad",
    description:
      "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    price: 665,
    locationId: "1",
  },
  {
    id: "hw8",
    name: "Brown Rice Bowl",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    price: 1629,
    locationId: "1",
  },
  {
    id: "hw9",
    name: "Miso Soup",
    description:
      "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    price: 16,
    locationId: "1",
  },
  {
    id: "hw10",
    name: "Fresh Fruit Salad",
    description: "Fusce consequat.",
    price: 1254,
    locationId: "1",
  },
];

export const locations = [
  {
    id: "1",
    name: "Hollywood",
    location: "1000 Hollywood Blvd, Hollywood, California",
    menuItems: hollywoodMenuItems,
  },
  {
    id: "2",
    name: "Nüwa",
    location: "123 Red Dust Lane, Ares, Mars",
    menuItems: nuwaMenuItems,
  },
];

// export const menuItems = [...martianMenuItems, ...earthMenuItems];
