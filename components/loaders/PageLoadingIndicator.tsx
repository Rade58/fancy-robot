/* eslint jsx-a11y/anchor-is-valid: 1 */
import tw, { css } from "twin.macro";
import type { FC } from "react";

import { motion } from "framer-motion";

import useGetPageLoading from "@/hooks/useGetPageLoading";

const PageLoadingIndiccator: FC = () => {
  const { state } = useGetPageLoading();

  const { context } = state;

  return (
    <section
      // mt="10px"

      css={[
        css`
          transition-property: background-color;
          transition-duration: 600ms;
        `,
        tw`mb-0 p-0 self-start w-full dark:bg-gray-800 light:bg-l`,
      ]}
    >
      <motion.div
        tw="dark:bg-l light:bg-good"
        transition={{
          duration: 0.08,
        }}
        animate={{
          width: `${context.progressValue}%`,
        }}
        css={[
          css`
            /* background-image: linear-gradient(
            to right,
            rgba(221, 101, 151, 0.577) 22%,
            rgba(201, 46, 79, 0.577) 45%,
            rgba(168, 11, 51, 0.904) 86%,
            rgba(224, 91, 124, 0.918) 100%
          ); */
            height: 3px;
            /* width: 20px; */
            margin: 0;
            padding: 0;
          `,
        ]}
      ></motion.div>
    </section>
  );
};

export default PageLoadingIndiccator;
