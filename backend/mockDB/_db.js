// Data populated by Mockaroo
// NOTE: In production environments, it's very common—and highly recommended—to represent currency amounts in the smallest increment of money possible. But for this small-project I will be representing currency in dollars not cents
const martianMenuItems = [
  {
    id: "1",
    name: "Galactic Green Salad",
    description: "Ut at dolor quis odio consequat varius. Integer ac leo.",
    price: 19.52,
    locationId: "2",
  },
  {
    id: "2",
    name: "Martian Quinoa Bowl",
    description: "Maecenas pulvinar lobortis est.",
    price: 6.9,
    locationId: "2",
  },
  {
    id: "3",
    name: "Cosmic Kale Smoothie",
    description:
      "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    price: 4.25,
    locationId: "2",
  },
  {
    id: "4",
    name: "Lunar Lentil Soup",
    description: "Duis bibendum. Morbi non quam nec dui luctus rutrum.",
    price: 17.25,
    locationId: "2",
  },
  {
    id: "5",
    name: "Stellar Spinach Wrap",
    description:
      "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.",
    price: 20.0,
    locationId: "2",
  },
  {
    id: "6",
    name: "Astro Avocado Toast",
    description: "Sed ante.",
    price: 2.12,
    locationId: "2",
  },
  {
    id: "7",
    name: "Celestial Chia Pudding",
    description:
      "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
    price: 7.79,
    locationId: "2",
  },
  {
    id: "8",
    name: "Nebula Noodle Bowl",
    description: "Morbi non lectus.",
    price: 14.46,
    locationId: "2",
  },
  {
    id: "9",
    name: "Solar System Sushi Roll",
    description:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    price: 1.88,
    locationId: "2",
  },
  {
    id: "10",
    name: "Supernova Salad Wrap",
    description:
      "Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
    price: 7.04,
    locationId: "2",
  },
];
const earthMenuItems = [
  {
    id: 1,
    name: "Quinoa Salad",
    description:
      "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    price: 15.26,
    locationId: "1",
  },
  {
    id: 2,
    name: "Sushi Rolls",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    price: 1.86,
    locationId: "1",
  },
  {
    id: 3,
    name: "Greek Salad",
    description: "Ut at dolor quis odio consequat varius. Integer ac leo.",
    price: 0.18,
    locationId: "1",
  },
  {
    id: 4,
    name: "Hummus and Pita",
    description: "Cras pellentesque volutpat dui.",
    price: 18.32,
    locationId: "1",
  },
  {
    id: 5,
    name: "Vegetable Stir-Fry",
    description: "Nullam varius.",
    price: 5.75,
    locationId: "1",
  },
  {
    id: 6,
    name: "Falafel Wrap",
    description: "Aliquam erat volutpat.",
    price: 16.47,
    locationId: "1",
  },
  {
    id: 7,
    name: "Caprese Salad",
    description:
      "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    price: 6.65,
    locationId: "1",
  },
  {
    id: 8,
    name: "Brown Rice Bowl",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    price: 16.29,
    locationId: "1",
  },
  {
    id: 9,
    name: "Miso Soup",
    description:
      "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    price: 0.16,
    locationId: "1",
  },
  {
    id: 10,
    name: "Fresh Fruit Salad",
    description: "Fusce consequat.",
    price: 12.54,
    locationId: "1",
  },
];

export const locations = [
  {
    id: "1",
    name: "Hollywood",
    location: "1000 Hollywood Blvd, Hollywood, California",
    menuItems: earthMenuItems,
  },
  {
    id: "2",
    name: "Nüwa",
    location: "123 Red Dust Lane, Ares, Mars",
    menuItems: martianMenuItems,
  },
];

export const menuItems = [...martianMenuItems, ...earthMenuItems];
