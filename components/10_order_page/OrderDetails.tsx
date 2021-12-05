/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

import type { PropsI } from "@/pages/order/[orderId]";

const OrderDetails: FC<PropsI> = ({ order, sumasAndPrices }) => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const acordData = [
    {
      name: "Shipping",
      Icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
    },
    {
      name: "Pricing",
      Icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <section css={[tw`border border-__warning`]}>
      {/*  */}

      <div tw="flex justify-center items-start my-2">
        <div tw="w-full sm:w-10/12 md:w-1/2 my-1">
          <h2 tw="text-xl font-semibold text-blue-50 mb-2">Order Info</h2>
          <ul tw="flex flex-col">
            {acordData.map(({ name, Icon }, i) => {
              return (
                <li
                  key={`${name}-${i}`}
                  tw="bg-white my-2 shadow-lg"
                  x-data="accordion(1)"
                >
                  <h2 tw="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer">
                    <span>{name}</span>
                    <svg
                      tw="fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                    </svg>
                  </h2>
                  <div
                    x-ref="tab"
                    tw="border-l-2 border-purple-600 overflow-hidden max-h-0 duration-500 transition-all"
                  >
                    <p tw="p-3 text-gray-900">{/*  */}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
