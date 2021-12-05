/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, MouseEvent } from "react";
import { useState, Fragment, createRef, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

import { useSession } from "next-auth/react";

import { useActor } from "@xstate/react";

import {
  EE,
  fse,
  profileDropdownService,
} from "@/machines/profile_dropdown_machine";

import ProfileDropdownMenu from "./ProfileDropdownMenu";

import isSSR from "@/util/isSSR";

import useProfileMenuData from "@/hooks/useProfileMenuData";

const ProfileDropdownButton: FC = () => {
  const { data } = useSession();

  const profileData = useProfileMenuData();

  const dropdownButtonRef = createRef<HTMLButtonElement>();

  const [
    {
      context: { dropdownFocused },
      value: stateVal,
    },
    dispatch,
  ] = useActor(profileDropdownService);

  const handleClick = () => {
    if (stateVal === fse.opened) {
      let tid: NodeJS.Timeout;

      new Promise((res, rej) => {
        tid = setTimeout(() => {
          res("");
        }, 236);
      }).then(() => {
        const tId = setTimeout(() => {
          dispatch({
            type: EE.CLOSE,
          });

          window.clearTimeout(tId);
          window.clearTimeout(tid);
        }, 196);
      });

      /* dispatch({
        type: EE.CLOSE,
      }); */
    } else {
      dispatch({
        type: EE.OPEN,
      });
    }
  };

  useEffect(() => {
    const elIds = ["prof-drop-b", "prof-drop"];

    if (isSSR()) return;

    const dropButton = document.querySelector(`#${elIds[0]} > button`);
    // const dropMenu = document.querySelector(elIds[1]);

    const dropButtonSpan = document.querySelector(
      `#${elIds[0]} > button > span`
    );
    const dropButtonSvg = document.querySelector(`#${elIds[0]} > button svg`);

    if (!dropdownButtonRef.current) return;

    const bodyMousedownHandler = (e: MouseEvent<HTMLBodyElement>) => {
      /* console.log({
        dropButton,
        dropButtonSpan,
      }); */

      /* console.log(
        e.currentTarget === dropButton || e.currentTarget === dropButtonSpan
      );
     */

      // console.log(e.currentTarget, dropButton);

      if (
        e.target === dropButton ||
        e.target === dropButtonSpan ||
        e.target === dropdownButtonRef.current ||
        e.target === dropButtonSvg
      ) {
        // console.log("clicked");
        return;
      }

      let timeoutId: NodeJS.Timeout;

      new Promise((res, rej) => {
        setTimeout(() => {
          res("");
        }, 196);
      })
        .then(() => {
          return new Promise((res, rej) => {
            timeoutId = setTimeout(() => {
              res("");
            }, 36);
          });
        })
        .then(() => {
          const tId = setTimeout(() => {
            dispatch({
              type: EE.CLOSE,
            });

            window.clearTimeout(timeoutId);
            window.clearTimeout(tId);
          }, 196);
        });
    };
    // @ts-ignore
    document.body.addEventListener("mousedown", bodyMousedownHandler);
    // document.body.addEventListener("mousedown", () => {
    // console.log("mdown test");
    // });

    return () => {
      // @ts-ignore
      document.body.removeEventListener("mousedown", bodyMousedownHandler);
    };
  }, [dispatch, dropdownButtonRef]);

  if (!profileData) {
    return null;
  }

  return (
    <Fragment>
      {profileData.id && (
        <div
          id="prof-drop-b"
          css={[
            css`
              transition-property: background-color;
              transition-duration: 600ms;
            `,
            tw`relative margin-top[-5px] inline-block light:bg-l bg-gray-800`,
          ]}
        >
          {/* <!-- Dropdown toggle button --> */}
          <button
            ref={dropdownButtonRef}
            onClick={handleClick}
            css={[
              css`
                transition-property: background-color;
                transition-duration: 600ms;
              `,
              tw`relative z-index[5] flex items-center px-1 py-1 text-sm text-gray-600 bg-l border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none`,
            ]}
          >
            <span tw="mx-1">{profileData.name}</span>
            <motion.span
              animate={{
                rotateZ: stateVal === fse.opened ? [0, 180] : [180, 0],
              }}
              transition={{
                duration: 0.16,
              }}
            >
              <svg
                tw="w-5 h-5 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"
                ></path>
              </svg>
            </motion.span>
          </button>
          {/* {dropdownVisible && ( */}
          <ProfileDropdownMenu
            id={profileData.id}
            image={
              data?.profile?.image && data?.profile?.image !== ""
                ? data?.profile?.image
                : profileData.image
            }
            name={profileData.name}
            email={profileData.email}
            role={profileData.role}
          />
          {/* )} */}
        </div>
      )}
    </Fragment>
  );
};

export default ProfileDropdownButton;
