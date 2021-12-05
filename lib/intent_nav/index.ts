import type { GetServerSidePropsContext, Redirect } from "next";
import type { Role } from "@prisma/client";

import { getSession } from "next-auth/react";

import cookie from "cookie";

import { NAV_UNAUTH_HISTORY } from "@/constants/index";

// PROTECTED PAGE SHOUD PASS URL FROM ITS PROPS
//

/**
 *
 * @param ctx GetServerSidePropsContext
 * @description calling this function when user hits unauthorized page,
 * just before redirect to the /signin page
 * In this function we are setting cookie with a path we want to hit
 * after signin (a path that user intended to visit at the first place)
 * IMPORTANT! (ON SIGNIN PAGE SERVR SIDE): we will read cookie and
 * we will erase it (but we are going to pass path as a prop)
 */
const buildUnAuthHistoryPathCookie = (ctx: GetServerSidePropsContext) => {
  /* if(!absPath.startsWith("http")){
    throw new Error("absPath needs to start with 'http'");
  } */

  const resolvedUrl = ctx.resolvedUrl;

  let path: string;

  if (resolvedUrl.includes("?") && resolvedUrl.includes("=")) {
    const index = resolvedUrl.indexOf("?");

    const substring = resolvedUrl.slice(0, index);

    path = substring;
  } else {
    path = resolvedUrl;
  }

  console.log({ path });

  // WE WILL BULD httpOnly COOKIE
  // ON UNAUTHORIZED PAGE
  // BUT ON signin PAGE WE ARE GOING TO TAKE THAT COOKIE
  // AND PASS IT AS SERVER SIDE PROP

  const cookies = ctx.req.cookies;

  console.log({ cookies });

  // LETS BUILD ABSOLUTE PATH SINCE WE NEED ABSOLUTE PATH
  // FOR THE callbackUrl FOR THE signIn METHOD OF next-auth

  const absPath = `${process.env.NEXTAUTH_URL}${path}`;

  // ------------ SETTING COOKIE --------
  // DON'T WORRY THIS WONT DESTROY YOUR OTHER COOKIES
  // WE ARE SETTING ONLY ONE
  ctx.res.setHeader(
    "Set-Cookie",
    cookie.serialize(NAV_UNAUTH_HISTORY, absPath, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV !== "development" &&
        process.env.NODE_ENV !== "test",
      maxAge: 60 * 60, // (one hour)(resonable) (this is important only when visiting anauthorized page anyway (can be shorter too))
      sameSite: "strict",
      // THIS IS EVERYWHERE AVAILABILITY ON OUR SITE
      path: "/",
    })
  );
};

//
// FUNCTION FOR CLEARING THE COOKIE

/**
 *
 * @param ctx GetServerSidePropsContext
 * @description just pass context to clear the cookie with a "unauthorized path"
 */
export const clearUnAuthHistoryCookie = (ctx: GetServerSidePropsContext) => {
  // WE ARE BASICALLY SETTING EMPTY STRING
  // AND FOR TH expiration WE ARE SETTING 1970 YEAR
  // WHICH WILL INDICATE TO BROWSER THAT IT SHOULD DELETE THE COOKIE
  ctx.res.setHeader(
    "Set-Cookie",
    cookie.serialize(NAV_UNAUTH_HISTORY, "", {
      httpOnly: true,
      secure:
        process.env.NODE_ENV !== "development" &&
        process.env.NODE_ENV !== "test",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
};

/**
 *
 * @param ctx GetServerSidePropsContext
 * @param redirectTo string (must start with "/")
 * @param authorization optional {role: Role} IF USER ISN'T THIS ROLE IT SHOULD BE REDIRRECTED
 * @description redirecting to the `redirectTo` page if user isn't authenticated
 *
 */
export const redirectToSigninIfNoAuth = async (
  ctx: GetServerSidePropsContext,
  redirectTo: string,
  authorization?: {
    role: Role;
  }
): Promise<
  | {
      status: "unauthenticated";
      redirect: Redirect;
    }
  | {
      // redirect: undefined;
      status: "authenticated";
    }
> => {
  if (!redirectTo.startsWith("/")) {
    throw new Error('"redirectTo" argument must start with "/"');
  }

  //
  const session = await getSession({ req: ctx.req });

  /* 
  console.log("session && authorization && authorization.role");
  console.log(session && authorization && authorization.role);
  */

  if (session && authorization && authorization.role) {
    const { profile } = session;

    if (profile?.role === authorization.role) {
      // AUTHENTICATED AND AUTHORIZED
      return { status: "authenticated" };
    }

    // HERE WE SHOULD SET THE COOKIE
    buildUnAuthHistoryPathCookie(ctx);

    const redirect: Redirect = {
      destination: redirectTo,
      permanent: false,
    };

    return {
      redirect,
      status: "unauthenticated",
    };
  }

  // AUTHENTICATED
  if (session) {
    return { status: "authenticated" };
  }

  // HERE WE SHOULD SET THE COOKIE
  buildUnAuthHistoryPathCookie(ctx);

  const redirect: Redirect = {
    destination: redirectTo,
    permanent: false,
  };

  return { redirect, status: "unauthenticated" };
};
