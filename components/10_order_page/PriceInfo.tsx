/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";

const PriceInfo: FC<{ prices: PropsI["sumasAndPrices"] }> = ({ prices }) => {
  //

  return (
    <section
      css={[
        tw`flex justify-center align-items[center] mt-8 text-3xl font-bold dark:text-gray-400 text-gray-800`,
      ]}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-10 w-10 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span tw="drop-shadow-2xl shadow-2xl">{prices.formated.totalPrice}</span>
    </section>
  );
};

export default PriceInfo;
