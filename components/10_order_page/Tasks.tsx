/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";

const Taks: FC<{ order: PropsI["order"] }> = ({ order }) => {
  const { payedAt, deliveredAt, status, id: orderId } = order;

  const data = [
    { name: "Payed", val: status === "FULFILLED" },
    { name: "Delivered", val: status === "DELIVERED" },
  ];

  return (
    <div tw="transition-property[background-color] duration-1000 mx-2.5 md:mx-auto md:width[60vw] shadow-lg rounded-2xl bg-__secondary_dark dark:bg-gray-700  mb-8">
      <p tw="font-bold text-sm p-4 text-black dark:text-white">
        Order ID
        <span tw="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
          ({"  "} {orderId} {"  "})
        </span>
      </p>
      <ul tw="pb-4">
        {data.map(({ name, val }, i) => {
          return (
            <li
              key={name + i}
              css={[
                /* i === data.length - 1 ?  tw`border-b-0` :*/ tw`border-b-2`,
                i === 0 ? tw`border-t-2` : tw`border-t-0`,

                tw`flex items-center text-gray-600 dark:text-gray-200 justify-between py-3 border-gray-100 dark:border-gray-800`,
              ]}
            >
              <div tw="flex items-center justify-start text-sm">
                <span tw="mx-4">0{i + 1}</span>
                <span>{name}</span>
              </div>
              <svg
                css={[tw`mx-4`, val ? tw`text-green-500` : tw`text-gray-400`]}
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1024 1024"
              >
                {val ? (
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                    fill="currentColor"
                  ></path>
                ) : (
                  <>
                    <path
                      d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                      fill="currentColor"
                    ></path>
                  </>
                )}
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Taks;
