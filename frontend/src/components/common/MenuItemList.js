import React from "react";
import { handlePriceConversion } from "../../utils/utils";

const MenuItem = ({
  locationId,
  item,
  handleAddToCart,
  handleSubtractFromCart,
  handleRemoveFromCart,
  itemQuantity,
}) => {

  return (
    <li key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${handlePriceConversion(item.price)}</p>
      <div className="flex flex-row">
        <div className="flex flex-row items-center">
          <button
            className="p-1 border"
            onClick={() => handleAddToCart(locationId, item.id, 1)}
          >
            Add to Cart
          </button>
          <button
            className="p-1 border"
            onClick={() => handleSubtractFromCart(locationId, item.id)}
          >
            Subtract from Cart
          </button>
          <button
            className="p-1 border"
            onClick={() => handleRemoveFromCart(locationId, item.id)}
          >
            Remove from Cart
          </button>
          <div>
            {itemQuantity > 0 ? (
              <div className="font-bold">Count: {itemQuantity}</div>
            ) : (
              <>{""}</>
            )}
          </div>
        </div>
      </div>
      <hr />
    </li>
  );
};

const MenuItemsList = ({
  menuItems,
  handleAddToCart,
  handleSubtractFromCart,
  handleRemoveFromCart,
  itemQuantities,
}) => {
  return (
    <ul>
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          item={menuItem}
          handleAddToCart={handleAddToCart}
          handleSubtractFromCart={handleSubtractFromCart}
          handleRemoveFromCart={handleRemoveFromCart}
          itemQuantity={itemQuantities[menuItem.id] || 0}
        />
      ))}
    </ul>
  );
};

export default MenuItemsList;
