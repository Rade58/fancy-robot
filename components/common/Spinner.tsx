/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Spinner: FC = () => {
  return (
    <div tw="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div tw="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner;
