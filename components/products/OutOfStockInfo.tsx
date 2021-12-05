/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useRouter } from "next/router";

import { PulseLoader as Loader } from "react-spinners";

import Info from "../info/Info";
import Button from "../buttons/Button";

interface PropsI {
  countInStock: number;
}

const OutOfStock: FC<PropsI> = ({ countInStock }) => {
  const { back } = useRouter();

  const [load, setLoad] = useState<boolean>(false);

  return (
    <Fragment>
      {countInStock === 0 && (
        <section css={[tw`px-2`]}>
          <Info variant="blue" boldText="Out Of Stock">
            We will replenish this product very soon.{" "}
            <span tw="inline-block">In the mean time you can: </span>
            <span tw="inline-block ml-1 mt-4">
              <Button
                disabled={load}
                onClick={() => {
                  setLoad(true);
                  back();
                }}
                variant="primary"
                size="small"
              >
                check our other products
              </Button>
            </span>
            {load && (
              <span tw="inline-block ml-1">
                <Loader size={6} color="blue" />
              </span>
            )}
          </Info>
        </section>
      )}
    </Fragment>
  );
};

export default OutOfStock;
