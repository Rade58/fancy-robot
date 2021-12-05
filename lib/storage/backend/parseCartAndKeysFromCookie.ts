import { CART } from "@/constants/cart";
import type { CartType } from "@/lib/storage";

const parseCartFromCookie = (cookies: Record<string, string>) => {
  //
  const cartString = cookies[CART];

  if (!cartString) {
    // throw new Error(`There is no ${CART} on the cookie!`);
    return null;
  }

  const cart = JSON.parse(cartString);

  if (typeof cart !== "object") {
    return null;
  }

  const keys = Object.keys(cart);

  return { cart: cart as CartType, keys };
};

export default parseCartFromCookie;
