/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";

// import type { ProductsPropsI } from "../products/Products";
import type { PropsI as IndexPagePropsI } from "@/pages/index";

export interface PropsI {
  pagination: IndexPagePropsI["paginationData"];
}

const basePath = "/products/";

const buildUrl = (pageNum: number | null, currentNum: number) => {
  if (pageNum === null) {
    return `${basePath}${currentNum}`;
  }

  if (pageNum === 0) {
    return "/";
  }

  return `${basePath}${pageNum}`;
};

const ChangerOfProductsPages: FC<PropsI> = ({ pagination }) => {
  // const paginationData = pagCalc(currentPageNumber, totalItems);

  const {
    // a__current_page_position: currPagePos,
    // b__array_of_buttons: arrOfPageSpans,
    // currentPageNumber,
    surounding_buttons_logic: buttonsAround,
    currentButtonSpan,
    highlightedPageNum,
  } = pagination;

  const { first, previousSpanPage, nextSpanPage, last, next, previous } =
    buttonsAround;

  return (
    <div tw="flex justify-center">
      <div
        // tw="flex rounded-md mt-8"
        css={[
          tw`dark:bg-white rounded-md`,
          css`
            display: flex;
            border-radius: ${tw`rounded-md`};
            margin-top: 2rem;

            & a {
              ${tw`light:border-indigo-300`}
            }

            & a.disabled-anch {
              pointer-events: none;
            }

            & .contenders {
              user-select: none;
            }

            & .around {
              @media screen and (max-width: 500px) {
                display: none;
              }
            }

            & .current {
              /* border: #131f30 solid 3px; */
              /* color: #131f30; */

              border-style: solid;
              border-width: 3px;

              ${tw`dark:border-green-600 light:border-pink-500`};
              ${tw`dark:text-green-600 light:text-pink-500`};

              font-size: 1.2rem;
              font-weight: 500;
              pointer-events: none;
            }

            & .previous-anch {
              @media screen and (max-width: 500px) {
                display: none;
              }

              & .previous {
                &::after {
                  display: inline;
                  content: "Previous";
                  /* content: "◀️"; */
                }

                @media screen and (max-width: 500px) {
                  &::after {
                    display: inline;
                    /* content: "Previous"; */
                    content: "◀️";
                  }
                }
              }
            }

            & .previous-one-anch {
              display: none;
              @media screen and (max-width: 500px) {
                display: flex;
                align-items: center;
              }

              & .previous-one {
                /*  */
                &::after {
                  display: inline;
                  /* content: "Next"; */
                  content: "⬅️";
                }
              }
            }

            & .next-anch {
              @media screen and (max-width: 500px) {
                display: none;
              }

              & .next {
                &::after {
                  display: inline;
                  content: "Next";
                  /* content: "▶️"; */
                }

                @media screen and (max-width: 500px) {
                  &::after {
                    display: inline;
                    /* content: "Next"; */
                    content: "▶️";
                  }
                }
              }
            }

            & .next-one-anch {
              display: none;

              @media screen and (max-width: 500px) {
                display: flex;
                align-items: center;
              }

              & .next-one {
                &::after {
                  display: inline;
                  /* content: "Next"; */
                  content: "➡️";
                }
                /*  */
              }
            }

            & .first {
              /* @media screen and (max-width: 500px) { */
              &::after {
                display: inline;
                font-size: 0.8rem;
                font-weight: 400;
                font-family: "Helvetica Neue", sans-serif;
                content: "<<";
              }
              /* } */
            }

            & .last {
              /* @media screen and (max-width: 500px) { */
              &::after {
                display: inline;
                font-size: 0.8rem;
                font-weight: 400;
                font-family: "Helvetica Neue", sans-serif;
                content: ">>";
              }
              /* } */
            }
          `,
        ]}
      >
        <Link href={buildUrl(first !== null ? 1 : first, highlightedPageNum)}>
          <a
            css={[
              first !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="first"
              css={[
                tw`flex align-middle my-auto`,
                first !== null
                  ? css``
                  : tw`opacity-30 text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* First */}
            </span>
          </a>
        </Link>
        <Link href={buildUrl(previousSpanPage, highlightedPageNum)}>
          <a
            className="previous-anch"
            css={[
              previousSpanPage !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0  hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="previous"
              css={[
                tw`flex align-middle my-auto`,
                previousSpanPage !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500 opacity-30`,
              ]}
            >
              {/* Previous */}
            </span>
          </a>
        </Link>
        <Link href={buildUrl(previous, highlightedPageNum)}>
          <a
            className="previous-one-anch"
            css={[
              previous !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0  hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="previous-one"
              css={[
                tw`flex align-middle my-auto`,
                previous !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500 opacity-30`,
              ]}
            >
              {/* Previous-ONE */}
            </span>
          </a>
        </Link>
        {currentButtonSpan.map((item, i) => {
          return (
            <Link
              href={item !== 0 ? `${basePath}${item}` : "/"}
              key={`${i}-${item}`}
            >
              <a
                className={`contenders ${
                  item === highlightedPageNum ? "current" : "around"
                } ${item === null ? "disabled-anch" : ""}`.trim()}
                tw="w-12 flex justify-center align-items[center] leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>{item === 0 ? "🏠" : item}</span>
              </a>
            </Link>
          );
        })}
        <Link href={`${basePath}${next}`}>
          <a
            className="next-one-anch"
            css={[
              next !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="next-one"
              css={[
                tw`flex align-middle my-auto`,
                next !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500 opacity-30`,
              ]}
            >
              {/* Next-ONE */}
            </span>
          </a>
        </Link>
        <Link href={`${basePath}${nextSpanPage}`}>
          <a
            className="next-anch"
            css={[
              nextSpanPage !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border border-r-0 text-blue-700 hover:bg-blue-500 hover:text-white`,
            ]}
          >
            <span
              className="next"
              css={[
                tw`flex align-middle my-auto`,
                nextSpanPage !== null
                  ? css``
                  : tw`text-gray-400 light:text-gray-500 opacity-30`,
              ]}
            >
              {/* Next */}
            </span>
          </a>
        </Link>
        <Link href={`${basePath}${last}`}>
          <a
            css={[
              last !== null ? css`` : tw`pointer-events-none`,
              tw`flex align-middle py-2 px-4 leading-tight bg-white border light:border-blue-700  text-blue-700  hover:bg-blue-500 rounded-r hover:text-white`,
            ]}
          >
            <span
              className="last"
              css={[
                tw`flex align-middle my-auto`,
                last !== null
                  ? css``
                  : tw`opacity-30 text-gray-400 light:text-gray-500`,
              ]}
            >
              {/* Last */}
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ChangerOfProductsPages;
