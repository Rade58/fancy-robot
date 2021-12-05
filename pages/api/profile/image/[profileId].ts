// IMPORTANT IMPORTANT IMPORTANT IMPORTAND
// DON'T FORGEET TO DISABLE BODY PARSERS ON NEXT API
// BY WRITING THIS
/* export const config = {
  api: {
    bodyParser: false,
  },
}; */
// --------------------
// --------------------
// --------------------
import path from "path";
import nc from "next-connect";
import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

// import type { Product, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";

import DataUriParser from "datauri/parser";

import multer from "multer";

// import type { Profile } from "@prisma/client";
// import { getSession } from "next-auth/react";

// import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

import validateProfileId from "@/middlewares/validateProfileId";

import cloudinaryUpload from "@/lib/cloudinary";

const handler = nc<NextApiRequest, NextApiResponse>();

// --------- MULTER STUFF ----------------------------------------

const ALLOWED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

// IN MEMORY STORAGE FOR IMAGES
const storage = multer.memoryStorage();

//
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      // IF MIME TYPE IS OK
      cb(null, true);
    } else {
      cb(new Error("Wrong mime type for the file!"));
    }
  },
});

const singleUpload = upload.single("image");

//
const singleUploadMiddleware: Middleware<NextApiRequest, NextApiResponse> = (
  req,
  res,
  next
) => {
  // @ts-ignore
  singleUpload(req, res, (err) => {
    if (err) {
      return res
        .status(422)
        .send({ message: "Failed to process the image file!" });
    }

    next();
  });
};

// ------------------------------------------------------------------
// PARSING BUFFER STUFF (TRANSFERING FROM BUFFER TO BASE64 STRING)
const parser = new DataUriParser();

const fromBuffToBase64 = (file: FileI) => {
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};

//

export interface FileI {
  fieldname: "image";
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

const imageFileValidation = nc<NextApiRequest, NextApiResponse>().post(
  "/api/profile/image/:profileId",
  singleUploadMiddleware
);

// MIDDLEWARES
handler.use(validateProfileId);
handler.use(verifyUserMiddleware);

// THIS MIDDLEWARE IS ONLY GOING TO WORK FOR THIS ROUTE
handler.use(imageFileValidation).post(async (req, res) => {
  // SOME OF MY TRYOUTS----------------------
  // const profile = req.profile as ProfileInsert;
  // console.log({ profile });
  // BECAUSE OF MIDDLEWARE WE SHOUD HAVE req.file
  // IT IS INSERTED THERE

  // const file = req.file as FileI;
  // console.log({ file });
  //
  //
  //
  // NOW body is empty object
  // const body = req.body as FormData;
  //
  // console.log(body); // {}
  // ----------------------------------------

  const { profileId } = req.query;

  // console.log({ profileId, body });

  // console.log(Object.keys(body));

  if (typeof profileId === "object") {
    return res
      .status(500)
      .send(
        "profile id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  // LETS CHECK IF FILE IS ACTUALLY HERE
  // @ts-ignore
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "File is missing, something is wrong!" });
  }

  // @ts-ignore
  const file = req.file as FileI;

  //
  const b64 = fromBuffToBase64(file);

  if (!b64) {
    return res.status(500).send({ message: "Something is wrong with base64" });
  }
  if (!b64.content) {
    return res
      .status(500)
      .send({ message: "Something is wrong with base64 content" });
  }

  // console.log({ b64 });

  // WE CAN NOW TRY UPLOADING FILE TO CLOUDINARY

  const result = await cloudinaryUpload(b64.content);

  if (!result) {
    return res
      .status(500)
      .send({ message: "Something is wrong with upload to cloudinary!" });
  }

  // LET'S UPDATE image FIELD ON THE PROFILE
  const updatedProfile = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      image: result.secure_url,
    },
    select: {
      image: true,
    },
  });

  return res.status(200).json({ url: updatedProfile.image });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
