/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState, useCallback } from "react";
import tw, { css, styled, theme } from "twin.macro";
import type { Order, PaymentProvider, OrderStatus } from "@prisma/client";

import { useRouter } from "next/router";

import axios from "axios";

import CreditCardIcon from "@/svgs/inline/CreditCard.svg";

const PickPayment: FC<{ order: Order }> = ({ order }) => {
  const { push: routerPush } = useRouter();

  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const handlePaymentUpdate = useCallback(async () => {
    if (!order.id) return;

    if (!paymentProvider) return;

    try {
      setReqStatus("pending");

      // TODO
      // SEND REQUEST TO UPDATE STATUS OF AN ORDER
      // STATUS IS GOING TO BE
      const orderStatus: OrderStatus = "AWAITING_ORDER_PLACEMENT";

      const body: { status: OrderStatus; paymentMethod: PaymentProvider } = {
        status: orderStatus,
        paymentMethod: "PayPal",
      };

      const { data: d } = await axios.put(
        `/api/order/update/${order.id}`,
        body
      );

      const updatedOrder = d as Order;
      // console.log({ updatedOrder });

      //
      //
      // TODO
      // NAVIGATE TO PLACE ORDER PAGE

      routerPush(`/place-order/${order.id}`);

      //
    } catch (err) {
      console.error(err);
      //
      //
      setReqStatus("idle");
    }
  }, [paymentProvider, routerPush, order, setReqStatus]);

  const paymentMethod: {
    value: PaymentProvider;
    available: boolean;
    display: string;
  }[] = [
    {
      value: "PayPal",
      display: "PayPal",
      available: true,
    },
    { value: "Stripe", display: "Stripe", available: false },
    { value: "TwoCheckout", display: "2Checkout", available: false },
  ];

  const nonAvailable: {
    value: PaymentProvider;
    available: boolean;
    display: string;
  }[] = [];

  // console.log({ paymentProvider });

  return (
    <div
      css={[
        tw`rounded-sm shadow-lg mx-auto p-12 dark:bg-gray-700 bg-gray-300 md:width[460px] width[80vw]`,
        css`
          & {
            transition-property: background-color;
            transition-duration: 1s;

            --form-control-color: #2d4b5f;

            & input[type="radio"] {
              /* Add if not using autoprefixer */
              -webkit-appearance: none;
              /* Remove most all native input styles */
              appearance: none;
              /* For iOS < 15 */
              /* background-color: var(--form-control-color); */
              /* Not removed via appearance */
              margin: 0;

              font: inherit;
              color: currentColor;
              width: 1.15em;
              height: 1.15em;
              border-width: 0.15em;
              border-style: solid;
              ${tw`dark:border-color[yellow] border-color[#4036cc]`};
              border-radius: 50%;
              transform: translateY(-0.075em);

              display: grid;
              place-content: center;
            }

            & input[type="radio"]::before {
              content: "";
              width: 0.65em;
              height: 0.65em;
              border-radius: 50%;
              transform: scale(0);
              transition: 120ms transform ease-in-out;

              ${tw`dark:box-shadow[inset 1em 1em #2baf99]`};

              box-shadow: inset 1em 1em #153a69;
              /* Windows High Contrast Mode */
              background-color: CanvasText;
            }

            & input[type="radio"]:checked::before {
              transform: scale(1);
            }

            & input[type="radio"]:focus {
              ${tw`dark:outline[max(2px, 0.15em) solid #2baf99]`};

              outline: max(2px, 0.15em) solid #153a69;
              outline-offset: max(2px, 0.15em);
            }
          }
        `,

        tw`mt-28 border-__primary`,
      ]}
    >
      <h2 tw="mb-6 dark:text-gray-400 font-medium text-center text-xl">
        Select Payment Method:
      </h2>
      <div
        css={[
          css`
            ${tw`-left-5 md:left-0`}

            position: relative;
            top: -26.9px;
            height: 180px;
            padding: 0;
            /* border: pink solid 2px; */
            width: fit-content;
            margin: 0 auto;
            margin-bottom: -18px;
            z-index: 0;

            & svg {
              z-index: -1;
            }
          `,
        ]}
      >
        <CreditCardIcon />
      </div>
      {paymentMethod.map(({ available, value, display }, i) => {
        //
        if (!available) {
          nonAvailable.push({ available, value, display });
        }
        return (
          <Fragment key={i + value}>
            {available && (
              <div tw="mt-6 flex flex-col items-center justify-center">
                <div tw="width[120px]  border-__primary_outline_focus">
                  <label tw="flex align-items[center] mt-3">
                    <input
                      type="radio"
                      tw="h-5 w-5"
                      value={value}
                      name={value}
                      onChange={(e) => {
                        // console.log({ e });
                        e.target.checked = true;
                        setPaymentProvider(value);
                      }}
                      /* onBlur={(e) => {
                        console.log({ e });
                        e.target.checked = false;
                      }} */
                    />
                    <span tw="ml-5 margin-bottom[4px] dark:text-gray-200">
                      {display}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
      <h2 tw="dark:text-gray-300 opacity[0.4]  font-normal text-align[center] mb-6 mt-12">
        Soon To Be Available:
      </h2>
      {nonAvailable.map(({ available, value, display }, i) => {
        return (
          <div
            key={i + value + available}
            tw="opacity[0.3] mt-2 flex flex-col items-center justify-center"
          >
            <div tw="width[120px]  border-__primary_outline_focus">
              <label tw="flex align-items[center] mt-3">
                <input
                  disabled={true}
                  type="radio"
                  tw="h-5 w-5"
                  name={value}
                  value={value}
                  onChange={(e) => {
                    // console.log({ e });
                    e.target.checked = true;
                  }}
                  onBlur={(e) => {
                    // console.log({ e });
                    e.target.checked = false;
                  }}
                />
                <span tw="ml-5 margin-bottom[4px] dark:text-gray-200">
                  {display}
                </span>
              </label>
            </div>
          </div>
        );
      })}
      <div tw="flex mt-4 border-__primary_outline_focus">
        <button
          onClick={() => {
            handlePaymentUpdate();
          }}
          disabled={reqStatus === "pending" || paymentProvider === null}
          css={[
            reqStatus === "pending" || paymentProvider === null
              ? tw`opacity[0.3] cursor-default`
              : tw``,
            tw`ml-auto mt-8 px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded`,
          ]}
          type="submit"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PickPayment;

/*

<div tw="bg-gray-200">
    <div tw="flex flex-col items-center justify-center h-screen">
        <div tw="flex flex-col">
            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-gray-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-red-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-orange-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-yellow-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-teal-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-blue-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-indigo-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-purple-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>

            <label tw="inline-flex items-center mt-3">
                <input type="checkbox" tw="h-5 w-5 text-pink-600" / /><span tw="ml-2 text-gray-700">label</span>
            </label>
        </div>
    </div>
</div>


 */
