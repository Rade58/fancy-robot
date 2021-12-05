/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Stringified: FC<{ data: any }> = ({ data }) => {
  return (
    <section
      css={[
        tw`bg-gray-200 text-black overflow-hidden` /* , tw`hover:text-indigo-600` */,
      ]}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
};

export default Stringified;
