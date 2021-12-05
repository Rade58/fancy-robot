/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ChangeEventHandler, SyntheticEvent } from "react";
import { useState, useEffect, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";
import Link from "next/link";

import axios from "axios";

import { motion } from "framer-motion";

import { ClipLoader as Loader } from "react-spinners";

import useProfData from "@/hooks/useProfileMenuData";

import Spinner from "../common/Spinner";

import type { PropsI } from "@/pages/profile/[profileId]";

import countries from "../../countries_n_states/1_countries.json";
import states from "../../countries_n_states/2_states.json";

import InvalidDataAlert from "../alerts/Alert";

import Button from "../buttons/Button";

import Dropzone from "../image_upload/Dropzone";

import { dropboxToggService, EE } from "@/machines/dropbox_togg_machine";

import type {
  ResData as ResponseDataType,
  BodyDataTypeI,
} from "@/pages/api/profile/[profileId]";

type profType = PropsI["profile"];

interface UserDataI extends profType {
  email: string;
}

const ProfileView: FC<PropsI> = ({
  profile,
  fulfilledOrdersCount,
  favoritesCount,
}) => {
  // console.log({ profile });

  const sessionData = useProfData();

  //

  const [
    {
      context: { visible, imageUrl },
    },
    dispatch,
  ] = useActor(dropboxToggService);

  /*  const [profileData, setProfileData] = useState<UserDataI>({
    ...profile,
    email: (sessionData ? sessionData?.email : "") || "",
  }); */

  /* const [sanitizedProfileData, setSanitizedProfileData] = useState<UserDataI>({
    //
    ...profile,
    // WE DEFINED THIS AS nick (BUT THIS SHOULD BE FULL NAME
    // SO WE WILL ASK FOR FULL NAME)
    nick: sessionData?.name || profile?.nick || "",
    image: sessionData?.image || profile?.image || "",
    email: sessionData?.email || profile?.email || "",
    city: profile.city || "",
    country: profile.country || "KR" || "",
    postalCode: profile.postalCode || "",
    streetAddress: profile.streetAddress || "",
  });
 */
  // console.log(sessionData?.image, profile?.image);

  /* useEffect(() => {
    setSanitizedProfileData((prev) => ({
      ...prev,
      // WE DEFINED THIS AS nick (BUT THIS SHOULD BE FULL NAME
      // SO WE WILL ASK FOR FULL NAME)
      nick: prev.nick || sessionData?.name || "",
      image: prev.image || sessionData?.image || "",
    }));
  }, [sessionData, setSanitizedProfileData]); */

  // ----------------------             ----------------------

  const [profImage, setProfImage] = useState<string>(
    profile?.image ||
      (sessionData?.image &&
        (!sessionData?.image.includes("platform-lookaside.fbsbx.com")
          ? sessionData?.image
          : "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg")) ||
      "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
  );

  useEffect(() => {
    if (imageUrl) {
      setProfImage(imageUrl);
    }
  }, [setProfImage, imageUrl]);

  const [bodyData, setBodyData] = useState<BodyDataTypeI>({
    email: profile?.email || sessionData?.email || "",
    nick: profile?.nick || sessionData?.name || "",
    city: profile.city || "",
    country: profile.country || "KR" || "",
    postalCode: profile.postalCode || "",
    streetAddress: profile.streetAddress || "",
    regionOrState: profile.regionOrState || "",
  });

  // console.log({ sessionData });

  // console.log({ bodyData });

  const [bodyDataChanged, setBodyDataChanged] = useState<boolean>(false);

  type fieldType = keyof typeof bodyData;

  const handleBodyDataChange = (fieldName: fieldType, val: string) => {
    setBodyData((prev) => ({ ...prev, [fieldName]: val }));

    setBodyDataChanged(true);
  };

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  // const [invalidFieldNames, setInvalidFieldNames] = useState<fieldType[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ----------------------------------------------------------

  if (!sessionData) {
    return null;
  }

  if (sessionData.authStatus === "loading") {
    return <Spinner />;
  }

  if (!profile) {
    return null;
  }

  if (!profile.id) {
    return null;
  }

  // console.log({ sanitizedProfileData });
  // console.log({ countries });
  // console.log({ states });
  // console.log({ sessionData });

  const id = profile.id;

  // const {
  /* city,
    country,
    email,
    image,
    nick: name,
    streetAddress,
    postalCode,
    regionOrState, */
  // id,
  // } = sanitizedProfileData;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;
    // @ts-ignore
    handleBodyDataChange(inputName, inputValue);
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const {
      target: { name: selName, value: selValue },
    } = e;
    // @ts-ignore
    handleBodyDataChange(selName, selValue);
  };

  const handleRequest = async () => {
    try {
      setReqStatus("pending");

      // SENDING REQUEST

      const { data: d } = await axios.put(`/api/profile/${profile.id}`, {
        ...bodyData,
      });

      const resData = d as ResponseDataType & { error: true; message: string };

      if (resData.error) {
        setErrorMessage(resData.message);

        setTimeout(() => {
          setErrorMessage(null);
          setReqStatus("idle");
        }, 3000);

        return;
      }

      if (resData.updatedProfile) {
        setBodyData({
          nick: resData.updatedProfile.nick as string,
          city: resData.updatedProfile.city as string,
          country: resData.updatedProfile.country as string,
          postalCode: resData.updatedProfile.postalCode as string,
          streetAddress: resData.updatedProfile.streetAddress as string,
          regionOrState: resData.updatedProfile.regionOrState as string,
          email: resData.updatedProfile.email as string,
        });
        setReqStatus("idle");
      }

      // setReqStatus("idle");
    } catch (err) {
      console.error(err);
      //
      /* console.log({
        // @ts-ignore
        message: err.message,
      }); */

      setTimeout(() => {
        setReqStatus("idle");
      }, 3000);
    }
  };

  // console.log({ bodyData });

  return (
    <Fragment>
      <div tw="pt-16 mb-32">
        <div tw="w-full lg:w-4/12 px-4 mx-auto">
          <div
            css={[
              css`
                transition-property: background-color;
                transition-duration: 600ms;
              `,
              tw`relative flex flex-col min-w-0 break-words bg-gray-700 light:bg-gray-300 w-full mb-6 shadow-xl rounded-lg mt-16`,
            ]}
          >
            <div tw="px-6">
              <div tw="flex flex-wrap justify-center">
                <div
                  css={[
                    tw`w-full h-3 rounded-b-2xl`,

                    css`
                      background-image: linear-gradient(
                        103.3deg,
                        #484257 12%,
                        rgba(252, 225, 208, 1) 30%,
                        rgba(255, 173, 214, 1) 52.7%,
                        rgba(162, 186, 245, 1) 71.8%,
                        #353e53 92.8%
                      );
                    `,
                  ]}
                ></div>
                <button
                  onClick={() => {
                    dispatch({ type: EE.TOGGLE });
                  }}
                  css={[
                    css`
                      & #upl {
                        svg {
                          visibility: hidden;
                        }
                      }
                      &:hover #upl {
                        svg {
                          visibility: visible;
                        }
                      }

                      /* border: crimson solid 1px; */
                    `,
                    tw`width[150px] h-0 px-4 flex justify-center relative top[-14px]`,
                  ]}
                >
                  <div
                    css={[
                      css`
                        transition-property: transform;
                        transition-duration: 0.3s;

                        &:hover {
                          transform: scale(1.2);
                        }

                        & img {
                          /* transform: scale(1.2); */

                          /* & + svg {
                            visibility: hidden;
                          }

                          &:hover + svg {
                            visibility: visible;
                          } */
                        }
                      `,
                      tw`relative -top-12 flex justify-center overflow-hidden width[110px] height[110px] border-radius[58px]`,
                    ]}
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      tw="hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg> */}
                    <img
                      alt="..."
                      // src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      src={profImage}
                      css={[
                        css`
                          transform: scale(1.1);
                        `,

                        tw`shadow-xl width[150px] align-middle border-none absolute`,
                      ]}
                    />
                    {/* <div tw="absolute top-20 z-40 w-20 border border-__hazard"> */}
                    <div
                      id="upl"
                      tw="z-index[280] h-6 w-6 absolute bottom-5 right-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        tw="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#264da1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    {/* </div> */}
                  </div>
                </button>
                <Dropzone profileId={id} />
                <div
                  css={[
                    css`
                      & a {
                        user-select: none;

                        & span:hover {
                          color: #bd768e;
                        }
                      }
                      & span {
                        user-select: none;
                      }
                    `,
                    tw`w-full px-4 text-center mt-20`,
                  ]}
                >
                  <div tw="flex justify-center py-4 lg:pt-4 pt-8">
                    {
                      fulfilledOrdersCount > 0 ? (
                        <Link href={`/profile/stats/${id}${"#purchases"}`}>
                          <a>
                            <div tw="mr-4 p-3 text-center">
                              <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                                {fulfilledOrdersCount}
                              </span>
                              <span tw="text-sm text-gray-400 light:text-gray-600">
                                Purchases
                              </span>
                            </div>
                          </a>
                        </Link>
                      ) : (
                        //   <Link
                        //   href={`/profile/stats/${"bitcoinether"}${"#purchases"}`}
                        // >
                        <span>
                          <div tw="mr-4 p-3 text-center">
                            <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                              0
                            </span>
                            <span tw="text-sm text-gray-400 light:text-gray-600">
                              Purchases
                            </span>
                          </div>
                        </span>
                      )
                      // </Link>
                    }
                    {favoritesCount > 0 ? (
                      <Link href={`/profile/stats/${id}${"#favorites"}`}>
                        <a>
                          <div tw="mr-4 p-3 text-center">
                            <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                              {favoritesCount}
                            </span>
                            <span tw="text-sm text-gray-400 light:text-gray-600">
                              Favorites
                            </span>
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <span>
                        <div tw="mr-4 p-3 text-center">
                          <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                            0
                          </span>
                          <span tw="text-sm text-gray-400 light:text-gray-600">
                            Favorites
                          </span>
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div tw="text-center mt-12">
                <h3 tw="text-xl font-semibold leading-normal dark:text-gray-300 text-gray-900 mb-2">
                  {sessionData?.name || profile?.nick || ""}
                </h3>
                <h3 tw="text-sm leading-normal underline mt-0 mb-2 dark:text-gray-200 light:text-gray-800">
                  {sessionData?.email ||
                    (profile?.email && (
                      <i>
                        {/* <i tw="mr-2 text-lg text-gray-600"></i> */}
                        {sessionData?.email || profile?.email || ""}
                      </i>
                    ))}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* SHIPPING BILLING AND REST OF STUFF */}
        {
          /* reqStatus === "idle" && */ <section tw="mt-8 rounded-md w-full lg:w-6/12 px-4 mx-auto mb-12">
            <form
              id="payment-form"
              // method="POST"
              // action=""
              onSubmit={(e) => {
                e.preventDefault();

                handleRequest().then(() => {
                  // console.log("something");
                  setBodyDataChanged(false);
                });
              }}
              css={[
                css`
                  &#payment-form#payment-form {
                    & input {
                      background-color: inherit;
                    }
                  }
                `,
              ]}
            >
              <section
                className="info-fieldz"
                css={[
                  reqStatus === "pending" ? tw`opacity-50` : tw``,
                  css`
                    &.info-fieldz.info-fieldz.info-fieldz.info-fieldz {
                      border: crimson solid 0px;

                      overflow-x: hidden;
                      /* background: ${theme`colors.l`}; */

                      & label > span {
                        ${tw`dark:text-gray-400 light:text-gray-600`}
                      }

                      & input {
                        /* ${tw`border dark:border-gray-200 border-gray-800`}; */

                        ${tw`dark:text-gray-50 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] overflow-ellipsis`}

                        &:-webkit-autofill,
                        &:-webkit-autofill:hover {
                          ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                          ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
                        }
                      }

                      & select {
                        ${tw`dark:text-gray-50 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"]`}

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
                      }

                      /* & input:-webkit-autofill,
                  & input:-webkit-autofill:hover,
                  & input:-webkit-autofill:focus,
                  & textarea:-webkit-autofill,
                  & textarea:-webkit-autofill:hover,
                  & textarea:-webkit-autofill:focus,
                  & select:-webkit-autofill,
                  & select:-webkit-autofill:hover,
                  & select:-webkit-autofill:focus {
                    border: 1px solid green;
                    -webkit-text-fill-color: green;
                    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
                    transition: background-color 5000s ease-in-out 0s;
                  } */
                    }
                  `,
                  css`
                    transition-property: background-color;
                    transition-duration: 600ms;
                  `,
                  tw`rounded bg-l  bg-gray-700 light:bg-gray-300`,
                ]}
              >
                <h2 tw="dark:text-gray-600 ml-4 mt-2 uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  Shipping & Billing Information
                </h2>
                <fieldset tw="mb-3 shadow-lg text-gray-600">
                  <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span tw="dark:text-gray-300 text-right px-2">Name</span>
                    <input
                      disabled={reqStatus === "pending"}
                      value={bodyData.nick}
                      onChange={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                      }}
                      tw="background-clip[content-box] focus:outline-none px-3"
                      name="nick"
                      placeholder="Try Odinsson"
                      required
                    />
                  </label>
                  <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span tw="dark:text-gray-300 text-right px-2">Email</span>
                    <input
                      disabled={reqStatus === "pending"}
                      value={bodyData.email}
                      onChange={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                      }}
                      tw="background-clip[content-box] focus:outline-none px-3"
                      name="email"
                      type="email"
                      placeholder="try@example.com"
                      required
                    />
                  </label>
                  <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span tw="dark:text-gray-300 text-right px-2">Address</span>
                    <input
                      disabled={reqStatus === "pending"}
                      value={bodyData.streetAddress}
                      onChange={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                      }}
                      tw="background-clip[content-box] focus:outline-none px-3"
                      name="streetAddress"
                      placeholder="10 Street XYZ 654"
                    />
                  </label>
                  <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span tw="dark:text-gray-300 text-right px-2">City</span>
                    <input
                      disabled={reqStatus === "pending"}
                      value={bodyData.city}
                      onChange={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                      }}
                      tw="-webkit-text-fill-color[inherit] background-clip[content-box] focus:outline-none px-3"
                      name="city"
                      placeholder="San Francisco"
                    />
                  </label>
                  {/* <label tw="inline-flex w-2/4 border-gray-200 py-3">
                <span tw="dark:text-gray-300 text-right px-2">State</span>
                <input
                  tw="background-clip[content-box] focus:outline-none px-3"
                  name="state"
                  placeholder="CA"
                />
              </label> */}

                  <label tw="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                    <span tw="dark:text-gray-300 text-right px-2 xl:px-0 ">
                      ZIP
                    </span>
                    <input
                      disabled={reqStatus === "pending"}
                      value={bodyData.postalCode}
                      onChange={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                      }}
                      tw="-webkit-text-fill-color[inherit] background-clip[content-box] focus:outline-none px-3"
                      name="postalCode"
                      placeholder="98603"
                    />
                  </label>
                  <label tw="flex border-t border-gray-200 h-12 py-3 items-center select-none relative">
                    <span tw="dark:text-gray-300 text-right px-2">Country</span>
                    <div
                      id="country"
                      tw="focus:outline-none px-3 w-full flex items-center"
                    >
                      <select
                        disabled={reqStatus === "pending"}
                        value={bodyData.country || "KR"}
                        onChange={(e) => {
                          const {
                            target: { value: va },
                          } = e;

                          handleSelectChange(e);
                        }}
                        onBlur={(e) => {
                          const {
                            target: { value: va },
                          } = e;

                          handleSelectChange(e);
                        }}
                        // defaultValue={"KR"}
                        name="country"
                        tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
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
                  </label>
                  {bodyData.country === "US" && (
                    <motion.label
                      css={[
                        css`
                          /*  */
                          /*  */
                          /* ${tw`h-12 py-3`} */
                          height: 0px;
                          overflow-y: hidden;
                          /* border: crimson solid 1px; */
                        `,
                        tw`flex border-t border-gray-200 items-center select-none relative`,
                      ]}
                      animate={{
                        height: ["0rem", "3rem"],
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <span tw="dark:text-gray-300 text-right px-2">State</span>
                      <div
                        id="state"
                        tw="focus:outline-none px-3 w-full flex items-center"
                      >
                        <select
                          disabled={reqStatus === "pending"}
                          value={bodyData.regionOrState || "CO"}
                          onChange={(e) => {
                            const {
                              target: { value: va },
                            } = e;

                            handleSelectChange(e);
                          }}
                          onBlur={(e) => {
                            const {
                              target: { value: va },
                            } = e;

                            handleSelectChange(e);
                          }}
                          name="regionOrState"
                          // defaultValue={"CO"}
                          tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
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
                    </motion.label>
                  )}
                </fieldset>
                <hr tw="margin-top[-12px]" />
                <div
                  css={[
                    tw`my-4 h-10 relative border-pink-600`,
                    css`
                      & button {
                        position: absolute;
                        right: 6px;
                        margin-right: 16px;
                        margin-top: 6px;
                        width: 100px;
                      }
                    `,
                  ]}
                >
                  <Button
                    /* onClick={() => {
                    console.log("clicked");
                  }} */
                    disabled={!bodyDataChanged || reqStatus === "pending"}
                    size="small"
                    variant="secondary"
                  >
                    {"Save"}
                    {reqStatus === "pending" && (
                      <span tw="inline-block ml-2 relative top[3px]">
                        <Loader size={14} color="#357575" />
                      </span>
                    )}
                  </Button>
                </div>
              </section>
            </form>
          </section>
        }
      </div>
      {errorMessage && (
        <InvalidDataAlert
          visible
          header="Error!"
          text={errorMessage}
          variant="error"
        />
      )}
    </Fragment>
  );
};

export default ProfileView;
