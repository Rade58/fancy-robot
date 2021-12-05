/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Link from "next/link";

import type { PropsI } from "@/pages/profile/stats/[profileId]";

interface OrderListPropsI {
  fulfiledOrders: PropsI["payedOrders"];
  pendingOrders: PropsI["pendingOrders"];
}

const OrderList: FC<OrderListPropsI> = ({ fulfiledOrders, pendingOrders }) => {
  //
  // console.log({ fulfiledOrders, pendingOrders });

  return (
    <section css={[tw``]}>
      <h3
        id="purchases"
        tabIndex={-1}
        tw=" mb-10 ml-4 mt-10 text-center light:text-gray-700 dark:text-gray-200 text-2xl font-medium"
      >
        My Orders
      </h3>
      <div tw="px-1.5  width[fit-content] flex flex-col mx-auto items-center justify-center">
        <ul tw="flex flex-col mb-3">
          <li tw="ml-4">
            {fulfiledOrders.length !== 0 && (
              <h4 tw="mb-4 light:text-gray-500 dark:text-gray-400 align-self[flex-start]">
                Fulfilled Orders
              </h4>
            )}
          </li>

          {fulfiledOrders.map(({ id }) => {
            return (
              <li key={id} tw="width[100%] border-gray-400 flex flex-row mb-2">
                <Link href={`/order/${id}`}>
                  <a tw="shadow border select-none cursor-pointer dark:bg-gray-700 bg-pink-200 rounded-md flex flex-1 items-center p-4">
                    <div tw="flex-1 pl-1 md:mr-16">
                      <div tw=" md:text-lg text-sm dark:text-white">{id}</div>
                    </div>

                    <button tabIndex={-1} tw="w-12 text-right flex justify-end">
                      <svg
                        width="12"
                        fill="currentColor"
                        height="12"
                        tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul tw="mb-3 flex flex-col">
          <li tw="ml-4">
            {pendingOrders.length !== 0 && (
              <h4 tw="mb-4 light:text-gray-500 dark:text-gray-400 align-self[flex-start]">
                Pending Orders
              </h4>
            )}
          </li>

          {pendingOrders.map(({ id }) => {
            return (
              <li key={id} tw="width[100%] border-gray-400 flex flex-row mb-2">
                <Link href={`/order/${id}`}>
                  <a tw="shadow border select-none cursor-pointer dark:bg-gray-700 bg-pink-200 rounded-md flex flex-1 items-center p-4">
                    <div tw="flex-1 pl-1 md:mr-16">
                      <div tw="text-sm md:text-lg font-medium dark:text-white">
                        {id}
                      </div>
                    </div>

                    <button tabIndex={-1} tw="w-12 text-right flex justify-end">
                      <svg
                        width="12"
                        fill="currentColor"
                        height="12"
                        tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OrderList;
