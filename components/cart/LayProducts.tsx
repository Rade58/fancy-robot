/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { cartService } from "@/machines/cart_machine";

import { headerNCartService, EE, fse } from "@/machines/header_n_cart_machine";

import type { CartType } from "@/lib/storage";

import formatPrice from "@/util/formatPrice";

import CartItem from "./CartItem";

import CreateOrder from "./CreateOrder";

function makeArrayFromCart(cart: CartType) {
  const cartArray = [];

  for (const k in cart) {
    cartArray.push(cart[k]);
  }

  return cartArray;
}

const LayProducts: FC = () => {
  const [cartState] = useActor(cartService);
  const [{ value }, dispatch] = useActor(headerNCartService);

  const { context: cartContext } = cartState;

  const { cart, totalPrice, modify_disabled } = cartContext;

  // const shouldCloseCart = totalPrice === 0;
  // console.log({ shouldCloseCart, totalPrice });

  /* useEffect(() => {
    if (totalPrice !== 0) return;

    dispatch({
      type: EE.TOGGLE,
    });
  }, [totalPrice, dispatch]); */

  // console.log({ cart });

  // DONT WANT TO SEE THIS TEMOPRRARY BECAUSE OF ERRORS

  // return null;

  const cartArray = makeArrayFromCart(cart);

  return (
    <section tw=" overflow-y-auto w-full">
      <div tw="dark:bg-gray-800 mx-auto flex flex-col max-w-3xl p-6 space-y-4 sm:p-10  dark:text-gray-100">
        <h2 tw="text-xl font-semibold">Your cart</h2>
        <ul
          tw="flex flex-col divide-gray-700"
          css={css`
            /* & li::before {
              content: "";
              display: flex;
              position: absolute;
              width: 100%;
              height: 4px;
              margin-bottom: 12px;
              border-bottom: ${theme`colors.y`} solid 1px;
              align-self: flex-end;
              justify-self: flex-start;
            } */

            & li {
              /* background-color: ${theme`colors.l`}; */
              border-bottom: #12151d solid 2px !important;
            }
          `}
        >
          {cartArray.map((item) => {
            const { id, countInStock } = item;

            return <CartItem itemId={id} key={`${item.id}-${item.count}`} />;
          })}
        </ul>
        <div tw="space-y-1 text-right">
          <p>
            Total amount:{" "}
            <span tw="font-semibold">
              {formatPrice(totalPrice, "EUR")}
              {/*  € */}
            </span>
          </p>
          <p tw="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div tw="flex justify-end space-x-4">
          <button
            disabled={value === fse.header_visible || modify_disabled}
            onClick={() => {
              dispatch({
                type: EE.TOGGLE,
              });
            }}
            type="button"
            tw="px-6 py-2 border rounded-md dark:border-gray-800"
          >
            Back
            <span tw="sr-only sm:not-sr-only"> to shop</span>
          </button>
          {/* <button
            disabled={value === fse.header_visible}
            type="button"
            tw="px-6 py-2 border rounded-md dark:bg-gray-400 dark:text-gray-900 dark:border-gray-400"
          >
            <span tw="sr-only sm:not-sr-only">Continue to </span>Checkout
          </button> */}
          <CreateOrder />
        </div>
      </div>
    </section>
  );
};

export default LayProducts;

//
//
//
//
/* const a = () => {
  return (
    // custom-number-input
    <div
      tw="h-8 w-28"
      css={css`
        & input:focus,
        & button:focus {
          outline: none !important;
        }

        & input[type="number"]::-webkit-inner-spin-button,
        & input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}
    >
      <label
        htmlFor="custom-input-number"
        tw="w-full text-gray-700 text-sm font-semibold"
      >
        Count
      </label>
      <div tw="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          tw=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span tw="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          tw=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-sm hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          value="0"
        ></input>
        <button
          data-action="increment"
          tw="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span tw="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}; */

{
  /* <style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style> */
}
{
  /* 
<script>
  function decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    target.value = value;
  }

  function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
  }

  const decrementButtons = document.querySelectorAll(
    `button[data-action="decrement"]`
  );

  const incrementButtons = document.querySelectorAll(
    `button[data-action="increment"]`
  );

  decrementButtons.forEach(btn => {
    btn.addEventListener("click", decrement);
  });

  incrementButtons.forEach(btn => {
    btn.addEventListener("click", increment);
  });
</script> */
}
