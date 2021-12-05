/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect, useState } from "react";
import cuid from "cuid";

import axios from "axios";

import cartCook from "@/lib/storage";

import navHist from "@/lib/storage/auth_nav_history";

const useManualTest = () => {
  useEffect(() => {
    const image = `https://source.unsplash.com/800x600/?chips`;

    // ------- TESTING CART FUNCTIONS  ------------------------
    // --------------------------------------------------------

    // TESTING ERRORS FIRST
    // REMOVING FROM NON EXISTING CART SHOULD RESULT IN AN ERROR
    try {
      cartCook.removeFromCart(cuid());
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }
    try {
      // GETTING NON ITEM WITHOUT THE EXISTING CART
      cartCook.getItem(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("GETTING ITEM", err.message);
    }
    // TRYING TO INCRESE/DECRESE COUNT ON NON EXISTING PRODUCT SHOULD RESULT IN ERROR
    try {
      cartCook.increaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("INCREASING COUNT", err.message);
    }
    try {
      cartCook.decreaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("DECREASING COUNT", err.message);
    }
    // TRYING TO INCRESE/DECREASE COUNT FOR NON EXISTING ITEM SHOULD RESULT IN ERROR
    try {
      cartCook.addToCart({
        id: cuid() + 3,
        count: 1,
        name: "some",
        price: 666,
        countInStock: 6,
        image,
      });

      cartCook.increaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("INCREASING COUNT", err.message);
    }
    try {
      cartCook.decreaseItemCount(cuid());
    } catch (err) {
      // @ts-ignore
      console.log("DECRE COUNT", err.message);
    }
    // REMOVING SHOUD GIVE ERROR THAT ITEM DOESN'T EXIST
    try {
      cartCook.removeFromCart(cuid());
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }

    // TESTING ADDING TO CART AND GETTING FROM CART
    const item1Id = cuid();
    const item1Count = 6;

    const item1 = cartCook.addToCart({
      id: item1Id,
      count: item1Count,
      name: "Blam",
      price: 666.6,
      countInStock: 6,
      image,
    });

    const sameItem1 = cartCook.getItem(item1Id);

    console.log("ONE", item1.id === sameItem1?.id);

    console.log("TWO", item1.id === item1Id);

    console.log("THREE", sameItem1?.id === item1Id);

    console.log({ item1, sameItem1 });

    console.log({ CARTCARTCART: cartCook.getCart() });

    // TESTING INCREASING THE COUNT
    cartCook.increaseItemCount(item1.id);

    // SHOULD BE 7 NOW
    const sameItemThird = cartCook.getItem(item1.id);
    console.log("SHOULD BE 7", sameItemThird?.count === 7);

    cartCook.decreaseItemCount(item1.id);
    // SHOULD BE 6 now
    const sameItemFour = cartCook.getItem(item1.id);

    console.log("SHOULD BE 6 AGAIN", sameItemFour?.count === 6);

    // CREATING ONE ITEM SHOULD'T ERASE OTHER ITEM
    const newItem2Id = cuid();
    const newItem3Id = cuid();

    const newItem2 = cartCook.addToCart({
      id: newItem2Id,
      count: 3,
      name: "foo",
      price: 69,
      countInStock: 6,
      image,
    });

    const newItem3 = cartCook.addToCart({
      id: newItem3Id,
      count: 4,
      name: "bar",
      price: 126,
      countInStock: 6,
      image,
    });

    const newItem2Again = cartCook.getItem(newItem2Id);
    const newItem3Again = cartCook.getItem(newItem3Id);

    console.log("ITEM EXISTS", newItem2Again?.name === "foo");
    console.log("ITEM EXISTS", newItem3Again?.name === "bar");

    // GETTING THE CART
    const cart = cartCook.getCart();

    console.log({ cart });

    // CART SHOULD HAVE 4 ITEMS NOW
    const keys = Object.keys(cart || {});

    console.log("SHOULD HAVE THREE KEYS", keys.length === 4);

    // ERASING CART
    cartCook.eraseCart();

    const cartAgain = cartCook.getCart();

    console.log({ cartAgain });

    const keysAgain = Object.keys(cartAgain || {});

    console.log("ZERO ITEMS", keysAgain.length === 0);

    const newItemId = cuid();

    const newItem = cartCook.addToCart({
      id: newItemId,
      count: 22,
      name: "you look cool",
      price: 46.0,
      countInStock: 6,
      image,
    });
    const newItem22 = cartCook.addToCart({
      id: cuid(),
      count: 46,
      name: "some good product",
      price: 666.66,
      countInStock: 6,
      image,
    });
    console.log({ newItem, newItem22 });

    const crt = cartCook.getCart();

    console.log({ "ENTIRE CART": crt });

    // REMOVING FROM CART
    const itemIntendedForRemoval = cartCook.getItem(newItem.id);

    console.log({ itemIntendedForRemoval });

    cartCook.removeFromCart(itemIntendedForRemoval?.id as string);

    // CHECKING IF IT IS REMOVED

    const removedItem = cartCook.getItem(itemIntendedForRemoval?.id as string);

    console.log({ removedItem });

    const myCart = cartCook.getCart();

    console.log({ myCart });

    console.log("REMOVED ITEM IS undefined", removedItem === undefined);
    // @ts-ignore
    console.log("THIS SHOULD BE undefined", myCart[removedItem?.id as string]);

    axios.get("/api/foo").then((data) => {
      console.log({ data });
    });

    // --------------------------------------------------------
    // --------------------------------------------------------
    try {
      const a = navHist.setNavHistory("a");
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }
    //
    try {
      const a = navHist.setNavHistory("/");
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }

    const one = navHist.setNavHistory("http://some");
    console.log({ one });

    const oneAgain = navHist.getNavHistory();

    console.log({ one, oneAgain }, one === oneAgain);

    const clearedNavHistory = navHist.clearNavHistory();

    const navHistAg = navHist.getNavHistory();
    console.log("CLEARED AUTH NAV HIST", clearedNavHistory === navHistAg);
    /*
     */
  }, []);
};

export default useManualTest;
