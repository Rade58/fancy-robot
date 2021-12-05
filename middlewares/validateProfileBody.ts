import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import profileSchema from "@/lib/validations/profileSchema";

// import { getSession } from "next-auth/react";

// import prisma from "@/lib/prisma";

// THIS IS MAYBE TOO MUCH (THIS SHOULD BE ONLY FUNCTION IF WE WANT TO PAST
// SOMETHING, LIKE SCHEMA, BUT SINCE I HAVE ONLY ONE SCHEMA, WE SHOULD ONLY CREATE MIDDLEWARE AND EXPORT IT
// BUT NEVER MIND, LET THIS BE ANA A REMINDER ON OTHER WAYS YOU CAN USE THIS)
const validateProfileBody: () => Middleware<NextApiRequest, NextApiResponse> =
  () => async (req, res, next) => {
    //
    //
    //
    // IF WE ARE NOT HAVING ANY FIELD IN OUR BODY LETS THROW

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("You must provide at least one field");
    }

    // const keys = Object.keys(req.body)

    for (const key in req.body) {
      // @ts-ignore
      if (!profileSchema.fields[key]) {
        return res
          .status(400)
          .send(
            `${key} is redundant field (shouldn't be on the body when updating profile record)`
          );
      }
    }

    try {
      await profileSchema.validate(req.body);

      return next();
    } catch (err) {
      // @ts-ignore
      console.log(err.errors);

      return res.status(200).send({
        error: true,
        // @ts-ignore
        message: err.errors[0],
      });
    }
  };

export default validateProfileBody;

/* 

const verifyUser:  = async (
  req,
  res,
  next
) => {
  const { productId } = req.query;
  //
  //
  //
  //
  next();
};

export default verifyUser;
 */
