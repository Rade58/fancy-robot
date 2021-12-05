/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import { motion } from "framer-motion";

import useIsMounted from "@/hooks/useIsMounted";

interface PropsI {
  variant: "info" | "warning" | "error" | "success";
  header: string;
  text: string;
  visible: boolean;
  onAnimationComplete?: () => void;
}

const Alert: FC<PropsI> = ({
  header,
  text,
  variant,
  visible,
  onAnimationComplete,
}) => {
  const styles = {
    success: {
      wrapper: tw`border-green-500`,
      image: tw`bg-green-500`,
      text: tw`text-green-500 dark:text-green-400`,
    },
    info: {
      wrapper: tw`border-blue-500`,
      image: tw`bg-blue-500`,
      text: tw`text-blue-500 dark:text-blue-400`,
    },
    warning: {
      wrapper: tw`border-yellow-500`,
      image: tw`bg-yellow-500`,
      text: tw`text-yellow-500 dark:text-yellow-400`,
    },
    error: {
      wrapper: tw`border-red-500`,
      image: tw`bg-red-500`,
      text: tw`text-red-500 dark:text-red-400`,
    },
  };

  const [vis, setVis] = useState(visible);

  const mounted = useIsMounted();

  return (
    <>
      {mounted && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          animate={{
            opacity: vis ? 1 : 0,
          }}
          onAnimationComplete={() => {
            // console.log("ended");
            setTimeout(() => {
              setVis(false);
            }, 4000);

            if (onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          tw="w-full fixed bottom-0.5 left-0 z-50"
        >
          <div
            css={[
              styles[variant].wrapper,
              tw`bg-gray-200 dark:bg-gray-700 border flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md`,
            ]}
          >
            <div
              css={[
                styles[variant].image,
                tw`flex items-center justify-center w-12`,
              ]}
            >
              <svg
                tw="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                {variant === "success" && (
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                )}
                {variant === "info" && (
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                )}
                {variant === "warning" && (
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                )}
                {variant === "error" && (
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                )}
              </svg>
            </div>

            <div tw="px-4 py-2 -mx-3">
              <div tw="mx-3">
                <span css={[styles[variant].text, tw`font-semibold`]}>
                  {header}
                </span>
                <p tw="text-sm text-gray-600 dark:text-gray-200">{text}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Alert;
