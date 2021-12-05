// # THIS FILE IS ALSO GOING TO BE RUN IF YOU DO MIGRATES
// I USE IT TO SEED MY DEVELOPMENT DATBASE
import { PrismaClient } from "@prisma/client";

// WE WILL USE THESE FUNCTIONS
import {
  generateProductData,
  generateProfilesData,
  generateReviewsData,
  // THIS KIND A SHORT HAND IMPORT WONT WORK
  // } from "@/lib/prisma/seed";
  // WE WILL USE THIS
} from "../lib/prisma/seed-helpers";

import createReview from "../db/create/review";

// import prns from "../_dev/mock_data/product_names.json";

const prisma = new PrismaClient();

async function main() {
  // WE CAN CREATE BUNCH OF USERS AND BUNCH OF PROFILES
  // WE CAN CREATE ONE SUPERADMIN PROFILE
  // CREATE COUPLE OF ADMIN USERS (WE DON'T NEED THIS NOW (WE ARE GOING TO DO THIS LATER))
  // WE CAN CREATE BUNCH OF PRODUCTS
  // AND WE CAN CREATE COUPLE OF REVIEWS FOR EACH PRODUCT
  //
  // CREATING ONE SUPERADMIN
  await prisma.profile.create({
    data: {
      nick: "pneuma",
      role: "SUPERADMIN",
    },
  });

  // LETS NOT CREATE User RECORDS, WE ONLY NEED Profile RECORDS
  // SINCE WE ONLY WANT BUNCH OF Profiles AND ALSO BUNCH OF
  // Products AND WE WANT Reviews
  // BECAUSE WE WANT TO SEE BUNCH OF PRODUCTS WHERE BUNCH OF PROFILES LEFT A REVIEW

  const profileData = generateProfilesData(60);
  const productData = generateProductData(800);
  const reviewsData = generateReviewsData(
    productData.productIds,
    profileData.profileIds
  );

  // console.log({ reviewsData });

  // SEEDING PROFILES
  await prisma.profile.createMany({
    data: profileData.profilesData,
  });

  // SEEDING PRODUCTS
  await prisma.product.createMany({
    data: productData.productsData,
  });

  // SEEDING REVIEWS
  /* await prisma.review.createMany({
    data: reviewsData,
  }); */

  for (const {
    comment,
    createdAt,
    id,
    productId,
    profileId,
    rating,
    updatedAt,
  } of reviewsData) {
    await createReview(
      {
        comment,
        rating,
      },
      profileId,
      productId
    );
  }

  //

  console.log("SEEDED SOME DATA");
  // console.log({ prns });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
