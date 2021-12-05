/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { useTheme } from "next-themes";

import { fse, hamburgerService } from "@/machines/hamburger_machine";
import isSSR from "@/util/isSSR";

const DarkIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const LightIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const Switcher: FC<{
  disableFocus?: boolean;
  largeScreen?: boolean;
}> = ({ disableFocus, largeScreen }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const [{ value }] = useActor(hamburgerService);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  let tabIndex = 0;

  if (disableFocus) {
    tabIndex = -1;
  }
  /* 
  const pick = 

  const disabled = 
 */

  return (
    <>
      {!isSSR() && mounted && (
        <section>
          <button
            disabled={largeScreen ? false : value === fse.closed}
            onBlur={() => {
              setClicked(false);
            }}
            onMouseDown={() => {
              setClicked(true);
            }}
            // tabIndex={tabIndex}
            css={[
              clicked
                ? tw`focus:outline-none`
                : tw`focus:outline-black dark:focus:outline-white`,

              tw`w-10 h-5 rounded-full bg-white flex items-center transition duration-300 shadow border-2 border-gray-800`,
            ]}
            onClick={() => {
              // TOGGLE THEME

              if (isSSR()) return;

              setTimeout(() => {
                if (theme === "dark") {
                  setTheme("light");

                  return;
                } else {
                  setTheme("dark");
                  return;
                }
              }, 200);
            }}
          >
            <div
              id="switch-toggle"
              css={[
                tw`w-6 h-6 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white`,
                theme === "dark"
                  ? tw`bg-gray-700 translate-x-full`
                  : tw`bg-yellow-500 -translate-x-2`,
              ]}
            >
              {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg> */}
              {/* DOING THIS BECAUSE OF SSR (MAYB THIS I USELESS IN THIS INSTANCE) todo: refactor this */}
              {mounted && (
                <>{theme === "dark" ? <DarkIcon /> : <LightIcon />}</>
              )}
            </div>
          </button>
        </section>
      )}
    </>
  );
};

export default Switcher;
