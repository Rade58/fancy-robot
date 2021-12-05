/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { format } from "date-fns";

import type { PropsI as ProductPropsI } from "@/pages/product/[productId]";

// import Stringified from "../dev-helpers/Stringified";

import useIsMounted from "@/hooks/useIsMounted";

interface PropsI {
  reviews: ProductPropsI["product"]["reviews"];
}

const Reviews: FC<PropsI> = ({ reviews }) => {
  const [imageErrored, setImageErrored] = useState<boolean>(false);

  const fallbackImageName = ["face", "profile"];
  const unsplash_url_maker = () =>
    `https://source.unsplash.com/100x100/?${
      fallbackImageName[Math.round(Math.random() * 1)]
    }`;

  const mounted = useIsMounted();

  const placeImgs = [
    "https://www.fillmurray.com/360/360",
    "https://www.placecage.com/360/360",
    "https://www.stevensegallery.com/360/360",
  ];

  const placeImagsPlus = () => {
    const one = `https://randomuser.me/api/portraits/thumb/men/${Math.round(
      Math.random() * 76
    )}.jpg`;

    const two = `https://randomuser.me/api/portraits/thumb/women/${Math.round(
      Math.random() * 76
    )}.jpg`;

    return Math.round(Math.random() * 2) ? one : two;
  };

  const imageErrCandidate = () =>
    placeImgs[Math.round(Math.random() * (placeImgs.length - 1))];

  return (
    <section tw="mt-8 mb-8">
      <div tw=" dark:inherits[inherit] antialiased mx-auto max-w-screen-sm px-1 ">
        <h3 tw="dark:text-gray-200 mb-4 text-lg font-semibold text-gray-900">
          Reviews
        </h3>

        <div tw="space-y-4">
          {reviews.map((rev, i) => {
            const {
              createdAt,
              rating,
              comment,
              profile: { nick, user },
            } = rev;

            const displayName = user?.email || nick || "bobby";

            // console.log(displayName);

            const revDate = format(createdAt, "do MMMM yy");

            const five = new Array(5).fill(1);

            return (
              <div key={`${i}${rev.id}`} tw="flex">
                <div tw="flex-shrink-0 mr-3 relative">
                  {mounted && (
                    <img
                      onError={() => setImageErrored(true)}
                      tw="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      // src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      src={
                        !imageErrored
                          ? rev.profile.image || unsplash_url_maker()
                          : placeImagsPlus()
                      }
                      alt="profile"
                    />
                  )}
                  <svg
                    tw="fill-current text-white bg-green-600 rounded-full p-1 absolute left-7 top-8  md:left-7 md:top-9 w-4 h-4  md:w-5 md:h-5 -mx-1 -my-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                  </svg>
                </div>
                <div tw="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong tw="dark:text-gray-300 font-weight[500]">
                    {displayName}
                  </strong>{" "}
                  <span tw="ml-1 inline-block light:text-gray-500 text-xs text-gray-400">
                    {revDate}
                  </span>
                  <span tw="w-full sm:width[fit-content] inline-block ml-2 light:text-green-500 dark:text-green-600 text-xs">
                    Verified Buyer
                  </span>
                  <div tw="flex items-center mt-1 mb-0.5">
                    {five.map((one, i) => {
                      // console.log({ rating });

                      return (
                        <svg
                          key={`${i}-${one}`}
                          css={[
                            rating > i
                              ? tw`dark:text-yellow-400 light:text-yellow-600`
                              : tw`text-gray-400`,
                            tw`w-4 h-4 fill-current`,
                          ]}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      );
                    })}
                    {/* <svg
                      tw="w-4 h-4 fill-current text-yellow-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      tw="w-4 h-4 fill-current text-yellow-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      tw="w-4 h-4 fill-current text-yellow-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg
                      tw="w-4 h-4 fill-current text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg> */}
                  </div>
                  <p tw="dark:text-gray-50 text-sm">
                    {comment}
                    {/*  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. */}
                  </p>
                  {/* <div tw="mt-4 flex items-center">
                <div tw="text-sm text-gray-500 font-semibold">5 Replies</div>
              </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <Stringified data={reviews} /> */}
    </section>
  );
};

export default Reviews;
