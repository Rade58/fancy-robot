/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Rating: FC<{ value: number }> = ({ value }) => {
  const five = new Array(5).fill(1);

  return (
    <section css={[tw`ml-4 mb-2 mt-0.5`]}>
      <div tw="flex items-center mt-1 mb-0.5 h-7">
        {five.map((one, i) => {
          // console.log({ value });

          return (
            <svg
              key={`${i}-${one}`}
              css={[
                value > i
                  ? tw`dark:text-yellow-400 light:text-yellow-500`
                  : tw`text-gray-400`,
                tw`width[1.21rem] height[1.21rem] fill-current`,
              ]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          );
        })}
      </div>
    </section>
  );
};

export default Rating;
