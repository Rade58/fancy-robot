/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { useSession } from "next-auth/react";

import type { PropsI as ProductPropsI } from "@/pages/product/[productId]";

import { cartService, fse, EE } from "@/machines/cart_machine";

import formatPrice from "@/util/formatPrice";

import {
  headerNCartService,
  EE as EEE,
} from "@/machines/header_n_cart_machine";

import OutOfStockInfo from "./OutOfStockInfo";
import Rating from "../products/Rating";
import Alert from "../alerts/Alert";
import Info from "../info/Info";
import Button from "../buttons/Button";
import AddToFavorites from "../favorites/AddToFavorites";

import { FALLBACK_PHOTO } from "@/constants/index";

interface PropsI {
  product: ProductPropsI["product"];
  favorite: ProductPropsI["favorite"];
}

const ProductView: FC<PropsI> = ({ product, favorite }) => {
  const [cartState, dispatch] = useActor(cartService);

  const [canBlurStop, setCanBlurStop] = useState<boolean>(false);

  const { data } = useSession();

  const [__, disp] = useActor(headerNCartService);

  const [imageErrored, setImageErrored] = useState<boolean>(false);

  const {
    context: { cart, modify_disabled },
  } = cartState;

  const productIsNotInTheCart = cart[product.id] === undefined;

  // console.log({ productIsNotInTheCart });

  const [productCount, setProductCount] = useState<number>(1);

  const [outOfBoundsUp, setOutOfBoundsUp] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setCanBlurStop(true);
    }, 5);
  }, [setCanBlurStop]);

  if (product === null) {
    return null;
  }

  const { description, name, image, price, countInStock, averageRating } =
    product;

  const handleCountUp = () => {
    if (countInStock === productCount) {
      setOutOfBoundsUp(true);
      return;
    }

    setProductCount((count) => count + 1);

    return;
  };

  const handleCountDown = () => {
    //

    if (productCount === 1) {
      return;
    }

    setProductCount((count) => count - 1);
    setOutOfBoundsUp(false);

    return;
  };

  // console.log({ countInStock, outOfBoundsUp, productCount });

  return (
    <Fragment>
      <div tw="w-full md:flex md:items-center mt-14 md:px-5">
        <div tw="align-self[flex-start] mt-8 w-full h-72 md:w-1/2 lg:h-96">
          <div
            tw="h-full mx-1.5 blur-2xl transition-all transition-duration[1s]"
            style={{ filter: canBlurStop ? "blur(0)" : "blur(40px)" }}
          >
            <img
              tw="h-full w-full rounded-md object-cover max-w-lg mx-auto"
              src={!imageErrored ? image : FALLBACK_PHOTO}
              alt="product"
              onError={(e) => {
                setImageErrored(true);
              }}
            />
          </div>
        </div>
        <div tw="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 tw="dark:text-gray-300 text-gray-700 uppercase text-lg ml-7">
            {name}
          </h3>
          <Rating value={averageRating} />
          <span tw="text-gray-500 mt-3 ml-7">{formatPrice(price, "EUR")}</span>

          <hr tw="my-3 w-11/12 mx-auto" />
          <p tw="dark:text-gray-400 text-gray-500 px-5 md:px-6">
            {description}
          </p>
          <hr tw="my-3 w-11/12 mx-auto" />
          <div tw="margin-left[22px] flex align-items[center]">
            <AddToFavorites
              favorite={favorite}
              productId={product.id}
              productName={name}
            />
          </div>
          {data && <hr tw="my-3 w-11/12 mx-auto" />}
          <div
            css={[
              /* productIsNotInTheCart ? tw`h-32` : tw`h-14` ,*/ tw`mt-4 h-32`,
            ]}
          >
            {!productIsNotInTheCart ? (
              <div tw="mt-8 mx-2">
                <Info boldText="Product added to the cart" variant="blue">
                  <div tw="mt-2.5">
                    <Button
                      onClick={() => {
                        disp({
                          type: EEE.TOGGLE,
                        });
                      }}
                      variant="primary"
                    >
                      See cart
                    </Button>
                  </div>
                </Info>
              </div>
            ) : (
              <Fragment>
                {countInStock !== 0 ? (
                  <Fragment>
                    <div tw="mt-2">
                      <label
                        tw="flex justify-center dark:text-gray-400 text-gray-700 text-sm"
                        htmlFor="count"
                      >
                        <span>Count:</span>
                      </label>
                      <div tw="flex justify-center">
                        <div tw="flex items-center mt-1">
                          <button
                            disabled={modify_disabled}
                            onMouseDown={() => {
                              handleCountUp();
                            }}
                            tw="text-gray-500 focus:outline-none focus:text-gray-600"
                          >
                            <svg
                              tw="h-5 w-5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                          <span tw="w-5 text-align[center] dark:text-gray-50 text-gray-700 text-lg mx-2">
                            {productCount}
                          </span>
                          <button
                            disabled={modify_disabled}
                            onMouseDown={() => {
                              handleCountDown();
                            }}
                            tw="text-gray-500 focus:outline-none focus:text-gray-600"
                          >
                            <svg
                              tw="h-5 w-5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div tw="flex items-center mt-6 justify-center sm:justify-center  md:justify-center">
                      <button
                        disabled={modify_disabled}
                        onClick={() => {
                          dispatch({
                            type: EE.ADD,
                            payload: {
                              item: {
                                count: productCount,
                                id: product.id,
                                name: product.name,
                                price: parseFloat(product.price),
                                image: product.image,
                                countInStock,
                              },
                            },
                          });
                        }}
                        tw="mb-6 flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                      >
                        Add To Cart
                        <span tw="ml-1">
                          <svg
                            tw="h-5 w-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </Fragment>
                ) : (
                  <div tw="mt-1.5">
                    <OutOfStockInfo countInStock={0} />
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
      {outOfBoundsUp && (
        <Alert
          visible={true}
          header="Not enough products in stock"
          text="Yo are trying to buy more than we currently have"
          variant="info"
        />
      )}
    </Fragment>
  );
};

export default ProductView;
