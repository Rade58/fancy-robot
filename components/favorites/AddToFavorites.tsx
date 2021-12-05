/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, Fragment, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

import isSSR from "@/util/isSSR";

import axios from "axios";

import type { Favorite } from "@prisma/client";

import { useSession } from "next-auth/react";

import FavInfo from "../notification/FavInfo";

interface PropsI {
  productName: string;
  productId: string;
  favorite: Favorite | null;
}

export const heartColor = "#e24f68";

const AddToFavorites: FC<PropsI> = ({ favorite, productId, productName }) => {
  const { data, status } = useSession();

  type favType = { favorite: "deleted" } | { favorite: Favorite };

  const [fav, setFav] = useState(favorite);

  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [firstStep, setFirstStep] = useState(true);

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");
  // console.log({ favorite });

  /*  useEffect(() => {
    if (firstStep) {
      setFirstStep(false);
      return;
    }
  }, [firstStep, setFirstStep]); */

  useEffect(() => {
    if (firstStep) {
      return;
    }

    if (fav) {
      setShowNotif(true);
      return;
    }

    setShowNotif(false);
  }, [firstStep, setShowNotif, fav]);

  // console.log({ productId }, `/api/product/favorite/${productId}`);

  // ----------------------------------------
  const addOrRemoveFavorite = async (method: "post" | "delete") => {
    //

    try {
      //
      setReqStatus("pending");

      const { data: d } = await axios[method](
        `/api/product/favorite/${productId}`
      );

      const data = d as favType;

      if (data) {
        if (data.favorite === "deleted") {
          setFav(null);
          setReqStatus("idle");
          return;
        }

        setFav(data.favorite);
        setReqStatus("idle");
        setFirstStep(false);
        return;
      }
    } catch (err) {
      if (!isSSR()) {
        window.alert(err);
        setReqStatus("idle");
      }
    }
  };

  // --------------------------------------

  if (!data) {
    return null;
  }

  return (
    <Fragment>
      <div
        css={css`
          /* background-color: ${theme`colors.electric`}; */
          /* position: absolute; */

          /* border: crimson solid 1px; */
          padding: 2px;
          /* padding-left: 12%; */
          /* display: flex; */
          /* justify-content: center; */
          /* align-items: center; */

          /* z-index: 1; */
          /* bottom: 8px; */
          /* right: 8px; */

          & button:hover {
            transform: scale(1.19);
          }

          & svg {
            stroke: ${heartColor};
          }

          & button {
            /* border: crimson solid 1px; */
            display: flex;
            align-items: center;
          }
        `}
      >
        <button
          disabled={reqStatus === "pending"}
          onClick={() => {
            if (fav) {
              addOrRemoveFavorite("delete");
              return;
            }

            addOrRemoveFavorite("post");

            // console.log("add to favs");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            tw="h-8 w-8"
            // fill="none"
            viewBox="0 0 24 24"
            // stroke="currentColor"
            css={[fav && fav.id ? tw`fill[#e24f68]` : tw`fill[none]`]}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      {showNotif && !firstStep && (
        <div tw="fixed bottom-0 right-0 left-0 z-30 flex justify-center">
          <FavInfo productName={productName} />
        </div>
      )}
    </Fragment>
  );
};

export default AddToFavorites;

/*

// empty

<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>



*/

/*

// full

<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
</svg>
 
 */
