/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

/* enum VE {
  primary = "primary",
  secondary = "secondary",
  warning = "warning",
  hazard = "hazard",
  success = "success",
} */

type variantType = "primary" | "secondary" | "warning" | "hazard" | "success";
type sizeType = "small" | "medium";

interface PropsI {
  disabled?: boolean;
  size?: sizeType;
  variant: variantType;
  outlined?: boolean;
  onClick?: (args?: any) => void;
  onClickArgs?: any[];
  disableFocus?: boolean;
}

const Button: FC<PropsI> = ({
  disabled,
  size,
  variant,
  outlined,
  onClick,
  onClickArgs,
  children,
}) => {
  const colors = {
    primary: tw`bg-__primary border-__primary`,
    secondary: tw`bg-__secondary dark:bg-__secondary_dark border-__secondary dark:text-gray-900`,
    warning: tw`bg-__warning border-__warning`,
    hazard: tw`bg-__hazard border-__hazard`,
    success: tw`bg-__success border-__success`,
  };

  const _outlined = {
    primary: tw`border-__primary text-__primary hover:bg-__primary focus:border-__primary_outline_focus`,
    secondary: tw`border-__secondary text-__secondary hover:bg-__secondary focus:border-__secondary_outline_focus`,
    warning: tw`border-__warning text-__warning hover:bg-__warning focus:border-__warning_outline_focus`,
    hazard: tw`border-__hazard text-__hazard hover:bg-__hazard focus:border-__hazard_outline_focus`,
    success: tw`border-__success text-__success hover:bg-__success focus:border-__success_outline_focus`,
  };

  const click = () => {
    if (!onClick) return;
    if (onClickArgs) {
      onClick(onClickArgs);
    } else {
      onClick();
    }
  };

  let addetTextSize = size && size === "medium" ? tw`text-lg` : null;

  addetTextSize = size && size === "small" ? tw`text-sm` : null;

  const textSize = addetTextSize ? addetTextSize : tw`text-sm sm:text-lg`;

  const dis = disabled ? true : false;

  return (
    <Fragment>
      {!outlined ? (
        <button
          disabled={dis}
          onClick={() => {
            click();
          }}
          css={[
            textSize,
            colors[variant],
            tw`p-2 pl-5 pr-5 text-gray-100 rounded-lg focus:border-0 border-blue-300`,

            disabled ? tw`opacity-50 cursor-default` : tw``,
          ]}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={dis}
          onClick={() => {
            click();
          }}
          css={[
            textSize,
            _outlined[variant],
            tw`p-2 pl-5 pr-5 bg-transparent border-2 rounded-lg hover:text-gray-100 focus:border-2`,
          ]}
        >
          {children}
        </button>
      )}
    </Fragment>
  );
};

export default Button;

/* 

<div class="flex h-screen">
  <div class="m-auto">
  <div class="text-center mb-5">
      <p class="text-3xl text-cyan-700 font-bold">Button Pack</p>
      <p class="text-l text-cyan-600 font-semibold">Copy the line of code for the button you would like!</p>
    </div>
    <p class="text-lg text-cyan-500 font-bold">Filled Buttons</p>
    <button class="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300">Primary</button>
    <button class="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg rounded-lg focus:border-4 border-gray-300">Secondary</button>
    <button class="p-2 pl-5 pr-5 bg-yellow-500 text-gray-100 text-lg rounded-lg focus:border-4 border-yellow-300">Warning</button>
    <button class="p-2 pl-5 pr-5 bg-red-500 text-gray-100 text-lg rounded-lg focus:border-4 border-red-300">Hazard</button>
    <button class="p-2 pl-5 pr-5 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300">Success</button>
    <p class="text-lg text-cyan-500 font-bold mt-4">Outline Buttons</p>
    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300">Primary</button>
    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300">Secondary</button>
    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-yellow-500 text-yellow-500 text-lg rounded-lg hover:bg-yellow-500 hover:text-gray-100 focus:border-4 focus:border-yellow-300">Warning</button>
    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-red-500 text-red-500 text-lg rounded-lg hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-red-300">Hazard</button>
    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 text-lg rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300">Success</button>
  </div>
</div>

*/
