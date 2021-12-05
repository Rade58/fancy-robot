/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FC, Fragment } from "react";
import { useEffect, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { BeatLoader as Loader } from "react-spinners";

import { useRouter } from "next/router";

import Button from "../buttons/Button";

const SeeMoreProducts: FC = () => {
  const { push } = useRouter();

  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <section tw="py-8 flex justify-center border-__hazard_outline_focus">
      <Button
        disabled={disabled}
        onClick={() => {
          // DISABLE BUTTON HERE
          //
          // -------------------
          setDisabled(true);

          push("/products/1");
        }}
        // size="small"
        variant="primary"
      >
        {!disabled ? (
          "See more products"
        ) : (
          <Fragment>
            <Loader size={6} color={"blanchedalmond"} />
            <Loader size={6} color={"blanchedalmond"} />
            <Loader size={6} color={"blanchedalmond"} />
          </Fragment>
        )}
      </Button>
    </section>
  );
};

export default SeeMoreProducts;
