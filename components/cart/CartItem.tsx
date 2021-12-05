/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { EE, fse, cartService } from "@/machines/cart_machine";
// import { fse as fsee, hamburgerService } from "@/machines/hamburger_machine";
import {
  fse as fsee,
  EE as EEE,
  headerNCartService,
} from "@/machines/header_n_cart_machine";

import formatPrice from "@/util/formatPrice";

import Alert from "../alerts/Alert";

// import type { CartItemI } from "@/lib/storage";

interface PropsI {
  itemId: string;
}

const CartItem: FC<PropsI> = ({ itemId }) => {
  const [outOfBoundsUp, setOutOfBoundsUp] = useState<boolean>(false);

  const [cartState, dispatchToCart] = useActor(cartService);

  const [{ value: hVal }, dispatch] = useActor(headerNCartService);

  // const [] = useActor(hamburgerService);

  const { cart, totalPrice } = cartState.context;

  const itemData = cart[itemId];

  if (!itemData) {
    return null;
  }

  if (!itemData.name) {
    return null;
  }

  const { name, price, image, count, countInStock } = itemData;

  // console.log({ countInStock, count });

  /*   useEffect(() => {

    if(countInStock)

  }, [setOutOfBoundsUp, countInStock, count]) */

  const handleIncr = () => {
    if (countInStock === count) {
      setOutOfBoundsUp(true);

      return;
    }

    setOutOfBoundsUp(false);

    dispatchToCart({
      type: EE.UP_COUNT,
      payload: {
        prodId: itemId,
      },
    });
  };

  const handleDecr = () => {
    if (count === 1) {
      dispatchToCart({
        type: EE.REMOVE,
        payload: {
          prodId: itemId,
        },
      });

      // console.log({ totalPrice });

      if (totalPrice - price === 0) {
        dispatch({
          type: EEE.TOGGLE,
        });
      }

      return;
    }

    dispatchToCart({
      type: EE.DOWN_COUNT,
      payload: {
        prodId: itemId,
      },
    });
  };

  const handleRemove = () => {
    dispatchToCart({
      type: EE.REMOVE,
      payload: {
        prodId: itemId,
      },
    });

    if (totalPrice - count * price === 0) {
      dispatch({
        type: EEE.TOGGLE,
      });
    }
  };

  return (
    <li
      // key={`${item.id}-${item.count}`}
      tw="flex flex-col py-6 sm:flex-row sm:justify-between"
    >
      <div tw="flex w-full space-x-2 sm:space-x-4">
        <img
          tw="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
          // src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
          src={image}
          alt={name}
        />
        <div tw="flex flex-col justify-between w-full pb-4">
          <div tw="flex justify-between w-full pb-0 space-x-2">
            <div tw="space-y-1">
              <h3 tw="text-lg font-semibold leading-snug sm:pr-8">{name}</h3>
              {/* <p tw="text-sm dark:text-gray-700">Classic</p> */}
            </div>
            <div tw="text-right">
              <p tw="text-lg font-semibold">
                {formatPrice(price, "EUR")}
                {/* € */}
              </p>
              <p tw="text-sm line-through dark:text-gray-600">
                {formatPrice(price + 10.99, "EUR")}
                {/* € */}
              </p>
            </div>
          </div>
          <div tw="flex text-sm divide-x">
            <button
              disabled={hVal === fsee.header_visible}
              onClick={() => {
                handleRemove();
              }}
              type="button"
              tw="flex items-center px-2 py-1 pl-0 space-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                tw="w-4 h-4 fill-current"
              >
                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                <rect width="32" height="200" x="168" y="216"></rect>
                <rect width="32" height="200" x="240" y="216"></rect>
                <rect width="32" height="200" x="312" y="216"></rect>
                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
              </svg>
              <span>Remove</span>
            </button>
            <button
              disabled={hVal === fsee.header_visible}
              type="button"
              tw="flex items-center px-2 py-1 space-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                tw="w-4 h-4 fill-current"
              >
                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
              </svg>
              <span>Add to favorites</span>
            </button>
          </div>
          <div
            tw="h-8 w-28"
            css={css`
              & input:focus,
              & button:focus {
                /* outline: none !important; */
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
              Count:
            </label>
            <div tw="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
              <button
                disabled={hVal === fsee.header_visible}
                onMouseDown={() => {
                  handleDecr();
                }}
                onKeyPress={(e) => {
                  // console.log(e.key);
                  if (e.key === "Enter") {
                    handleDecr();
                  }
                }}
                data-action="decrement"
                tw="focus:outline-black bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer"
              >
                <span tw="m-auto text-2xl font-thin">−</span>
              </button>
              <span
                // type="number"
                tw=" text-center w-full bg-gray-300 font-semibold text-sm user-select[none]  md:text-base cursor-default flex items-center text-gray-700 justify-center"
                // name="custom-input-number"
                // value={count}
              >
                {count}
              </span>
              <button
                disabled={hVal === fsee.header_visible}
                onMouseDown={() => {
                  handleIncr();
                }}
                onKeyPress={(e) => {
                  // console.log(e.key);
                  if (e.key === "Enter") {
                    handleIncr();
                  }
                }}
                data-action="increment"
                tw="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span tw="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {outOfBoundsUp && (
        <Alert
          visible={true}
          text=""
          header="We don't have more of that product"
          variant="info"
        />
      )}
    </li>
  );
};

export default CartItem;
