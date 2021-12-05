/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect, useCallback } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { useRouter } from "next/router";
import { useActor } from "@xstate/react";

import { useSession } from "next-auth/react";

import axios from "axios";

import { cartService, EE, fse } from "@/machines/cart_machine";
import {
  headerNCartService,
  EE as EEE,
  fse as fsee,
} from "@/machines/header_n_cart_machine";

import isSSR from "@/util/isSSR";

export const CHECKOUT_INTENT_ORDER = "CHECKOUT_INTENT_ORDER";

const IntentCart: FC = () => {
  const { asPath, push: routerPush } = useRouter();

  const { data: sessData } = useSession();

  const [
    {
      context: { cart },
    },
    dispatch,
  ] = useActor(cartService);

  const [_, disp] = useActor(headerNCartService);

  const handleOrder = useCallback(async () => {
    if (isSSR()) return;

    if (!sessData?.profile) return;

    const { profile } = sessData;

    if (!profile) return;

    if (!profile.id) return;

    const intent = localStorage.getItem(CHECKOUT_INTENT_ORDER);

    // WE SHOULD OPEN CART HERE (MAYBE NOT (WHY WOULD WE))
    // WHY WOULD WE BECAUSE WE WILL DEFINE AUTOMATIC
    // NAVIGATION TO THE SHIPPING PAGE WHEN WE CREATE ORDER

    if (!intent) return;
    //
    // TODO
    //
    // WE SHOULD ACCESS CART OVER HERE
    // AND WE SHOULD CREATE ORDER OVER HERE
    //

    disp({ type: EEE.TOGGLE });

    try {
      const { data: d } = await axios.post(
        `/api/order/create/${profile.id}`,
        cart
      );
      const data = d as { orderId: string };

      //
      // WHEN WE GET RESPONSE
      // WE SHOULD CLEAR CART OVER HERE
      dispatch({ type: EE.ERASE });

      // WE SHOULD CLEAR        `  CHECKOUNT_INTENT_ORDER  `
      //
      localStorage.removeItem(CHECKOUT_INTENT_ORDER);

      // WE SHOULD NAVIGATE TO SHIPPING OVER HERE
      //
      routerPush(`/shipping/${data.orderId}`);
    } catch (err) {
      console.error(err);
      // localStorage.removeItem(CHECKOUT_INTENT_ORDER);
    }
  }, [sessData, cart, dispatch, routerPush, disp]);

  useEffect(() => {
    // console.log({ asPath });

    // if(asPath !== "/signin"){
    handleOrder();
    // }
  }, [asPath, handleOrder]);

  return null;
};

export default IntentCart;
