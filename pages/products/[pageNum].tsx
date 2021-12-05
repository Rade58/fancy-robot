/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

import { PRODUCTS_PER_PAGE } from "@/constants/index";

import calcPagi from "@/util/calcPagi";

import Layout from "@/components/2_products_pag_page/Layout";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
    countInStock: number;
  }[];
  totalProducts: number;
  pagination: {
    a__current_page_position: [number, number];
    b__array_of_buttons: (number | null)[][];
    surounding_buttons_logic: {
      first: number | null;
      previousSpanPage: number | null;
      previous: number | null;
      next: number | null;
      nextSpanPage: number | null;
      last: number | null;
    };
    currentPageNumber: number;
    skip: number;
    currentButtonSpan: (number | null)[];
    highlightedPageNum: number;
  };
}

type paramsType = {
  pageNum: string;
};

// todo: number of pages and calculation

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  // console.log({ PAGENUM: params?.pageNum });

  // PAGE NUMBER
  const pageNum = parseInt(params?.pageNum || "0");

  if (pageNum === 0) {
    ctx.res.writeHead(302, { Location: "/" });
    return { props: { nothing: true } };
  }

  const totalProducts = await prisma.product.count();

  // TODO try catch BLOCK AND REDIRRECT

  let pagination: {
    a__current_page_position: [number, number];
    b__array_of_buttons: (number | null)[][];
    surounding_buttons_logic: {
      first: number | null;
      previousSpanPage: number | null;
      previous: number | null;
      next: number | null;
      nextSpanPage: number | null;
      last: number | null;
    };
    currentPageNumber: number;
    skip: number;
    currentButtonSpan: (number | null)[];
    highlightedPageNum: number;
  };

  try {
    pagination = calcPagi(pageNum, 16, 4, totalProducts);
  } catch (err) {
    console.error(err);

    ctx.res.writeHead(302, { Location: "/" });

    return { props: { nothing: true } };
  }

  const products = await prisma.product.findMany({
    take: PRODUCTS_PER_PAGE,
    skip: pagination.skip,
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      countInStock: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return {
    props: {
      products,
      totalProducts,
      pagination,
    },
  };
};

const ProductsPage: NP<PropsI> = (props) => {
  return <Layout {...props} />;
};

export default ProductsPage;
