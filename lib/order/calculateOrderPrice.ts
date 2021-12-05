import type { ExpectedDataProps } from "@/pages/place-order/[orderId]";

export function calculateTotalPrice(order: ExpectedDataProps["order"]) {
  const { items, shippingPrice: sp, taxPrice: tp } = order;

  const shippingPrice = parseFloat(sp);
  const taxPrice = tp || 14.66;

  let total = shippingPrice;

  items.forEach((item) => {
    const { price: p } = item.product;
    const { quantity } = item;

    const price = parseFloat(p);

    total = total + quantity * price;
  });

  total = total + (taxPrice * total) / 100;

  return total;
}

export function calculatePriceWithoutShipping(
  order: ExpectedDataProps["order"]
) {
  const { items, taxPrice: tp } = order;

  const taxPrice = tp || 14.66;

  let total = 0;

  items.forEach((item) => {
    const { price: p } = item.product;
    const { quantity } = item;

    const price = parseFloat(p);

    total = total + quantity * price;
  });

  total = total + (taxPrice * total) / 100;

  return total;
}

export function getItemWithQuantityAndPrice(
  item: ExpectedDataProps["order"]["items"][0]
) {
  const productQuantity = item.quantity;

  const productPrice = parseFloat(item.product.price);

  return {
    quantity: productQuantity,
    price: productPrice,
    amount: productQuantity * productPrice,
  };
}

export const caclPercents = (taxPrice: number, amount: number) => {
  return (taxPrice * amount) / 100;
};
