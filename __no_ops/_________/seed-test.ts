import type { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

import {
  generateProductData,
  generateProfilesData,
  generateReviewsData,
} from "@/lib/prisma/seed-helpers";

// CREATE NEXT CONNECT APP
const handler = nc<NextApiRequest, NextApiResponse>();

// ROUTE
handler.get(async (req, res) => {
  const prof = generateProfilesData(20);

  const prod = generateProductData(60);

  const rev = generateReviewsData(prod.productIds, prof.profileIds);

  res.status(200).send({ prof, prod, rev });
});

export default handler;
