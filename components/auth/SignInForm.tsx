/* eslint jsx-a11y/anchor-is-valid: 1 */
import tw, { css, styled, theme } from "twin.macro";
import type { FC, ChangeEventHandler, FormEvent } from "react";
import { useState, useCallback, useEffect } from "react";

import * as Yup from "yup";

import type { LiteralUnion } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers/index";

import { useRouter } from "next/router";

import { signIn, useSession } from "next-auth/react";

import { motion } from "framer-motion";

import useHamburgerClose from "@/hooks/useHamburgerClose";

import useIsMounted from "@/hooks/useIsMounted";

//
//

import Spinner from "@/components/common/Spinner";

import { ClipLoader as Loader } from "react-spinners";

import type { PropsI as SigninPagePropsI } from "@/pages/signin";

const schema = Yup.object().shape({
  email: Yup.string().required().min(10).max(28).email("Invalid email"),
});

const validateEmail = (email: string) => schema.isValidSync({ email });

// schema.isValid({ email: "aaa" }).then((val) => console.log(val));

const SignInText: FC<{ pending: boolean }> = ({ pending, children }) => {
  return (
    <span tw="inline-block">
      {!pending ? (
        children
      ) : (
        <span tw="flex ml-2 w-14 justify-center">
          <Loader size={14} color="rebeccapurple" />
        </span>
      )}
    </span>
  );
};

interface PropsI {
  unauthPath: SigninPagePropsI["unauthPath"];
}

const SignInForm: FC<PropsI> = ({ unauthPath }) => {
  const { handleHamburgerClose } = useHamburgerClose();

  // console.log({ unauthPath });
  /* 
  const { push, asPath } = useRouter();
  const { data, status } = useSession(); 
  */

  const isMounted = useIsMounted();

  const handleSignin = async (
    provider: BuiltInProviderType,
    options?: {
      email?: string;
    }
  ) => {
    /* let pth = unauthPath;

    if(!pth){
      pth = process.env.NEXTAUTH_URL + "/"
    } */

    let email: string | undefined;

    if (options && options.email) {
      email = options.email;
    }

    if (provider !== "email" && email) {
      throw new Error("'email' providers requires valid email");
    }
    if (provider === "email" && !email) {
      throw new Error(
        "If you passed valid email in option, provider needs to be 'email'"
      );
    }

    if (email && provider === "email") {
      if (unauthPath) {
        return signIn("email", { email, callbackUrl: unauthPath });
      }

      return signIn("email", { email });
    }

    if (unauthPath) {
      return signIn(provider, { callbackUrl: unauthPath });
    }

    return signIn(provider);
  };

  const [{ email }, setFields] = useState<{
    email: string;
  }>({
    email: "",
  });

  const [emailValidity, setEmailValidity] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const checkEmailValidity = () => {
    const val = validateEmail(email);

    if (!val) return setEmailValidity("invalid");

    return setEmailValidity("valid");
  };
  // -------------------------------------------------------
  // -------------------------------------------------------

  // console.log({ email });

  const [emailReqStatus, setEmailReqStatus] = useState<"idle" | "pending">(
    "idle"
  );
  const [githubReqStatus, setGithubReqStatus] = useState<"idle" | "pending">(
    "idle"
  );
  const [googleReqStatus, setGoogleReqStatus] = useState<"idle" | "pending">(
    "idle"
  );
  const [facebookReqStatus, setFacebookReqStatus] = useState<
    "idle" | "pending"
  >("idle");

  const handleChange: ChangeEventHandler<
    // HTMLInputElement  | HTMLTextAreaElement
    EventTarget & HTMLInputElement
  > = (e) =>
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  // GITHUB SIGNIN
  const signinWithGithub = async () => {
    setGithubReqStatus("pending");
    // return;
    try {
      const resp = await handleSignin("github");
      handleHamburgerClose();
      // console.log({ resp });
    } catch (err) {
      setGithubReqStatus("idle");

      console.error(err);
    }
  };
  // GOOGLE SIGNIN
  const signinWithGoogle = async () => {
    setGoogleReqStatus("pending");
    // return;
    try {
      const resp = await handleSignin("google");
      handleHamburgerClose();
      // console.log({ resp });
    } catch (err) {
      setGoogleReqStatus("idle");

      console.error(err);
    }
  };
  // FACEBOOK SIGNIN
  const signinWithFacebook = async () => {
    setFacebookReqStatus("pending");
    // return;
    try {
      const resp = await handleSignin("facebook");

      handleHamburgerClose();

      // console.log({ resp });
    } catch (err) {
      setFacebookReqStatus("idle");

      console.error(err);
    }
  };

  /* const 

  useEffect(() => {

  }, []) */

  const embd = emailReqStatus === "pending" ? true : false;
  const ghbd = githubReqStatus === "pending" ? true : false;
  const goobd = googleReqStatus === "pending" ? true : false;
  const fabd = facebookReqStatus === "pending" ? true : false;

  const buttonDisabled = ghbd || goobd || fabd || embd;

  // EMAIL SUMBIT
  const handleEmailSigninSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (buttonDisabled || emailValidity === "invalid") {
        return;
      }

      if (email === "") {
        return;
      }

      // console.log("submit");

      setEmailReqStatus("pending");
      // return;
      try {
        //
        // TRY SIGNING IN
        const resp = await handleSignin("email", { email });
        handleHamburgerClose();
        // console.log({ resp });
      } catch (err) {
        setEmailReqStatus("idle");
        //

        console.error(err);
      }
    },
    [email, setEmailReqStatus, buttonDisabled, emailValidity]
  );

  return (
    <>
      {isMounted && (
        <motion.section
          animate={{
            x: ["-350%", "0%"],
          }}
          transition={{
            duration: 0.6,
            ease: "linear",
            bounce: 0.5,
            bounceStiffness: 0.6,
          }}
          css={[
            css`
              transform: translateX(-350%);
            `,
          ]}
        >
          <div tw="w-full lg:w-4/12 px-4 mx-auto pt-6 mt-12">
            <div tw="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg dark:bg-gray-700 bg-gray-300 border-0">
              <div tw="rounded-t mb-0 px-6 py-6">
                <div tw="text-center mb-3">
                  <h6 tw="text-gray-500 dark:text-gray-300 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div tw="text-center">
                  <button
                    disabled={buttonDisabled}
                    onClick={() => {
                      // console.log("button enabled");
                      signinWithGithub();
                    }}
                    tw="w-28 bg-white active:bg-gray-50 text-gray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      tw="w-5 mr-1"
                      src="/images/social/github.svg"
                    />

                    <SignInText pending={githubReqStatus === "pending"}>
                      Github
                    </SignInText>
                  </button>
                  <button
                    disabled={buttonDisabled}
                    onClick={() => {
                      // console.log("button enabled");
                      signinWithGoogle();
                    }}
                    tw="w-28 mr-2 bg-white active:bg-gray-50 text-gray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      tw="w-5 mr-1"
                      src="/images/social/google.svg"
                    />
                    <SignInText pending={googleReqStatus === "pending"}>
                      Google{" "}
                    </SignInText>
                  </button>
                  <button
                    disabled={buttonDisabled}
                    onClick={() => {
                      // console.log("button enabled");
                      signinWithFacebook();
                    }}
                    tw="w-32 bg-white active:bg-gray-50 text-gray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      tw="w-5 mr-1"
                      src="/images/social/fb-round.svg"
                    />
                    <SignInText pending={facebookReqStatus === "pending"}>
                      Facebook{" "}
                    </SignInText>
                  </button>
                </div>
                <hr tw="mt-6 border-b-2 border-gray-300" />
              </div>
              <div tw="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div tw="text-gray-400 text-center mb-3 font-bold">
                  <small>Or sign in with email magic link</small>
                </div>
                <form onSubmit={handleEmailSigninSubmit}>
                  <div tw="relative w-full mb-3">
                    <label
                      tw="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
                      htmlFor="e-thing"
                    >
                      Email
                      {emailValidity === "invalid" && (
                        <span tw="inline-block ml-8 lowercase font-light text-__hazard">
                          Invalid email!
                        </span>
                      )}
                    </label>
                    <input
                      // value={email}
                      onChange={handleChange}
                      onBlur={() => {
                        checkEmailValidity();
                      }}
                      id="e-thing"
                      type="email"
                      name="email"
                      tw="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>
                  {/* <div tw="relative w-full mb-3">
                <label
                  tw="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  tw="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div> */}
                  <div>
                    <label tw="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        tw="border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span tw="ml-2 text-sm font-semibold text-gray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  <div tw="text-center mt-6">
                    <button
                      /* onMouseEnter={() => {
                        checkEmailValidity();
                      }}
                      onMouseMove={() => {
                        checkEmailValidity();
                      }}
                      onMouseOver={() => {
                        checkEmailValidity();
                      }}
                      onMouseLeave={() => {
                        checkEmailValidity();
                      }}
                      onFocus={() => {
                        checkEmailValidity();
                      }} */
                      // disabled={buttonDisabled || emailValidity === "invalid"}
                      type="submit"
                      css={[
                        buttonDisabled || emailValidity === "invalid"
                          ? tw`opacity-60 cursor-default`
                          : tw``,
                        tw`bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`,
                      ]}
                    >
                      {" "}
                      Sign In{" "}
                      {emailReqStatus === "pending" && (
                        <span tw="inline-block w-5 ml-1">
                          <Loader color="crimson" size={14} />
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
};

export default SignInForm;

// {
/* <footer tw="relative pt-8 pb-6 mt-2">
        <div tw="container mx-auto px-2">
          <div tw="flex flex-wrap items-center md:justify-between justify-center">
            <div tw="w-full md:w-6/12 px-4 mx-auto text-center">
              <div tw="text-sm text-gray-500 font-semibold py-1">
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  tw="text-gray-500 hover:text-gray-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Notus JS
                </a>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  tw="text-gray-500 hover:text-gray-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer> */
// }
