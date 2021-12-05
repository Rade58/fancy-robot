/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ClipLoader as Loader } from "react-spinners";

import useHamburgerClose from "@/hooks/useHamburgerClose";

const SignInButton: FC<{
  disableFocus?: boolean;
  disable?: boolean;
}> = ({ disableFocus, disable }) => {
  const { push, asPath } = useRouter();

  const { status } = useSession();

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const { handleHamburgerClose } = useHamburgerClose();

  let tabIndex = 0;

  if (disableFocus) {
    tabIndex = -1;
  }

  return (
    <Fragment>
      {status === "unauthenticated" && asPath !== "/signin" && (
        <div css={[tw`my-2.5 mr-0.5 md:-my-1 md:mr-1 md:ml-1.5`]}>
          <button
            tabIndex={tabIndex}
            disabled={reqStatus === "pending" || disable}
            css={[
              reqStatus === "pending" || disable
                ? tw`opacity-30 cursor-default`
                : tw``,

              tw`dark:text-white bg-__primary width[88.91px] px-3 py-0.5 rounded`,
            ]}
            onMouseDown={() => {
              setReqStatus("pending");
              push("/signin").then(() => {
                setReqStatus("idle");
              });
              handleHamburgerClose();
            }}
          >
            Sign In
            {/* {reqStatus === "idle" ? "Sign In" : <Loader size={12} />} */}
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SignInButton;
