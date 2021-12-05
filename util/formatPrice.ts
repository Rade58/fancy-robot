const formatterUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const formatterEur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatPrice = (price: number | string, currency: "USD" | "EUR") => {
  let amount: number;

  if (typeof price === "string") {
    amount = parseFloat(price);
  } else if (typeof price === "number") {
    amount = price;
  } else {
    amount = 0;
  }

  if (currency === "EUR") {
    return formatterEur.format(amount);
  }

  if (currency === "USD") {
    return formatterUsd.format(amount);
  }
};

export default formatPrice;
