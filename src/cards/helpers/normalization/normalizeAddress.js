const normalizeAddress = (cardAddress) => {
  const fullAddress = `${cardAddress.street} ${cardAddress.houseNumber} ${cardAddress.city} ${cardAddress.country}`;
  return fullAddress;
};
export default normalizeAddress;
