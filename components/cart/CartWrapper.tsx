/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";
import { headerNCartService, EE, fse } from "@/machines/header_n_cart_machine";
import LayProducts from "./LayProducts";

import Alert from "../alerts/Alert";

const CartWrapper: FC = () => {
  const [{ value }, dispatchHC] = useActor(headerNCartService);

  return (
    <section
      css={[
        css`
          ${tw`flex flex-col w-full h-full`}

          & .close-btn {
            /* border: crimson solid 1px; */
            display: flex;

            margin-top: 20px;
            ${tw`mx-auto`};
            align-self: flex-end;
            width: fit-content;
            ${tw`h-8`}

            &:hover {
              & path {
                fill: #8aa8c5;
              }
            }
          }
        `,
      ]}
    >
      <button
        disabled={value === fse.header_visible}
        className="close-btn"
        onClick={() => dispatchHC({ type: EE.TOGGLE })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-8 w-8 dark:text-blue-50 light:text-gray-900"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* PLACE FOR CART CONTENT */}
      <LayProducts />
      {/*  <Alert
        header="Warning"
        visible={true}
        text="you have been warned"
        variant="warning"
      /> */}
    </section>
  );
};

export default CartWrapper;
