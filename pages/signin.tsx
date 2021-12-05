/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import tw, { css, styled, theme } from "twin.macro";

import type { GetServerSideProps, NextPage as NP } from "next";

import { getSession } from "next-auth/react";
//

// FOR CLEARING UNAUTHORIZED path FROM THE COOKIE
import { clearUnAuthHistoryCookie } from "@/lib/intent_nav";

import { NAV_UNAUTH_HISTORY } from "@/constants/index";

export interface PropsI {
  unauthPath?: string;
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  // WE NEED TO GET COOKIES AND READ THEM

  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {
        unauthPath: "/",
      },
    };
  }

  const cookies = ctx.req.cookies;

  // console.log({ cookies });

  let unauthPath: string | undefined;

  if (cookies[NAV_UNAUTH_HISTORY]) {
    unauthPath = cookies[NAV_UNAUTH_HISTORY];
  }

  // NOW WE CAN DESTROY MENTIONED COOKIE
  clearUnAuthHistoryCookie(ctx);

  // BUT IF unauthPath IS UNDEFINED HERE
  // THAT MEANS WE HAVE NORMAL NAVIGATION WHERE SOMEON CLICKED ON
  // signin LINK (WE DON'T HAVE LINK WE HAVE button WHERE WE USE Router.push)
  // AND WE CAN ACCESS HISTORY (REFERRAL URL)
  // AND WE WILL PASS "referrer" LINK
  // WE CAN USE THIS FROM HEADERS

  // console.log(ctx.req.headers.referer);

  // WE WILL PASS THAT URLS (PREVIOUS URL) AS unauthPath
  // IF unauthPath IS UNEFINED
  unauthPath = ctx.req.headers.referer;

  return {
    props: {
      unauthPath,
    },
  };
};

import Layout from "@/components/4_signin_page/Layout";

const SignInPage: NP<PropsI> = ({ unauthPath }) => {
  /*  useEffect(() => {
    console.log(window.location);
    console.log(window.history);

    
    console.log(document.referrer);
  });
 */
  /* const router = useRouter();

  useEffect(() => {
    console.log("HISTORY HISTORY");

    console.log(window.history);
    console.log(window.location);
  }, []);
 */
  /* if (status === "unauthenticated") {
    return null;
  }
  if (status === "loading") {
    return <span>loading...</span>;
  } */

  return <Layout unauthPath={unauthPath}>{/*  */}</Layout>;
};

export default SignInPage;

// -------------------------
// -------------------------
// -------------------------
// -------------------------
// -------------------------
// -------------------------
// -------------------------
// -------------------------

//
//
//
// {
/*  <h1>Sign In</h1>
      <section
        css={css`
          padding-top: 10vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: center;
          & div.email-field {
            margin-top: 10vh;
            display: flex;
            justify-content: center;
          }
          & button {
            margin-top: 8vh;
          }
        `}
      >
        <form onSubmit={handleSubmit}>
          <div className="email-field">
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              id="email-field"
              placeholder="Sign In/Up With Email"
            />
          </div>

          <button color="primary" type="submit" disabled={buttonDisabled}>
            {"Sign In/Up "}
            {reqStatus === "pending" ? (
              <div
                css={css`
                  display: inline-block;
                  margin-left: 8px;
                `}
              >
                <Spinner />
              </div>
            ) : (
              ""
            )}
          </button>
        </form>
      </section> */
// }
