/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { useActor } from "@xstate/react";
import { useRouter } from "next/router";
import { EE, searchToggService, fse } from "@/machines/search_togg_machine";

const SearchToggle: FC = () => {
  const [
    {
      context: { open },
    },
    dispatch,
  ] = useActor(searchToggService);
  const { asPath } = useRouter();
  const isOrder = asPath.includes("order/");

  if (isOrder) return null;

  return (
    <>
      {!open && (
        <section
          onClick={() => {
            dispatch({
              type: EE.TOGGLE,
            });
          }}
          onKeyDown={() => {
            dispatch({
              type: EE.TOGGLE,
            });
          }}
          aria-label="search button"
          // eslint-disable-next-line
          role="button"
          className="search-box"
          css={[
            tw`md:flex hidden`,
            css`
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;

              /* display: flex; */
              width: 116px;

              margin-right: 6px;

              ${tw`border dark:border-__secondary_dark border-__secondary`}

              & kbd {
                box-shadow: 1px 1px 1px 1px;
                padding: 2px;
                /* margin: 0; */
                font-size: 12px;
                user-select: none;

                ${tw`dark:text-gray-200 text-gray-800`}
              }
              & button {
                padding: 4px;
              }
            `,
          ]}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="se"
            tw="h-6 w-6 dark:text-yellow-500 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <kbd tw="mr-1">Ctrl</kbd>{" "}
          <span tw="dark:text-gray-200 text-gray-900">+</span>{" "}
          <kbd tw="ml-1">K</kbd>
        </section>
      )}
    </>
  );
};

export default SearchToggle;
