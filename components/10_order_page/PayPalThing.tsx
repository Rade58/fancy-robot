/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { ClipLoader as Loader } from "react-spinners";
import { useRouter } from "next/router";
import { useActor } from "@xstate/react";

import axios from "axios";

// HOOK
import useLoadPayPalScript from "@/hooks/paypal/usePaypalLoadScript";
//

import type { PropsI } from "@/pages/order/[orderId]";

import type { BodyDataI, ResData } from "@/pages/api/order/pay/[orderId]";

import { EE, orderService } from "@/machines/order_machine";

type PayPalThingPropsType = PropsI;

const PayPalThing: FC<PayPalThingPropsType> = ({ order, sumasAndPrices }) => {
  // TODO
  // CHECK IF ORDER IS ALREADY PAYED
  // (IN THAT CASE WE ARE NOT SHOWING ANY PAYPAL BUTTONS)
  //
  // console.log({ order, sumasAndPrices });

  const [_, dispatch] = useActor(orderService);

  const { PayPalButtons, isPending, loadPayPalScript } = useLoadPayPalScript();

  // const orderStatus = order.status;

  const { push: routerPush } = useRouter();

  const orderIsPayed =
    order.status === "FULFILLED" || order.status === "DELIVERED";

  const [canLoad, setCanLoad] = useState<boolean>(true);

  const [paymentButtonsHidden, setPaymentButtonHidden] =
    useState<boolean>(false);

  useEffect(() => {
    if (orderIsPayed) return;

    if (!canLoad) return;

    // console.log("script loaded");
    loadPayPalScript();
    setCanLoad(false);
  }, [orderIsPayed, loadPayPalScript, setCanLoad, canLoad]);

  //
  //
  //
  //

  if (orderIsPayed) {
    return null;
  }

  // console.log({ orderIsPayed, isPending, paymentButtonsHidden });

  return (
    <Fragment>
      {!paymentButtonsHidden && (
        <Fragment>
          {!orderIsPayed && (
            <div className="paypal-buttons">
              {isPending ? (
                <div tw="flex justify-center">
                  <Loader size={52} color="#eed85a" />
                </div>
              ) : (
                <PayPalButtons
                  // THIS IS PAYPAL ORDER CREATION
                  // LIKE YOU SEE THAT IS PAYPAL THING
                  // SINCE WE ARE NOT USING PRISMA
                  createOrder={async (__, actions) => {
                    // console.log("CREATING PAYPAL ORDER");

                    const paypalOrderId = await actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "EUR",
                            value: sumasAndPrices.totalPrice.toFixed(2),
                          },
                        },
                      ],
                    });

                    return paypalOrderId;
                  }}
                  // ON ERROR
                  onError={(err) => {
                    routerPush("/payment-error");
                  }}
                  // HERE WE CAN ANTICIPATE PAYPAL ORDER CREATION
                  // AND WE CAN SEND REQUEST CREATE PaymentResult
                  // RECORD IN OUR DATBASE AND WE CAN UPDATE OUR ORDER
                  // RECORD AND CONNECT PAYMENT RESULT TO IT
                  onApprove={async (data, actions) => {
                    //

                    const details = await actions.order.capture();

                    console.log("CAPTURED PAYPAL ORDER DETAILS");
                    // console.log({ details });

                    const {
                      id: paymentId,
                      status,
                      update_time,
                      payer: { email_address },
                    } = details;

                    try {
                      const body: BodyDataI = {
                        payment: {
                          email_address,
                          paymentId,
                          status,
                          update_time,
                          totalPrice: sumasAndPrices.totalPrice.toFixed(2),
                          paymentProvider: "PayPal",
                        },
                      };

                      //
                      const { data: d } = await axios.post(
                        `/api/order/pay/${order.id}`,
                        body
                      );
                      //
                      const updatedData: ResData = d as ResData;
                      //

                      // console.log({ updatedData });
                      dispatch({
                        type: EE.GIVE_NEW_ORDER,
                        payload: updatedData,
                      });

                      setPaymentButtonHidden(true);
                      //
                    } catch (err) {
                      //
                      console.error(err);

                      //
                    }
                  }}
                />
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PayPalThing;
