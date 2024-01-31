// convert pennies to dollars and format
export const handlePriceConversion = (priceInCents) => {
  return (priceInCents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};