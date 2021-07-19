export const numericIntValidator = (value) => {
  const numVal = value.replace(/[^0-9]/g, '');
  return numVal;
};

export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return num / 1000 + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return num / 1000000 + 'M'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num + 'K'; // if value < 1000, nothing to do
  }
};

export const priceFormatter = (price, isWithoutCurrencyStyle = false) => {
  if (isWithoutCurrencyStyle) {
    return price.toLocaleString('en-US', {
      currency: 'USD',
      minimumFractionDigits: 0,
    });
  } else {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
  }
};
