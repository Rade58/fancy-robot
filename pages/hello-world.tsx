/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { getSession } from "next-auth/react";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  siteId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  // const session = await getSession({ req: ctx.req });

  const query = ctx.query;
  const paramz = ctx.params;
  const resolvedUrl = ctx.resolvedUrl;
  const defaultLocale = ctx.defaultLocale;
  const locale = ctx.locale;
  const locales = ctx.locales;

  console.log(
    // JSON.stringify(
    {
      query,
      params: paramz,
      resolvedUrl,
      defaultLocale,
      locale,
      locales,
    },
    null,
    2
    // )
  );

  const authOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

  if (authOptions.status === "unauthenticated") {
    return {
      redirect: authOptions.redirect,
      props: {
        nothing: true,
      },
    };
  }

  const { params } = ctx;

  params?.siteId; //

  return {
    props: {
      placeholder: true,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>Hello World Page</div>;
};

export default Page;
