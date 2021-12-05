/* eslint jsx-a11y/anchor-is-valid: 1 */
import tw, { css, theme } from "twin.macro";
import type { FC } from "react";
import Loader from "react-spinners/ClipLoader";
import { useTheme } from "next-themes";

import { useActor } from "@xstate/react";

import {
  pageLoadingProgressService,
  fse,
} from "@/machines/page_loading_progress_machine";

interface SpinnerPageLoadingI {
  positionAbsolute?: boolean;
}

const SpinnerPageLoading: FC<SpinnerPageLoadingI> = ({ positionAbsolute }) => {
  const [state, ___] = useActor(pageLoadingProgressService);

  const { theme } = useTheme();

  return (
    <section
      style={{
        position: positionAbsolute ? "absolute" : "initial",
      }}
      // border="crimson solid 2px"
      // position="absolute"
      css={css`
        margin-right: auto;
        margin-left: 6px;
        display: flex;
        justify-content: center;
        top: 28%;
        left: 20%;
        @media screen and (max-width: 720px) {
          left: 36%;
          /* background-color: seagreen; */
        }
      `}
    >
      <div tw="flex w-min items-center">
        <Loader
          color={theme === "dark" ? "white" : "seagreen"}
          loading={state.value === fse.started}
          size={20}
        />
      </div>
    </section>
  );
};

export default SpinnerPageLoading;
