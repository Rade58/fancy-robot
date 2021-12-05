/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ChangeEventHandler } from "react";
import { useState, Fragment, useCallback, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import axios from "axios";

import type { Profile, OrderStatus } from "@prisma/client";

import { useActor } from "@xstate/react";

import { useSession } from "next-auth/react";

import Alert from "../alerts/Alert";

import isSSR from "@/util/isSSR";

import { cartService, EE } from "@/machines/cart_machine";

import countries from "../../countries_n_states/1_countries.json";
import states from "../../countries_n_states/2_states.json";

const ShippingBillingForm: FC<{ initialProfilleInfo: Profile }> = ({
  initialProfilleInfo,
}) => {
  const { push, query } = useRouter();

  const [_, dispatch] = useActor(cartService);

  // console.log({ query });

  const { data, status } = useSession();
  // console.log({ initialProfilleInfo });

  const [errorHappened, setErrorHappened] = useState<boolean>(false);

  const [error, setError] = useState<{
    header: string;
    text: string;
  }>({
    header: "",
    text: "",
  });

  const handleError = (header: string, text: string) => {
    if (isSSR()) return;
    //
    setError({ header, text });
    //
    setErrorHappened(true);

    setTimeout(() => {
      setErrorHappened(false);
    }, 3066);
  };

  useEffect(() => {
    dispatch({
      type: EE.ENABLE_MODIFY,
    });
  }, [dispatch]);

  const [bodyData, setBodyData] = useState<{
    nick: string;
    email: string;
    streetAddress: string;
    city: string;
    country: string;
    postalCode: string;
    regionOrState: string;
  }>({
    nick: initialProfilleInfo.nick || "",
    email: initialProfilleInfo.email || "",
    city: initialProfilleInfo.city || "",
    country: initialProfilleInfo.country || "KR",
    postalCode: initialProfilleInfo.postalCode || "",
    regionOrState: initialProfilleInfo.regionOrState || "CO",
    streetAddress: initialProfilleInfo.streetAddress || "",
  });

  const [reqStatus, setReqStatus] = useState<"pending" | "idle">("idle");

  const handleSubmit = useCallback(async () => {
    if (
      bodyData.nick.length === 0 ||
      bodyData.city.length === 0 ||
      bodyData.country.length === 0 ||
      bodyData.email.length === 0 ||
      bodyData.postalCode.length === 0 ||
      bodyData.regionOrState.length === 0 ||
      bodyData.streetAddress.length === 0
    ) {
      // show error alert
      handleError("Error!", "All fields are required");
      setReqStatus("idle");
      return;
    }

    if (!data) {
      return;
    }
    if (!data.profile) {
      return;
    }
    if (!data.profile.id) {
      return;
    }

    try {
      setReqStatus("pending");

      // DON'T FORGET TO ALSO UPDATE STATUS OF AN ORDER

      const updatedProfileData = await axios.put(
        `/api/profile/${data.profile.id}`,
        bodyData
      );

      const updatedProfile = updatedProfileData.data.updatedProfile as Profile;

      // LETS UPDATE ORDER

      const orderStatus: OrderStatus = "AWAITING_PAYMENT_METHOD";

      const { data: order } = await axios.put(
        `/api/order/update/${query.orderId}`,
        { status: orderStatus }
      );

      // console.log({ updatedOrder: order });

      if (
        updatedProfile.nick &&
        updatedProfile.nick.length !== 0 &&
        updatedProfile.city &&
        updatedProfile.city.length !== 0 &&
        updatedProfile.country &&
        updatedProfile.country.length !== 0 &&
        updatedProfile.email &&
        updatedProfile.email.length !== 0 &&
        updatedProfile.postalCode &&
        updatedProfile.postalCode.length !== 0 &&
        updatedProfile.regionOrState &&
        updatedProfile.regionOrState.length &&
        updatedProfile.streetAddress &&
        updatedProfile.streetAddress.length !== 0
      ) {
        //
        //
        push(`/payment/${query.orderId}`);
        //
        //
        return;
      } else {
        // SHOW ERROR ALERT

        handleError("Error!", "All fields are required");
        //
        setReqStatus("idle");
        return;
      }

      // setReqStatus("idle");
    } catch (err) {
      console.log(err);

      // @ts-ignore
      handleError("Error!", err.message as string);

      setReqStatus("idle");
    }
  }, [
    setReqStatus,
    bodyData,
    data,
    /* setBodyData, */ push,
    handleError,
    query,
  ]);

  if (!data) {
    return null;
  }
  if (!data.profile) {
    return null;
  }

  /* const {
    nick: name,
    email,
    streetAddress,
    city,
    country,
    postalCode,
    regionOrState,
  } = bodyData; */

  // console.log({ bodyData });

  const handleBodyDataChange = (name: string, value: string) =>
    setBodyData((prev) => ({ ...prev, [name]: value }));

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;

    handleBodyDataChange(inputName, inputValue);
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const {
      target: { name: selName, value: selValue },
    } = e;

    handleBodyDataChange(selName, selValue);
  };

  //
  return (
    <Fragment>
      <div tw="leading-loose flex justify-center mt-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit();
          }}
          css={[
            css`
              /*  */

              & input {
                /* ${tw`border dark:border-gray-200 border-gray-800`}; */

                ${tw`dark:text-gray-700 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] overflow-ellipsis`}

                &:-webkit-autofill,
                        &:-webkit-autofill:hover {
                  ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                  ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
                  border-radius: 0px;
                }
              }

              & select {
                ${tw`dark:text-gray-50 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] light:bg-gray-400 bg-gray-500`}

                /*  appearance: none;
                        // Additional resets for further consistency
                        background-color: transparent;
                        border: none;
                        padding: 0 1em 0 0;
                        margin: 0;
                        width: 100%;
                        font-size: inherit;
                        cursor: inherit;
                        line-height: inherit; */

                        & option {
                  ${tw`dark:bg-gray-800 bg-l  dark:border-l border-gray-800`}
                  /* border: crimson solid 1px; */
                          font-size: 16px;
                  border-top: crimson solid 1px;
                }
              }

              & textarea:-webkit-autofill,
              & textarea:-webkit-autofill:hover,
              & textarea:-webkit-autofill:focus,
              & select:-webkit-autofill,
              & select:-webkit-autofill:hover,
              & select:-webkit-autofill:focus {
                ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
                border-radius: 0px;
              }

              & label {
                ${tw`dark:text-gray-50`}
              }

              & select:disabled {
                opacity: 0.5;
              }
              & input:disabled {
                opacity: 0.5;
              }
              & button:disabled {
                opacity: 0.5;
              }
            `,

            tw`dark:bg-gray-700 bg-l max-w-xl m-4 p-10 rounded shadow-xl`,
          ]}
        >
          <p tw="dark:text-gray-400 font-medium">Customer information</p>
          <div tw="">
            <label tw="block text-sm" htmlFor="nick">
              Name
            </label>
            <input
              disabled={reqStatus === "pending"}
              onChange={handleInputChange}
              value={bodyData.nick}
              tw="w-full px-5 py-2 rounded"
              id="nick"
              name="nick"
              type="text"
              required
              placeholder="Your Name"
              aria-label="Name"
            />
          </div>
          <div tw="mt-2">
            <label tw="block text-sm" htmlFor="email">
              Email
            </label>
            <input
              disabled={reqStatus === "pending"}
              onChange={handleInputChange}
              value={bodyData.email}
              tw="w-full px-5  py-2 rounded"
              id="email"
              name="email"
              type="email"
              required
              placeholder="Your Email"
              aria-label="Email"
            />
          </div>
          <div tw="mt-2">
            <label tw=" block text-sm" htmlFor="streetAddress">
              Address
            </label>
            <input
              disabled={reqStatus === "pending"}
              onChange={handleInputChange}
              value={bodyData.streetAddress}
              tw="w-full px-2 py-2 rounded"
              id="streetAddress"
              name="streetAddress"
              type="text"
              required
              placeholder="Street"
              aria-label="Email"
            />
          </div>
          <div tw="mt-2">
            <label tw="hidden text-sm block" htmlFor="city">
              City
            </label>
            <input
              disabled={reqStatus === "pending"}
              onChange={handleInputChange}
              value={bodyData.city}
              tw="w-full px-2 py-2 rounded"
              id="city"
              name="city"
              type="text"
              required
              placeholder="City"
              aria-label="City"
            />
          </div>
          <div tw="inline-block mt-2 w-1/2 pr-1">
            <label tw="hidden block text-sm" htmlFor="country">
              Country
            </label>
            <select
              disabled={reqStatus === "pending"}
              onChange={handleSelectChange}
              onBlur={handleSelectChange}
              value={bodyData.country}
              tw="w-full px-2 py-3 rounded"
              id="country"
              name="country"
              required
              placeholder="Country"
              aria-label="Country"
            >
              {countries.map((item, i) => {
                return (
                  <option key={`${i}-${item.iso2}`} value={item.iso2}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div tw="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label tw="hidden block text-sm" htmlFor="postalCode">
              Zip
            </label>
            <input
              disabled={reqStatus === "pending"}
              onChange={handleInputChange}
              value={bodyData.postalCode}
              tw="w-full px-2 py-2 rounded"
              id="postalCode"
              name="postalCode"
              type="text"
              required
              placeholder="Zip"
              aria-label="Zip"
            />
          </div>
          {bodyData.country === "US" && (
            <div tw="mt-2">
              <label tw="hidden block text-sm" htmlFor="state">
                State
              </label>
              <select
                disabled={reqStatus === "pending"}
                onChange={handleSelectChange}
                onBlur={handleSelectChange}
                value={bodyData.regionOrState}
                tw="w-full px-2 py-3 rounded"
                id="state"
                name="regionOrState"
                required
                placeholder="State"
                aria-label="State"
              >
                {states.map((item, i) => {
                  return (
                    <option
                      key={`${i + item.state_code}`}
                      value={item.state_code}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {/* <p tw="mt-4 text-gray-800 font-medium">Payment information</p> */}
          {/* <div tw="">
          <label tw="block text-sm text-gray-600" htmlFor="cus_name">
            Card
          </label>
          <input
            tw="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="cus_name"
            name="cus_name"
            type="text"
            required
            placeholder="Card Number MM/YY CVC"
            aria-label="Name"
          />
        </div> */}
          <div tw="mt-4">
            <button
              disabled={reqStatus === "pending"}
              css={[
                reqStatus === "pending" ? tw`cursor-default` : tw``,
                tw`mt-8 px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded`,
              ]}
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      {errorHappened && (
        <Alert
          visible
          variant="error"
          header={error.header}
          text={error.text}
        />
      )}
    </Fragment>
  );
};

export default ShippingBillingForm;
