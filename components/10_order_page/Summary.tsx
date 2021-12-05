/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useCallback, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import Link from "next/link";

import axios from "axios";

import type { OrderStatus } from "@prisma/client";

import type { PropsI } from "@/pages/order/[orderId]";

import {
  calculatePriceWithoutShipping,
  calculateTotalPrice,
  getItemWithQuantityAndPrice,
} from "@/lib/order/calculateOrderPrice";
import formatPrice from "@/util/formatPrice";

import Tasks from "./Tasks";

import countries from "../../countries_n_states/3_countries_by_key.json";
import states from "../../countries_n_states/3_countries_by_key.json";
//

const Summary: FC<{ order: PropsI["order"] }> = ({ order }) => {
  const [reqStatus, setReqStatus] = useState<"pending" | "idle">("idle");

  const { push: routerPush } = useRouter();

  // console.log({ order });

  if (!order) {
    return null;
  }

  //
  //

  const buyerKeys = [
    "nick",
    "email",
    "country",
    "regionOrState",
    "city",
    "streetAddress",
    "postalCode",
  ];
  const lables = {
    nick: "Name",
    email: "Email",
    country: "Country",
    regionOrState: "State",
    city: "City",
    streetAddress: "Address",
    postalCode: "ZIP",
  };
  //
  //
  return (
    <section css={[tw`mt-5`]}>
      <Tasks order={order} />
      <div tw="grid grid-cols-5">
        <div tw="transition-property[background-color] duration-1000 rounded-t-md dark:bg-gray-700 bg-__secondary_dark pb-6 col-span-5 lg:col-span-2 lg:mx-2 mx-2">
          <h1 tw=" py-6 border-b-2 dark:border-gray-500 text-xl text-gray-600 dark:text-gray-400 px-8">
            Order Summary
          </h1>
          <ul tw="py-6 border-b dark:border-gray-600 space-y-6 px-8">
            {order.items.map((item, i) => {
              return (
                <li
                  key={i + item.id}
                  css={[
                    css`
                      /*  & a {
                        
                        border: pink solid 8px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        height: 28px;

                        &:hover {
                          cursor: pointer;
                        }
                      } */
                    `,

                    tw`relative -left-3.5    dark:border-gray-600 border-b-2 border-gray-200`,
                  ]}
                >
                  {item && item.product && item.product.id && (
                    <Link href={`/product/${item.product.id}`}>
                      <a css={[tw`flex w-full cursor-pointer`]}>
                        <div tw="width[42%] flex flex-col">
                          <span tw="text-gray-600 dark:text-gray-300 text-sm md:text-lg font-semibold">
                            {item.product.name}
                          </span>

                          <span tw="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                            amount: {item.quantity}
                          </span>
                        </div>

                        <img
                          src={item.product.image}
                          alt={"Product: " + item.product.name}
                          tw="ml-auto rounded width[42%]"
                        />
                      </a>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div tw="pb-8 lg:col-span-3 col-span-5 space-y-8 lg:px-12 overflow-x-hidden">
          <div tw="rounded-2xl lg:mx-2 mx-4 mt-8">
            <section tw="transition-property[background-color] duration-1000 rounded-md dark:bg-gray-700 bg-__secondary_dark p-6">
              <h2 tw="uppercase tracking-wide text-lg font-semibold text-gray-700 dark:text-gray-400 my-2">
                Shipping & Billing Information
              </h2>
              <div tw="mb-3 shadow-lg rounded text-gray-600">
                {buyerKeys.map((key) => {
                  // @ts-ignore
                  const v: string = order.buyer[key];
                  // @ts-ignore
                  const l: string = lables[key];
                  // @ts-ignore
                  let value = l === "Country" ? countries[v]["name"] : v;
                  // @ts-ignore
                  value =
                    v === "US" && l === "State" ? states[v]["name"] : value;

                  if (v !== "US" && l === "State") {
                    return null;
                  }

                  return (
                    <span
                      key={key}
                      tw="flex border-b border-gray-200 dark:border-gray-600 h-12 py-3 items-center"
                    >
                      <span tw="user-select[none] text-sm ml-6 dark:text-gray-400">
                        {l}
                      </span>
                      <span tw="ml-auto mr-1 dark:text-gray-100">{value}</span>
                    </span>
                  );
                })}
              </div>
            </section>
          </div>
          <div tw="rounded-md lg:mx-2 mx-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
