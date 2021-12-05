// THIS IS A NO OP
//
//
//

/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const NotificationPopup: FC = () => {
  return (
    <section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
      <div tw="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div tw="w-2 bg-gray-800 dark:bg-gray-900"></div>

        <div tw="flex items-center px-2 py-3">
          <img
            tw="object-cover w-10 h-10 rounded-full"
            alt="User avatar"
            src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
          />

          <div tw="mx-3">
            <p tw="text-gray-600 dark:text-gray-200">
              Sara has replied on the{" "}
              <a tw="text-blue-500 dark:text-blue-300 hover:text-blue-400 hover:underline">
                uploaded image
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationPopup;
