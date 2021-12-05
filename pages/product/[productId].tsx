/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { useEffect } from "react";
//
// import axios from "axios";
import { getSession } from "next-auth/react";
//

import { Product, Review, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";

import Layout from "@/components/3_product_page/Layout";

export interface PropsI {
  product: Product & {
    reviews: (Review & {
      profile: {
        nick: string | null;
        image: string | null;
        user: {
          email: string | null;
        } | null;
      };
    })[];
  };
  favorite: Favorite | null;
  boughtBefore: boolean;
  alreadyLeftAReview: boolean;
}

type paramsType = {
  productId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  params?.productId; //

  const product = await prisma.product.findUnique({
    where: {
      id: params?.productId,
    },
    include: {
      reviews: {
        include: {
          profile: {
            select: {
              nick: true,
              image: true,
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // console.log({ product });

  if (product === null) {
    ctx.res.writeHead(302, { Location: "/" });

    return {
      props: {
        nothing: true,
      },
    };
  }

  // OK NOW WE NEED TO GET FAVORITE RECORD
  // THAT IS RELATED TO PRODUCT AND CURRENT SIGNED IN USER
  // SO WE NEED session AND product TO GET favorite RECORD
  // SO WE WILL PASS favorite PROP (IT WILL HAVE INFO ABOUT PRODUCT AND PROFILE (BECAUSE WE ARE GOING TO DEFINE SENDING DELETION REQUEST WHICH WE WILL SEND FROM FRONTEND))

  // LETS GET USER (PROFILE) FROM SESSION OFCOURSE
  const session = await getSession({ req: ctx.req });
  // LETS GET PROFILE

  const favorite = await prisma.favorite.findFirst({
    where: {
      product: {
        id: product.id,
      },
      profile: {
        id: session?.profile?.id,
      },
    },
  });

  //
  console.log(session?.profile?.id);
  console.log(product.id);

  //
  //
  //
  //
  // TODO
  // WE SHOULD CHECK HERE IF USER EVER BOUGHT THE PRODUCT
  const order = await prisma.order.findFirst({
    where: {
      buyer: {
        id: session?.profile?.id,
      },
      items: {
        some: {
          product: {
            id: product.id,
          },
        },
      },
    },
  });

  console.log({ ORDER: order });
  // NO NEED TO SEND ORDER, JUST EGNOLAGE THAT WE FOUND IT

  const boughtBefore = order !== null;

  // WE CAN CHECK IF USER ALREADY LEFT AN A REVIEW
  // WE RE NOT GOING TO ALLOW UPDATING OF A REVIEW
  // BECAUSE WE WANT TO SAVE SOME TIME

  const review = await prisma.review.findFirst({
    where: {
      product: {
        id: product.id,
      },
      profile: {
        id: session?.profile?.id,
      },
    },
  });

  const alreadyLeftAReview = review !== null;

  return {
    props: {
      product: product,
      favorite,
      boughtBefore,
      alreadyLeftAReview,
    },
  };
};

const ProductPage: NP<PropsI> = (props) => {
  /* useEffect(() => {
    if (!data) return;

    axios.get(`/api/product/favorite/${data.profile?.id || 1}`);
  }, [data]); */

  return (
    <Layout {...props}>
      {/* <pre>{JSON.stringify({ product: props.product }, null, 2)}</pre> */}
    </Layout>
  );
};

export default ProductPage;
