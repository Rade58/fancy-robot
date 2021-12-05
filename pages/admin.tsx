/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { signOut } from "next-auth/react";

import Button from "@/components/buttons/Button";

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
  const { params } = ctx;

  params?.siteId; //

  const authOptions = await redirectToSigninIfNoAuth(ctx, "/signin", {
    role: "ADMIN",
  });

  if (authOptions.status === "unauthenticated") {
    return {
      redirect: authOptions.redirect,
      props: {
        nothing: true,
      },
    };
  }

  return {
    props: {
      placeholder: true,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return (
    <div>
      Profile
      <div>
        <Button
          outlined
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/" });
          }}
          variant="secondary"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Page;
