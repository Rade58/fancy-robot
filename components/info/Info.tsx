/* eslint jsx-a11y/anchor-is-valid: 1 */
import { Fragment } from "react";
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

interface PropsI {
  variant: "blue" | "red" | "green" | "yellow";
  boldText: string;
}

const Info: FC<PropsI> = ({ boldText, variant, children }) => {
  return (
    <Fragment>
      {variant === "blue" && (
        <div
          tw="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
          role="alert"
        >
          <div tw="w-5 h-5 mr-2 -mt-0.5">
            <svg
              tw="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {
            <div>
              <span tw="font-medium">{boldText}!</span> {children}
            </div>
          }
        </div>
      )}
      {variant === "red" && (
        <div
          tw="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
          role="alert"
        >
          <div tw="w-5 h-5 mr-2 -mt-0.5">
            <svg
              tw="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {
            <div>
              <span tw="font-medium">Da{boldText}!</span> {children}
            </div>
          }
        </div>
      )}
      {variant === "green" && (
        <div
          tw="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
          role="alert"
        >
          <div tw="w-5 h-5 mr-2 -mt-0.5">
            <svg
              tw="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {
            <div>
              <span tw="font-medium">Suc{boldText}!</span> {children}
            </div>
          }
        </div>
      )}
      {variant === "yellow" && (
        <div
          tw="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700"
          role="alert"
        >
          <div tw="w-5 h-5 mr-2 -mt-0.5">
            <svg
              tw="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {
            <div>
              <span tw="font-medium">War{boldText}!</span> {children}
            </div>
          }
        </div>
      )}
    </Fragment>
  );
};

export default Info;
