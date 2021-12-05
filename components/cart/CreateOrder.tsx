/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useCallback, useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import axios from "axios";

import { useRouter } from "next/router";

import { useActor } from "@xstate/react";

import { useSession } from "next-auth/react";

import { EE, fse, cartService } from "@/machines/cart_machine";
import {
  headerNCartService,
  EE as EEE,
  fse as fsee,
} from "@/machines/header_n_cart_machine";

import type { ResData } from "@/pages/api/order/create/[profileId]";

import { CHECKOUT_INTENT_ORDER } from "./IntentCart";

const CreateOrder: FC<{ foo?: "bar" }> = ({}) => {
  const { data: sessData, status } = useSession();

  const { push: rouPush } = useRouter();

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const [{ value, context }, dispatch] = useActor(cartService);
  const [{ value: val }, disp] = useActor(headerNCartService);

  useEffect(() => {
    dispatch({
      type: EE.ENABLE_MODIFY,
    });
  }, [val]);

  const handleOrderCreation = useCallback(async () => {
    const { cart } = context;

    if (!sessData) {
      localStorage.setItem(CHECKOUT_INTENT_ORDER, "setted");

      rouPush("/signin");
      disp({
        type: EEE.TOGGLE,
      });
      return;
    }
    if (status !== "authenticated") {
      localStorage.setItem(CHECKOUT_INTENT_ORDER, "setted");

      rouPush("/signin");
      disp({
        type: EEE.TOGGLE,
      });
      return;
    }
    if (!cart) {
      return;
    }
    if (Object.keys(cart).length === 0) {
      return;
    }

    const { profile } = sessData;

    if (!profile?.id) {
      return;
    }

    try {
      // WE SHOULD DISABLE ADDING AND REMOVING TO THE CART
      //

      dispatch({
        type: EE.DISABLE_MODIFY,
      });
      disp({
        type: EEE.TOGGLE,
      });

      //
      //

      setReqStatus("pending");

      // YES THIS IS THE PROFILE ID BECAUSE WE ARE CREATING
      // ORDER (WE DON;T HAVE ORDER ID YET)
      // BUT IT IS CONVINIENT FOR ME TO PASS PROFILE ID LIKE THIS BECAUSE I
      // WANT TO USE SOME PROFILE RELATED MIDDLEWARES I CREATED ON THE BACKEND
      const { data: d } = await axios.post(
        `/api/order/create/${profile.id}`,
        cart
      );

      const data = d as ResData;

      //
      // WE ARE EXPECTING ORDER ID IN RETURN

      // WE CAN DESTROY CART
      dispatch({
        type: EE.ERASE,
      });

      dispatch({
        type: EE.ENABLE_MODIFY,
      });

      // WE CAN NAVIGATE TO SHIPPING PAGE
      rouPush(`/shipping/${data.orderId}`);
      setReqStatus("idle");

      // NOW WE CAN CLOSE CART
      /* disp({
        type: EEE.TOGGLE,
      }); */
      dispatch({
        type: EE.ENABLE_MODIFY,
      });

      //
    } catch (err) {
      //
      console.error(err);

      dispatch({
        type: EE.ENABLE_MODIFY,
      });
    }
    //
  }, [context, setReqStatus, sessData, status, disp, dispatch, rouPush]);

  /* console.log(
    context.modify_disabled,
    val === fsee.header_visible,
    reqStatus === "pending"
  ); */

  return (
    <button
      onClick={() => {
        // console.log("hello world");
        handleOrderCreation();
      }}
      disabled={
        val === fsee.header_visible ||
        reqStatus === "pending" ||
        context.modify_disabled
      }
      type="button"
      tw="px-6 py-2 border rounded-md dark:bg-gray-400 dark:text-gray-900 dark:border-gray-400"
    >
      <span tw="sr-only sm:not-sr-only">Continue to </span>Checkout
    </button>
  );
};

export default CreateOrder;
