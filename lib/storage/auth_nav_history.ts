// NO OP NO OP NO OP

//

//

//

//

//

// METHODS TO HELP WHEN UNAUTHENTICATED USER REQUESTS PAGE THAT REQUIRE AUTH
// HE SHOULD BE REDIRECTED TO THE signin PAGE
// BUT AFTER SIGNIN HE SHOULD BE REDIRECTED TO THE PAGE HE REQUESTED

// JUST TO KNOW
// import { signIn, useSession } from "next-auth/react";
// WITH SECOND ARGUMENT OF signIn YOU CAN DEFINE ROUTE TO BE
// NAVIGATED ON SUCCESSFULL SIGNIN
// https://next-auth.js.org/getting-started/client#specifying-a-callbackurl

import cook from "js-cookie";

import cookie from "cookie";

import { NAV_UNAUTH_HISTORY } from "@/constants/index";

// const basePath = process.env.NEXTAUTH_URL;

/**
 *
 * @description getting string in format http<>
 * this is a url of protected page user wanted to visit
 */
const getNavHistory = () => {
  const navHistory = cook.get(NAV_UNAUTH_HISTORY);

  if (navHistory === undefined) {
    return undefined;
  }

  if (!navHistory?.startsWith("http")) {
    throw new Error("Path needs to start with `http`");
  }

  return navHistory;
};

/**
 *
 * @param path in format http<>
 * @returns string | undefined
 * @description stores url of the protected route, user wanted to
 * to visit but he was unauthenticated
 */
const setNavHistory = (path: string) => {
  if (!path.startsWith("http")) {
    throw new Error("Your path should start with `http`");
  }

  cook.set(NAV_UNAUTH_HISTORY, path);

  const navHist = cook.get(NAV_UNAUTH_HISTORY);

  if (navHist === undefined) {
    return undefined;
  }

  if (!navHist?.startsWith("http")) {
    throw new Error("Path needs to start with `http`");
  }

  return navHist;
};

/**
 *
 * @description run this after navigation to protected page happens,
 * when navigation is successful
 */
const clearNavHistory = () => {
  cook.remove(NAV_UNAUTH_HISTORY);

  return undefined;
};

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

//
export const setNavHistoryCookie = () => {
  //
};

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

export default {
  getNavHistory,
  setNavHistory,
  clearNavHistory,
};
