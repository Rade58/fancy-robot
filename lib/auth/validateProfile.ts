// WE CAN'T HAVE SCENARIO THAT WHEN WE HAVE VALID USER
// YOU SIMPLY AN NAVIGATE USER TO THE /profile/<whatever>
// WE MUST CHECK THAT WE CAN ONY RENDER PAGE OF CURRENT USER (CURRENT PROFILE)

import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
// import { NAV_UNAUTH_HISTORY } from "@/constants/index";

import type { paramsType } from "@/pages/profile/[profileId]";

type ReturnType = "authorized" | "unauthenticated" | "unauthorized";

/**
 *
 * @param ctx GetServerSidePropsContext
 * @returns "authorized" | "unauthenticated" | "unauthorized"
 * @description use this inside "getServerSideProps" hen you intend
 * to redirect user if he stumbbled on unauthorized page
 * (that can be profile page of another user for example)
 */
const validateProfile = async (
  ctx: GetServerSidePropsContext<paramsType>
): Promise<ReturnType> => {
  // PROFILE ID FROM SESSION MUST MATCH PARAMS
  const session = await getSession({ req: ctx.req });

  if (!session) {
    // console.log("11111111111111111111111111111111111");

    return "unauthenticated";
  }
  if (!session.profile) {
    // console.log("2222222222222222222222222222");

    return "unauthorized";
  }

  const { id } = session.profile;

  if (!id) {
    // console.log("33333333333333333333333333333");

    return "unauthorized";
  }

  // THESE TWO HAVE SAME VALUE (WE WILL STICK WITH USING params)
  // const {profileId} = ctx.query;
  // const {profileId} = ctx.params;

  if (!ctx.params) {
    // console.log("444444444444444444444444444");

    return "unauthenticated";
  }

  if (ctx.params && !ctx.params.profileId) {
    // console.log("5555555555555555555555555555555555");

    return "unauthorized";
  }

  if (id === ctx.params.profileId) {
    return "authorized";
  }
  // console.log({ id }, { profileId: ctx.params.profileId });
  // console.log("666666666666666666666666666666666");

  return "unauthenticated";
};

export default validateProfile;
