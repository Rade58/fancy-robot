// RUNNING THIS FILE WITH
//                             node _dev/gen_na_im.mjs
//
import fs from "fs";
// ENV VARIABLES LOADED FROM .env WITH THIS PACKAGE
import "dotenv/config.js";
import { createApi } from "unsplash-js";
import pexels from "pexels";

// import faker from "faker";

// import { product_names } from "./mock_data/product_names.mjs";

// 5 * 160 (160 names) (160 requests) (5 products per request)

import nodeFetch from "node-fetch";
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
  fetch: nodeFetch,
});

const pex = pexels.createClient(process.env.PEXELS_KEY);

const getProdNames = () => {
  const prz = fs.readFileSync("_dev/mock_data/pn.json", { encoding: "utf-8" });

  return JSON.parse(prz);
};

// console.log(getProdNames());
// console.log(process.env.UNSPLASH_KEY);

const genImgz = async (provider) => {
  const prodz = getProdNames();

  for (let i = 0; i < prodz.length; i++) {
    // console.log(product);

    let images;

    if (provider === "pexels") {
      images = await pex.photos.search({
        // query: prodz[i].name.slice(0, prodz[i].name.indexOf(" ")) + " product",
        query: "product " + prodz[i].value,
        page: 1,
        per_page: 5,
      });
    }

    if (provider === "unsplash") {
      const result = await unsplash.search.getPhotos({
        query: prodz[i].value,
        page: 1,
        perPage: 20,
        orientation: "landscape",
      });

      images = result.response.results;
    }

    console.log({ images });

    prodz[i].images = images;
  }

  // console.log({ product_names });

  fs.writeFileSync("_dev/output/prods_and_imgs.json", JSON.stringify(prodz), {
    encoding: "utf8",
  });
};

// console.log("blah");

genImgz("unsplash");

/* const client = pexels.createClient(
  "563492ad6f917000010000019f6cd3c0598941b1a1cc2ce5fdf9b09a"
);


/*
client.photos
  .search({
    query: "Coffee Guatemala Dark" + " product",
    page: 2,
    per_page: 12,
  })
  .then((res) => {
    console.log(res.photos[0].src);
  });
 */

// console.log({ product_names });

/* fs.writeFileSync("_dev/output/prods_and_imgs.json", JSON.stringify(product_names), {
  encoding: "utf8",
}); */
