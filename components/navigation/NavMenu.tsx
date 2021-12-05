/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useState, useEffect, Fragment } from "react";
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";

import { useRouter } from "next/router";

import { motion } from "framer-motion";

import { useActor } from "@xstate/react";

import isSSR from "@/util/isSSR";

import { EE, headerNCartService } from "@/machines/header_n_cart_machine";
import { cartService } from "@/machines/cart_machine";
import { hamburgerService, EE as EEE, fse } from "@/machines/hamburger_machine";

import Switcher from "../color_mode/Switcher";

import SpinnerPageLoading from "../loaders/SpinnerPageLoading";

import SignOutButton from "../auth/SignOutButton";
import SignInButton from "../auth/SignInButton";
import ProfileDropdownButton from "../dropdowns/ProfileDropdownButton";
import MobileProfileButton from "../profile/MobileProfileButton";
import SearchToggle from "../SearchToggle";
import SearchMobileToggle from "../SearchMobileToggle";

import { consistantNavList } from "@/constants/index";

const Nav: FC = () => {
  const { asPath } = useRouter();

  let isProfileOrAdminPage = false;

  if (asPath.includes("/profile")) {
    isProfileOrAdminPage = true;
  }

  if (asPath.includes("/profile/stats")) {
    isProfileOrAdminPage = false;
  }

  if (asPath.includes("/admin")) {
    isProfileOrAdminPage = true;
  }

  const [____, dispatchToHeaderNcart] = useActor(headerNCartService);
  const [hamburgerState, dispatchToHamburger] = useActor(hamburgerService);

  const [cartState] = useActor(cartService);

  const cartIsEmpty = Object.keys(cartState.context.cart).length === 0;

  // const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);

  const [contentScaledTo0, setContentScaledTo0] = useState<boolean>(false);

  const paths = [
    ...consistantNavList,
    // {
    // href: "/signin",
    // name: "Sign In",
    // },
    // {
    // href: "/admin",
    // name: "Admin",
    // },
    /* {
      href: "/contact",
      name: "Contact",
    },
    {
      href: "/about",
      name: "About",
    }, */
  ];

  const toggleMobileMenu = () => {
    if (isSSR()) return;

    if (hamburgerState.value === fse.open) {
      dispatchToHamburger({
        type: EEE.CLOSE,
      });
    }

    if (hamburgerState.value === fse.closed) {
      dispatchToHamburger({
        type: EEE.OPEN,
      });
    }
  };

  useEffect(() => {
    if (hamburgerState.context.hamburgerOpened) {
      setTimeout(() => {
        setContentScaledTo0(false);
      }, 100);
    } /*  else {
      setTimeout(() => {
        setContentScaledTo0(true);
      }, 100);
    } */
  }, [hamburgerState, setContentScaledTo0]);

  // I NEED EFFECT BECAUSE OF FRMER MOTION COMPONENT
  // AND SSR (THEY DON'T GO TOGETER NICE (MOUNTED IT FIRST))
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // console.log({ mobileMenuOpened });

  return (
    <nav
      css={[
        css`
          transition-property: background;
          transition-duration: 0.4s;

          & button {
            cursor: pointer;
          }

          & a {
            cursor: pointer;
          }
        `,
        tw`shadow overflow-hidden md:overflow-visible`,
      ]}
    >
      <div tw="container px-2 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div tw="flex items-center justify-between">
          <div>
            <Link href="/">
              <a tw="ml-2 text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                {/* eslint-disable-next-line */}
                <span>🤖</span>
                <span tw=" text-sm   md:display[inline] display[none]">
                  FancyRobotShop
                </span>
                <span tw=" text-sm md:display[none] display[inline]">
                  FRshop
                </span>
              </a>
            </Link>
          </div>
          <SpinnerPageLoading />

          {/* <!-- Mobile menu button --> */}
          <div tw="flex md:hidden">
            <button
              // tabIndex={-1}
              onClick={() => {
                setContentScaledTo0(true);

                setTimeout(() => {
                  toggleMobileMenu();
                }, 50);
              }}
              type="button"
              css={[
                tw`text-gray-500 dark:text-gray-200 hover:color[gold] dark:hover:text-gray-400`,
              ]}
              aria-label="toggle menu"
            >
              <svg
                viewBox="0 0 24 24"
                css={[
                  tw`w-6 h-6 fill-current`,

                  css`
                    &:hover path {
                      ${tw`dark:fill[gold] fill[#9b77df]`}
                    }
                    & path {
                      ${tw`dark:fill[#cfaad3] fill[#0c5e85]`}
                    }
                  `,
                ]}
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div tw="items-center md:flex">
          {mounted && (
            <motion.div
              animate={{
                scale: contentScaledTo0 ? 0 : 1,
                x: contentScaledTo0 ? -200 : 0,
              }}
              /* initial={{
                scale: 0,
                x: -200,
                y: 0,
              }} */
              transition={{ duration: 0.3 }}
              css={css`
                /* only for transition to work */
                /* we will use max height because percents don't work */
                max-height: 180px;
                /*  */
                height: auto;

                transform: scale(0) translateX(-200) /* translateY(-200) */;

                & a {
                  display: block;
                  width: 100%;
                }

                & .mobile-theme-switcher {
                  /* border: crimson solid 1px; */
                  width: fit-content;
                  ${tw`mr-auto relative md:top-0 top-0.5 pt-4 mb-4 ml-2.5`}
                }

                transition-property: max-height;
                transition-duration: 0.2s;
                transition-timing-function: ease-out;
              `}
              tw="transform-gpu flex-col sm:flex xl:hidden lg:hidden md:hidden"
              style={{
                maxHeight: hamburgerState.context.hamburgerOpened
                  ? "180px"
                  : "0px",
              }}
            >
              {/* {hamburgerState.value === fse.open && ( */}
              <div
                css={css`
                  display: flex;
                  width: 98vw;
                `}
                className="mobile-theme-switcher"
              >
                <Switcher />
              </div>
              {/*  )} */}
              <SearchMobileToggle />

              <SignOutButton /* disableFocus */
                disable={hamburgerState.value === fse.closed}
              />
              <SignInButton /* disableFocus */
                disable={hamburgerState.value === fse.closed}
              />
              <MobileProfileButton />
              {paths.map(({ href, name }, i) => {
                return (
                  <Link href={href} key={`${i}-`}>
                    <a tw="ml-4 mt-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                      {name}
                    </a>
                  </Link>
                );
              })}
            </motion.div>
          )}
          <SearchToggle />
          <div
            css={css`
              & .theme-switcher {
                /* border: crimson solid 1px; */
                margin-right: 10px;
                padding-right: 20px;
              }
            `}
            tw="flex-row hidden xl:flex lg:flex md:flex md:mx-6 sm:hidden"
          >
            {paths.map(({ href, name }, i) => {
              return (
                <Link href={href} key={`${i}-`}>
                  <a tw="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                    {name}
                  </a>
                </Link>
              );
            })}

            {!isProfileOrAdminPage && <ProfileDropdownButton />}
            {isProfileOrAdminPage && <SignOutButton />}
            <SignInButton />
          </div>
          <div
            className="theme-switcher"
            tw="display[none] md:display[block] mr-2 ml-4"
          >
            <Switcher largeScreen />
          </div>

          <div tw="flex justify-center md:block w-0.5 absolute left-1/2 top-4">
            {/* {!cartIsEmpty && ( */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{
                rotate: !cartIsEmpty ? [360, 0] : [-20, 360],
                scale: !cartIsEmpty ? [1, 1, 1, 1] : [2, 1, 2.2, 1],
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.8,
              }}
              onClick={() =>
                dispatchToHeaderNcart({
                  type: EE.TOGGLE,
                })
              }
              css={[
                css`
                  & svg {
                    transform: scale(1.2);

                    ${tw`dark:stroke[gold] stroke[#0c5e85]`}
                  }
                  &:hover svg {
                    ${tw`dark:stroke[#c55797] stroke[#9b77df]`}
                  }
                `,

                cartIsEmpty ? tw`hidden` : tw`visible`,

                tw`relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300`,
              ]}
            >
              <svg
                tw="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  // stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* IF THERE I SOMETHING IN THE CART USE THIS */}
              {/* <span tw="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span> */}
            </motion.button>
            {/* )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
