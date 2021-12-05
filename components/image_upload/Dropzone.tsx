/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";
import axios from "axios";
import { useTheme } from "next-themes";
import { PacmanLoader as Loader } from "react-spinners";
import { useActor } from "@xstate/react";
import { dropboxToggService, EE } from "@/machines/dropbox_togg_machine";

interface PropsI {
  profileId: string;
}

const Dropzone: FC<PropsI> = ({ profileId }) => {
  // console.log({ profileId });

  const [
    {
      context: { visible },
    },
    dispatch,
  ] = useActor(dropboxToggService);

  const [file, setFile] = useState<File | null>(null);

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const { theme } = useTheme();

  const isDark = theme === "dark";

  const handleReq = async (fi: File) => {
    // console.log({ file: fi });

    const allowedFormats = ["jpg", "jpeg", "png"];

    let allowed = false;

    for (let i = 0; i < allowedFormats.length; i++) {
      if (fi.type.includes(allowedFormats[i])) {
        allowed = true;
      }
    }

    if (!allowed) {
      throw new Error("format not allowed");
    }

    const formData: FormData = new FormData();

    formData.append("image", fi);

    try {
      setReqStatus("pending");

      const { data: d } = await axios.post(
        `/api/profile/image/${profileId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = d as { url: string };

      /* dispatch({
        type: EE.SET_UPLOAD_IMAGE_URL,
        payload: {
          url: ""
        }
      }) */

      // console.log({ url: data.url });

      dispatch({
        type: EE.SET_UPLOAD_IMAGE_URL,
        payload: {
          url: data.url,
        },
      });

      setFile(null);

      setReqStatus("idle");

      dispatch({
        type: EE.TOGGLE,
      });

      //
    } catch (err) {
      console.error(err);
      //

      setFile(null);

      setReqStatus("idle");
    }
  };

  // console.log({ isDark });

  // console.log({ file });

  return (
    // <section css={[tw``]}>
    <Fragment>
      {visible && (
        <div tw="fixed z-10 left-0 top-0 w-full h-full flex bg-black bg-opacity-60">
          <div tw=" p-4 w-max dark:bg-gray-800 bg-gray-300  m-auto rounded-lg">
            {!file ? (
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  // console.log({ e });

                  // console.log(e.target);

                  // @ts-ignore
                  const file = e.dataTransfer.files[0] as File;

                  // console.log({ one: file });

                  if (!file) {
                    return;
                  }

                  setFile(file);

                  handleReq(file);

                  //

                  // console.log(file);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  // console.log({ e });
                }}
                tw="p-5 relative width[279px] md:width[496px] border-4 border-dotted dark:border-gray-300 border-gray-800 rounded-lg"
                // style={{ minWidth: "278px", maxWidth: "60vw" }}
              >
                <svg
                  tw="text-indigo-500 w-24 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div tw=" flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      accept=".jpg, .png, .jpeg"
                      disabled={reqStatus === "pending"}
                      /* onSelect={(e) => {
                      console.log({ e });
                    }} */
                      onChange={(e) => {
                        // console.log({ e });

                        // console.log(e.target.files[0]);
                        // @ts-ignore
                        const file = e.target.files[0] as File;

                        // console.log({ two: file });

                        if (!file) {
                          return;
                        }
                        setFile(file);

                        handleReq(file);
                      }}
                      tw="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      // multiple
                    />
                    <div tw=" bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                      Select
                    </div>
                  </label>

                  <div tw=" text-indigo-500 uppercase">
                    or drop file in here
                  </div>
                </div>
                <button
                  disabled={reqStatus === "pending"}
                  onClick={() => dispatch({ type: EE.TOGGLE })}
                  css={[
                    tw`absolute -top-10 -right-10 bg-white p-4 cursor-pointer hover:bg-gray-100 py-2 text-gray-600 rounded-full`,
                  ]}
                >
                  X
                </button>
              </div>
            ) : (
              <div
                css={[
                  css`
                    & > * {
                      /* margin-top: -12px; */
                      position: relative !important;
                      top: -12px !important;
                      left: -19px !important;

                      /* & * {
                      } */
                    }

                    /* & span > span {
                      color: crimson !important;
                      fill: yellow !important;
                      stroke: blue !important;
                    } */
                  `,

                  tw`flex h-52 justify-center align-items[center]  p-5 relative width[279px] md:width[496px] border-4 rounded-lg`,
                ]}
              >
                <Loader color={isDark ? "#89b1c9" : "#3d3bb6"} size={18} />
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
    // </section>
  );
};

export default Dropzone;
