/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Order, Profile } from "@prisma/client";

import prisma from "@/lib/prisma";

import { getSession } from "next-auth/react";

import Layout from "@/components/7_shipping_page/Layout";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

export interface PropsI {
  order: Order;
  profile: Profile;
}

export type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  // const { params } = ctx;

  const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

  if (redirectOptions.status === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: redirectOptions.redirect,
    };
  }

  // WE WILL CHECK IF ORDER EXISTS
  // IF NOT WE ARE GOING TO REDIRRECT TO THE MAIN PAGE
  const order = await validateOrder(ctx);
  if (order === "unauthorized" || order === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const session = await getSession({
    req: ctx.req,
  });

  if (!session) {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const profile = await prisma.profile.findUnique({
    where: {
      id: session.profile?.id,
    },
  });

  if (!profile) {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
      profile,
    },
  };
};

const ShippingPage: NP<PropsI> = (props) => {
  //

  console.log(props);
  // eslint-disable-next-line
  return (
    <div>
      <Layout {...props} />
    </div>
  );
};

export default ShippingPage;
