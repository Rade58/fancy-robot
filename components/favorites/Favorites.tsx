/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Link from "next/link";
import axios from "axios";

import { useActor } from "@xstate/react";
import { EE, cartService } from "@/machines/cart_machine";
import type { PropsI as PIn } from "@/pages/profile/stats/[profileId]";

import type { FavoritesDataTypeWhenDeleting } from "@/pages/api/product/favorite/[productId]";

// import Stringif from "@/components/dev-helpers/Stringified";

import formatPrice from "@/util/formatPrice";

import { heartColor } from "./AddToFavorites";

interface PropsI {
  favorites: PIn["favorites"];
}

const Favorites: FC<PropsI> = ({ favorites: initialFavorites }) => {
  const [favorites, setFavorites] =
    useState<typeof initialFavorites>(initialFavorites);

  const [{ value, context }, dispatch] = useActor(cartService);

  const { cart } = context;

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const removeFavorite = async (favId: string) => {
    // console.log(favorites.length);

    if (favorites.length === 0) {
      return;
    }

    try {
      setReqStatus("pending");
      // HITTING DELETION ENDPOINT
      const { data: d } = await axios.delete(`/api/product/favorite/${favId}`);

      const data = d as FavoritesDataTypeWhenDeleting;

      setFavorites((prev) => data.favorites);

      setReqStatus("idle");
    } catch (err) {
      // @ts-ignore
      // console.log(err.message);
      console.error(err);

      setReqStatus("idle");
    }
  };

  // console.log(reqStatus);

  return (
    <Fragment>
      <h3
        id="favorites"
        tabIndex={-1}
        tw="text-center ml-4 mt-10 light:text-gray-700 dark:text-gray-200 text-2xl font-medium"
      >
        {favorites.length !== 0 && "My Favorite Products"}
      </h3>

      {/* <section css={[tw``]}>
        <Stringif data={favorites} />
      </section> */}
      {
        <div tw="flex flex-col justify-center">
          <div tw="relative m-3 flex flex-wrap mx-auto justify-center">
            {favorites.map(
              (
                {
                  id,
                  product: { name, image, price, id: productId, countInStock },
                },
                i
              ) => {
                return (
                  <Link key={`${id}-${i}`} href={`/product/${productId}`}>
                    <a tw="dark:bg-gray-700 bg-pink-200 relative max-w-sm min-w-[340px] shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                      <div tw="overflow-x-hidden rounded-2xl relative">
                        <img
                          tw="h-40 rounded-2xl w-full object-cover"
                          alt={name}
                          // src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
                          src={image}
                        />
                        {!cart[productId] && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();

                              dispatch({
                                type: EE.ADD,
                                payload: {
                                  item: {
                                    id: productId,
                                    count: 1,
                                    countInStock,
                                    image,
                                    name,
                                    price: parseFloat(price),
                                  },
                                },
                              });
                            }}
                            tw="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              tw="h-6 w-6 group-hover:opacity-50 opacity-70"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="black"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div tw="mt-4 pl-2 mb-2 flex justify-between ">
                        <div>
                          <p tw="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-0">
                            {name}
                          </p>
                          <p tw="text-gray-800 dark:text-gray-400 mt-0">
                            {formatPrice(price, "EUR")}
                          </p>
                        </div>
                        <button
                          disabled={reqStatus === "pending"}
                          onClick={(e) => {
                            e.preventDefault();
                            removeFavorite(productId);
                          }}
                          css={[
                            css`
                              &:hover {
                                & div svg:nth-of-type(1) {
                                  ${tw`light:stroke[#935cd1] stroke[#8a1f51]`}
                                }

                                /* & > svg {
                            fill: #e68ec1;
                            stroke: #852b5f;
                          } */
                              }
                            `,
                            tw`flex relative flex-col-reverse mb-1 mr-4 cursor-pointer`,
                          ]}
                        >
                          <div
                            css={[
                              tw`absolute top[30px] width[fit-content]  border-__hazard_outline_focus`,
                            ]}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              tw="h-4 w-4 dark:stroke[white] stroke[black]"
                              fill="none"
                              viewBox="0 0 24 24"
                              // stroke="red"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            tw="h-6 w-6 group-hover:opacity-70"
                            fill={heartColor}
                            viewBox="0 0 24 24"
                            stroke={heartColor}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </a>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      }
    </Fragment>
  );
};

export default Favorites;

/*

<div tw="min-h-screen bg-gray-100 flex flex-col justify-center">
  <div tw="relative m-3 flex flex-wrap mx-auto justify-center">

    <div tw="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
      <div tw="overflow-x-hidden rounded-2xl relative">
        <img tw="h-40 rounded-2xl w-full object-cover" src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg">
        <p tw="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </p>
      </div>
      <div tw="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <p tw="text-lg font-semibold text-gray-900 mb-0">Product Name</p>
          <p tw="text-md text-gray-800 mt-0">$340</p>
        </div>
        <div tw="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div tw="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
      <div tw="overflow-x-hidden rounded-2xl relative">
        <img tw="h-40 rounded-2xl w-full object-cover" src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg">
        <p tw="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </p>
      </div>
      <div tw="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <p tw="text-lg font-semibold text-gray-900 mb-0">Product Name</p>
          <p tw="text-md text-gray-800 mt-0">$340</p>
        </div>
        <div tw="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" tw="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    </div>

  </div>
</div>

*/

/*
// circle x

<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


// heart

<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
</svg>

*/
