/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment, useState } from "react";
import tw /* , { css, styled, theme } */ from "twin.macro";

import { useRouter } from "next/router";
import Product from "./Product";
import ChangerOfProductsPages from "../navigation/ChangerOfProductPages";
import type { PropsI } from "@/pages/index";
// import type { PropsI as ProductsPagePropsI } from "@/pages/products/[pageNum]";

// import { FALLBACK_PHOTO } from "@/constants/index";

export interface ProductsPropsI {
  products: PropsI["products"];
  totalProducts: PropsI["totalProducts"];
  pagAbove?: boolean;
  pagBelow?: boolean;
  pagination: PropsI["paginationData"];
}

const Products: FC<ProductsPropsI> = ({
  products,
  totalProducts,
  pagAbove,
  pagination,
  pagBelow,
}) => {
  const { asPath } = useRouter();

  // const [imageErrored, setImageErrored] = useState<boolean>(false);
  // console.log(asPath);

  const splitted = asPath.split("/");
  const currentPageNumber = parseInt(splitted[splitted.length - 1]) || 0;
  // console.log({ currentPageNumber });

  return (
    <Fragment>
      {pagAbove && (
        <div
        // tw="mb-10"
        >
          <ChangerOfProductsPages pagination={pagination} />
        </div>
      )}
      <section>
        <div tw="container mx-auto px-6">
          {currentPageNumber === 0 && (
            <Fragment>
              <h3
                tabIndex={-1}
                tw="light:text-gray-700 dark:text-gray-200 text-2xl font-medium"
              >
                We have everything
              </h3>
              <span tw="mt-3 text-sm light:text-gray-500 dark:text-gray-600">
                {totalProducts - 6}+ Products
              </span>
            </Fragment>
          )}

          <div tw="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {products.map((product, i) => {
              return <Product key={`${i}-${product.id}`} product={product} />;
            })}
          </div>
        </div>
      </section>
      {pagBelow && (
        <div tw="mb-10">
          <ChangerOfProductsPages pagination={pagination} />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
