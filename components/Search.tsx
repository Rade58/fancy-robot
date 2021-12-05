/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect, useState, useCallback, Fragment, createRef } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useActor } from "@xstate/react";
import { EE, searchToggService, fse } from "@/machines/search_togg_machine";

const Search: FC = () => {
  const inputRef = createRef<HTMLInputElement>();

  const [
    {
      context: { open },
      value: stateVal,
    },
    dispatch,
  ] = useActor(searchToggService);
  const { push: rPush, asPath } = useRouter();

  const containsOrder = asPath.includes("order/");

  const [slugs, setSlugs] = useState<{ value: string; label: string }[]>([]);

  // const [open, setOpen] = useState(false);

  /* const handleOpen = () => {
    dispatch({
      type: EE.TOGGLE,
    });
  };

  const handleClose = () => {
    dispatch({
      type: EE.TOGGLE,
    });
  }; */

  useEffect(() => {
    if (open && inputRef.current) {
      // FOCUS THE INPUT

      inputRef.current.focus();
    }
  }, [open, inputRef]);

  const [currText, setCurrText] = useState<string>("");
  // console.log(currText);
  //

  useEffect(() => {
    if (stateVal === fse.closed) setCurrText("");
  }, [stateVal, setCurrText]);

  useEffect(() => {
    if (window) {
      if (window.onkeydown) return;

      window.onkeydown = (e) => {
        if (e.ctrlKey && !open) {
          if (e.key === "k" || e.key === "K") {
            e.preventDefault();
            dispatch({
              type: EE.TOGGLE,
            });
          }
        }

        if (e.key === "Escape" && open) {
          e.preventDefault();
          dispatch({
            type: EE.TOGGLE,
          });
          setCurrText("");
        }
      };
    }

    return () => {
      window.onkeydown = null;
    };
  }, [dispatch, open, setCurrText]);

  const [searchReqStatus, setSearchReqStatus] = useState<
    "idle" | "pending" | "failed"
  >("idle");

  const sendSearchReq = useCallback(async () => {
    if (currText === "") return;

    try {
      setSearchReqStatus("pending");

      const { data } = await axios.get(`/api/product/search/${currText}`);

      // setCurrText("");

      setSlugs(data);

      setSearchReqStatus("idle");
    } catch (error) {
      console.error(error);

      setCurrText("");
      setSearchReqStatus("failed");

      setTimeout(() => {
        setSearchReqStatus("idle");
      }, 3000);
    }
  }, [setSearchReqStatus, setSlugs, setCurrText, currText]);

  // WE WILL SEND REQUEST WITH EFFECT
  useEffect(() => {
    //
    //
    sendSearchReq();
    //
    //
  }, [sendSearchReq]);

  // const [showModal, setShowModal] = useState(false);

  if (containsOrder) {
    return null;
  }

  return (
    <>
      {/* <button
        tw="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}

      {open ? (
        <>
          <div tw="bg-opacity-40 dark:bg-gray-800 bg-gray-400 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div tw="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div tw="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
                  <h3 tw="text-3xl font-semibold">Search for product</h3>
                  <div tw="absolute -right-10 -top-5 flex items-center justify-end p-6 rounded-b">
                    <button
                      tw="text-pink-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: EE.TOGGLE,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        tw="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    tw="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() =>
                      dispatch({
                        type: EE.TOGGLE,
                      })
                    }
                  >
                    <span tw="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <section tw="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
                  <div tw="relative">
                    <span tw="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        tw="w-5 h-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>

                    <input
                      value={currText}
                      onChange={(e) => {
                        if (e.target.value === "") return;
                        setCurrText(e.target.value);
                      }}
                      ref={inputRef}
                      type="text"
                      tw="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Search"
                    />
                  </div>

                  <div
                    css={[
                      currText === "" ? tw`visibility[hidden]` : tw``,
                      tw`absolute inset-x-0 px-6 py-3 mx-5 mt-4 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-72 dark:bg-gray-800 dark:border-transparent`,
                    ]}
                  >
                    {slugs.map(({ label, value }, i) => {
                      return (
                        <button
                          key={label + i}
                          onClick={() => {
                            rPush(`/product/${value}`);

                            setCurrText("");
                            dispatch({ type: EE.TOGGLE });
                          }}
                          tw="block py-1 cursor-pointer user-select[none]"
                        >
                          {/* <Link key={label + i} href={`/product/${value}`}> */}
                          {/* <a
                            tw="block py-1 cursor-pointer user-select[none]"
                            // eslint-disable-next-line
                            tabIndex={0}
                          > */}

                          <h3 tw="font-medium text-gray-700 dark:text-gray-100 hover:underline">
                            {label}
                          </h3>
                          {/* <p tw="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        02/04/2020
                      </p> */}
                          {/* </a> */}
                          {/* </Link> */}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div tw="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );

  // return null;
};

export default Search;
