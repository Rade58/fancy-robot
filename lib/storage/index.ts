import cook from "js-cookie";
import { CART } from "@/constants/cart";

// TODO: NEED TO USE localStorage INSTEAD OF cookie

// TYPES

export interface CartItemI {
  id: string;
  name: string;
  price: number;
  count: number;
  image: string;
  countInStock: number;
}

/**
 * @description key (string) IS id OF PRODUCT
 */
export type CartType = Record<string, CartItemI>;

// ---- UTILITIES ---------------------------------------------
// ------------------------------------------------------------
//
const checkIfcartExistsAndCreateItIfDoesnt = () => {
  if (!localStorage) {
    let cartString: string | undefined;

    cartString = cook.get(CART);

    if (!cartString) {
      cartString = cook.set(CART, JSON.stringify({}), {
        secure: true,
        sameSite: "Strict",
      });
    }

    if (!cartString) {
      throw new Error(
        "Something is wrong with the checking if cart exists and creating it if doesn't"
      );
    }

    return JSON.parse(cartString) as CartType;
  }

  // DOING THIS FOR localStorage

  let cartString: string | null;

  cartString = localStorage.getItem(CART);

  if (!cartString) {
    localStorage.setItem(CART, JSON.stringify({}));
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    throw new Error(
      "Something is wrong with the checking if cart exists and creating it if doesn't"
    );
  }

  return JSON.parse(cartString) as CartType;
};
//
const parseCart = (cartString: string) => {
  const cartObjct = JSON.parse(cartString);

  return cartObjct as CartType;
};
//
// ------------------------------------------------------------
// ------------------------------------------------------------

//
const calculateTotalPrice = () => {
  const cart = checkIfcartExistsAndCreateItIfDoesnt();

  let total: number = 0;

  for (const key in cart) {
    total += cart[key].count * cart[key].price;
  }

  return total;
};
// ------------------------------------------------------------
// ------------------------------------------------------------
//
// "CRUD" TO THE COOKIE
const addToCart = (item: CartItemI) => {
  checkIfcartExistsAndCreateItIfDoesnt();

  let cartString: string | undefined | null;

  if (!localStorage) {
    // CHECK IF INPUUT ALREADY EXISTS (TROW ERROR IF DOES)
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  const cart = parseCart(cartString || ""); //   || won't happen ever (just for typescript purposes)

  if (cart[item.id]) {
    throw new Error("Item with that id already exists in cart");
  }

  const { id, name, count, price, image, countInStock } = item;

  cart[item.id] = {
    id,
    name,
    count,
    price,
    image,
    countInStock,
  };
  // DON'T FORGET TO STRINGIFY

  let newItem: string | undefined | null;

  if (!localStorage) {
    newItem = cook.set(CART, JSON.stringify(cart), {
      secure: true,
      sameSite: "Strict",
    });
  } else {
    localStorage.setItem(CART, JSON.stringify(cart));
    newItem = localStorage.getItem(CART);
  }

  if (!newItem) {
    throw new Error("Couldn't set up item to the cart for some reason!");
  }

  return cart[item.id];
};

const removeFromCart = (id: string) => {
  let cartString: string | undefined | null;
  // IF THERE IS NO CART , WE SHOULD THROW ERROR
  if (!localStorage) {
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    throw new Error("You are trying to remove item but cart doesn't exist!");
  }

  const cart = parseCart(cartString);
  // WE NEED CONFIRMATION HERE, THAT ITEM ACTUALLY EXISTED

  const possibleItem = cart[id];

  if (!possibleItem) {
    throw new Error("Item you are trying to remove is not in the cart!");
  }

  delete cart[id];
  // DON'T FORGET TO STRINGIFY

  if (!localStorage) {
    cook.set(CART, JSON.stringify(cart), { secure: true, sameSite: "Strict" });
  } else {
    localStorage.setItem(CART, JSON.stringify(cart));
  }

  return id;
};

const eraseCart = () => {
  // GETTING CART

  let cartString: null | undefined | string;

  if (!localStorage) {
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    throw new Error("Can't remove car if cart doen't exit in the first place!");
  }

  if (!localStorage) {
    cook.set(CART, JSON.stringify({}), { secure: true, sameSite: "Strict" });
  } else {
    localStorage.setItem(CART, JSON.stringify({}));
  }

  // GET CART AGAIN
  const emptyCart = localStorage.getItem(CART) as string;

  return JSON.parse(emptyCart);
};

const increaseItemCount = (id: string) => {
  //
  let cartString: null | undefined | string;

  if (!localStorage) {
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    throw new Error("There is no cart");
  }

  const cart = parseCart(cartString);

  const item = cart[id];

  if (!item) {
    throw new Error("There is no item you want to increase");
  }

  item.count = item.count + 1;

  cart[id] = item;

  if (!localStorage) {
    cook.set(CART, JSON.stringify(cart), { secure: true, sameSite: "Strict" });
  } else {
    localStorage.setItem(CART, JSON.stringify(cart));
  }

  return cart;
};

const decreaseItemCount = (id: string) => {
  //
  let cartString: null | undefined | string;
  if (!localStorage) {
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    throw new Error("There is no cart");
  }

  const cart = parseCart(cartString);

  const item = cart[id];

  if (!item) {
    throw new Error("There is no item you want to decrease");
  }

  item.count = item.count - 1;

  cart[id] = item;
  if (!localStorage) {
    cook.set(CART, JSON.stringify(cart), { secure: true, sameSite: "Strict" });
  } else {
    localStorage.setItem(CART, JSON.stringify(cart));
  }

  return cart;
};

const getCart = () => {
  let cartString: string | null | undefined;
  if (!localStorage) {
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    return null;
  }

  return parseCart(cartString);
};

const getItem = (id: string) => {
  let cartString: undefined | null | string;
  if (!localStorage) {
    cartString = cook.get(CART);
  } else {
    cartString = localStorage.getItem(CART);
  }

  if (!cartString) {
    throw new Error("There is no cart");
  }

  const cart = parseCart(cartString);

  const item = cart[id];

  return item as typeof item | undefined;
};

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// WHEN MACHINE MOUNTS, WHEN OUR APP MOUNTS
// WE SHOULD GET CART AND ADD IT AS A CONTEXTUAL STATE IN THE MACHINE
/**
 *
 * @returns cart
 * @description getting cart (use this when you mount app), should call this
 * inside the machine when some event anounces that cart component is mounted
 */
const establishCartOnMounting = () => {
  //
  const cart = getCart();
  //
  if (cart) {
    return cart;
  }

  if (!localStorage) {
    cook.set(CART, JSON.stringify({}), { secure: true, sameSite: "Strict" });
  } else {
    localStorage.setItem(CART, JSON.stringify({}));
  }

  return {};
};
// ------------------------------------------------------------
// ------------------------------------------------------------
// WE SHOULD DEFINE THAT EVERY "CRUD"
// FUNCTION, AT ITS END, GETS CART
// AND THEN RETURN THAT CART
/**
 *
 * @param item cart item data
 * @returns cart
 * @description adding one product whith the count and rest of the stuff
 */
const add = (item: CartItemI) => {
  addToCart(item);

  return getCart() as CartType;
};
/**
 *
 * @param id string (product id)
 * @returns cart
 * @description removes specified product from the cart (entire product with all count)
 */
const remove = (id: string) => {
  removeFromCart(id);

  return getCart() as CartType;
};
/**
 *
 * @param id string (product id)
 * @returns cart
 * @description increases count by one for the specified product
 */
const increase = (id: string) => {
  increaseItemCount(id);
  return getCart() as CartType;
};
/**
 *
 * @param id string (product id)
 * @returns cart
 * @description decreases count of single product by one
 */
const decrease = (id: string) => {
  decreaseItemCount(id);
  return getCart() as CartType;
};
/**
 *
 * @returns empty cart
 * @description erases all items from the cart
 */
const erase = () => {
  eraseCart();
  return getCart() as CartType;
};

/**
 * @description info: first time adding to cart creates CART cookie
 */
const crud = {
  addToCart,
  removeFromCart,
  eraseCart,
  increaseItemCount,
  decreaseItemCount,
  calculateTotalPrice,
  getCart,
  getItem,
  // THESE FUNCTIONS WE ARE GOING TO USE INSIDE MACHINE
  method: {
    add,
    remove,
    increase,
    decrease,
    erase,
    establishCartOnMounting,
    calculateTotalPrice,
  },
};

export default crud;
