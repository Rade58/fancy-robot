/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/index";
import Products from "../products/Products";

import SeeMoreProducts from "../navigation/SeeMoreProducts";
import AddedToCart from "../notification/AddedToCart";

//
//
import Carousel from "../Carousel";

const Layout: FC<PropsI> = ({
  products,
  topRatedProducts,
  totalProducts,
  paginationData,
}) => {
  return (
    <main>
      <Carousel items={topRatedProducts} />
      <div tw="height[0rem]"></div>
      <Products
        products={products}
        totalProducts={totalProducts}
        pagination={paginationData}
      />

      <SeeMoreProducts />
      <AddedToCart />
    </main>
  );
};

export default Layout;
