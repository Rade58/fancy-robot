/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, useEffect, useCallback, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { BodyDataTypeI, ResData } from "@/pages/api/review/[productId]";

import axios from "axios";

const LeaveAReview: FC<{
  boughtBefore: boolean;
  productId: string;
  reviewExists: boolean;
}> = ({ boughtBefore, productId, reviewExists }) => {
  const [enableStarsHover, setEnableStarsHover] = useState<boolean>(true);
  const [reqStatus, setReqStatus] = useState<"pending" | "idle" | "complete">();
  const [markColorIndex, setMarkColorIndex] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>("");

  const handleLeaveAReview = useCallback(async () => {
    //
    // todo
    // HANDLE REQUEST FOR THE CREATING NEW REVIEW
    // DON FORGET THAT ON BACKEND YOU NEED TO
    // HANDLE CREATION
    //
    //
    //

    if (reviewText === "" || markColorIndex === null) {
      return;
    }

    const rating = markColorIndex + 1;

    const body: BodyDataTypeI = {
      rating,
      text: reviewText,
    };

    try {
      setReqStatus("pending");
      const {
        data: { review },
      } = await axios.post(`/api/review/${productId}`, body);

      // console.log({ review });
      setReqStatus("complete");
    } catch (err) {
      console.error(err);
      setReqStatus("idle");
    }
  }, [reviewText, markColorIndex, setReqStatus]);

  /* console.log({ markColorIndex });
  console.log({ reviewText });
  console.log({ productId }); */

  return (
    // <section css={[tw`width[86vw] mx-auto md:width[420px] mt-8 mb-4`]}>
    <Fragment>
      {!reviewExists && (
        <Fragment>
          {reqStatus !== "complete" && (
            <Fragment>
              {boughtBefore && (
                <section
                  css={[
                    reqStatus === "pending" ? tw`opacity-50` : tw``,
                    tw`mt-10 mx-2 md:w-full max-w-2xl px-6 py-4 md:mx-auto bg-__secondary_dark rounded-md shadow-md dark:bg-gray-800`,
                  ]}
                >
                  <h2 tw="text-3xl font-semibold text-center text-gray-800 dark:text-white">
                    Rate Our Product
                  </h2>
                  <div tw="flex justify-center items-center">
                    <div
                      css={[
                        css`
                          /* border: pink solid 2px; */
                          height: 0px;

                          & path {
                            /* fill: green; */
                            stroke: ${theme`colors.yellow.600`};
                            ${tw`dark:text-gray-200 text-gray-400`}
                            ${tw`fill-current`}
                          }

                          /* &:hover {
                    & path {
                      ${tw`text-yellow-500`}
                    }

                    & svg:hover ~ svg {
                      & path {
                        ${tw`dark:text-gray-200 text-gray-400`}
                      }
                    }
                  } */
                        `,

                        enableStarsHover
                          ? css`
                              &:hover {
                                & path {
                                  ${tw`text-yellow-500`}
                                }

                                & svg:hover ~ svg {
                                  & path {
                                    ${tw`dark:text-gray-200 text-gray-400`}
                                  }
                                }
                              }
                            `
                          : css``,
                        tw`flex items-center mt-6 mb-4`,
                      ]}
                    >
                      {new Array(5).fill(66).map((i, j) => {
                        return (
                          <svg
                            onClick={() => {
                              setMarkColorIndex(j);
                              setEnableStarsHover(false);
                            }}
                            onMouseLeave={() => {
                              setEnableStarsHover(true);
                            }}
                            key={`${j}-${i + 1}`}
                            css={[css``, tw`mx-1 w-6 h-6 /* fill-current */`]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path
                              style={{
                                fill:
                                  markColorIndex !== null && markColorIndex >= j
                                    ? theme`colors.yellow.500`
                                    : "currentColor",
                              }}
                              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                            />
                          </svg>
                        );
                      })}
                      {/* <svg
            tw="mx-1 w-6 h-6 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg> */}
                    </div>
                  </div>

                  <div tw="mt-6 ">
                    <div tw="w-full mt-4">
                      <label
                        htmlFor="comment"
                        tw="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      >
                        And Leave A Review
                      </label>

                      <textarea
                        value={reviewText}
                        onChange={(e) => {
                          //

                          setReviewText(e.target.value);
                        }}
                        id="comment"
                        name="comment"
                        tw="font-family[FiraMono] block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      ></textarea>
                    </div>

                    <div tw="flex justify-center mt-6">
                      <button
                        disabled={reqStatus === "pending"}
                        onClick={() => {
                          handleLeaveAReview();
                        }}
                        tw="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
    // {/* </section> */}
  );
};

export default LeaveAReview;
