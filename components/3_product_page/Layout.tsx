/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/product/[productId]";

import ProductView from "../products/ProductView";
import Reviews from "../reviews/Reviews";
import Alert from "../alerts/Alert";
import LeaveAReview from "../reviews/LeaveAReview";

const Layout: FC<PropsI> = ({
  children,
  product,
  favorite,
  boughtBefore,
  alreadyLeftAReview,
}) => {
  return (
    <main>
      <ProductView product={product} favorite={favorite} />
      <LeaveAReview
        boughtBefore={boughtBefore}
        productId={product.id}
        reviewExists={alreadyLeftAReview}
      />
      <Reviews reviews={product.reviews} />
      {children}
      {/* <Alert
        visible={true}
        header="Hello world"
        text="You are informed"
        variant="info"
      /> */}
    </main>
  );
};

export default Layout;
