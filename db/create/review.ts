// PRISMA HERE IS NOT IMPORTED LIKE THIS
// import prisma from "@/lib/prisma";
// BECAUSE THIS METHOD IS USED WHILE SEEDING
// DO NOT REFACTOR THIS
import prisma from "../../lib/prisma";
//
// import type { Review, Product } from "@prisma/client";

interface ReviewDataI {
  rating: number;
  comment: string;
}

const createReview = async (
  data: ReviewDataI,
  profileId: string,
  productId: string
) => {
  // CREATE A REVIEW
  await prisma.review.create({
    data: {
      ...data,
      product: {
        connect: {
          id: productId,
        },
      },
      profile: {
        connect: {
          id: profileId,
        },
      },
    },
  });

  // GET ALL REVIEWS FOR THE PRODUCT TO CALCULATE AVERAGE RATING
  const reviews = await prisma.review.findMany({
    where: {
      product: {
        id: {
          equals: productId,
        },
      },
    },
    select: {
      rating: true,
    },
  });

  const numOfReviews = reviews.length;

  let suma = 0;

  for (let i = 0; i < numOfReviews; i++) {
    suma += reviews[i].rating;
  }

  const averageRating = Math.round(suma / numOfReviews);

  // UPDATE PRODUCTS AVERAGE RATING

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      averageRating,
    },
  });
};

export default createReview;
