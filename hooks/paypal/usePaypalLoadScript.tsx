import React, { useCallback } from "react";
import type { FC } from "react";
import axios from "axios";

import {
  usePayPalScriptReducer,
  PayPalButtons,
  DISPATCH_ACTION,
  SCRIPT_LOADING_STATE,
} from "@paypal/react-paypal-js";

const useLoadPayPalScript = () => {
  //
  //
  const [options, dispatch] = usePayPalScriptReducer();

  const { isPending } = options;

  const loadPayPalScript = useCallback(async () => {
    //
    //
    const { data: paypalClientId } = await axios.get("/api/config/paypal");

    if (!paypalClientId || typeof paypalClientId !== "string") {
      throw new Error("PayPal Client Id is invalid!");
    }

    dispatch({
      type: DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        ...options.options,
        "client-id": paypalClientId,
        currency: "EUR",
      },
    });

    dispatch({
      type: DISPATCH_ACTION.LOADING_STATUS,
      value: SCRIPT_LOADING_STATE.PENDING,
    });
  }, [options, dispatch]);

  //
  //

  return {
    isPending,
    PayPalButtons,
    loadPayPalScript,
  };
};

export default useLoadPayPalScript;
