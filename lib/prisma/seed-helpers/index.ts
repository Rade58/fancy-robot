import type { Profile, Product, Review } from "@prisma/client";
// WE ONLY USE THIS TO CREATE THINGS QUICKLY (TELLING YOU BECAUSE
// NORMALLY FOR MOST RECORDS IDS ARE AUTO-GENERATED)
import cuid from "cuid";
//
import faker from "faker";

import { uniqueNamesGenerator, Config, starWars } from "unique-names-generator";

import gen800ProdsAndImgz from "./productsAndImages";

const config: Config = {
  dictionaries: [starWars],
};

export const unsplashTemplate = (name: string) => {
  const arr = name.split(" ");
  const prodName = arr[arr.length - 1];

  return `https://source.unsplash.com/800x600/?${prodName.toLowerCase()}`;
};

const placeImagesGen = () => {
  const one = `https://randomuser.me/api/portraits/thumb/men/${Math.round(
    Math.random() * 76
  )}.jpg`;

  const two = `https://randomuser.me/api/portraits/thumb/women/${Math.round(
    Math.random() * 76
  )}.jpg`;

  return Math.round(Math.random() * 2) ? one : two;
};

export const generateProfilesData = (numberOfProfiles: number) => {
  const profilesData: Profile[] = [];
  const profileIds: string[] = [];

  for (let i = 0; i < numberOfProfiles; i++) {
    const id = cuid();

    profileIds.push(id);

    /* const nick1 = faker.name.firstName();
    const nick2 = faker.name.lastName();
    const nick3 = faker.random.word();

    const nickArr = [nick1, nick2, nick3];

    const randomToTwo = Math.round(Math.random() * 10 * 0.2);
    */
    const characterName: string = uniqueNamesGenerator(config);

    profilesData.push({
      id,
      city: faker.address.city(),
      country: "US",
      nick: characterName,
      email: faker.internet.email(),
      regionOrState: faker.address.state(),
      image: placeImagesGen(),
      postalCode: faker.address.zipCode(),
      streetAddress: `${faker.address.streetName()}, number: ${Math.round(
        Math.random() * 100
      )}`,
      role: "USER",
      userId: null,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  }

  return { profilesData, profileIds };
};

export const generateProductData = (numberOfProducts: number) => {
  const productsData: Product[] = [];
  const productIds: string[] = [];

  const productsAmount800 = gen800ProdsAndImgz();

  for (let i = 0; i < productsAmount800.length; i++) {
    // WE WILL DO THAT EVERY OTHER PRODUCT IS OUT OF STOCK

    const countInStock = !(i % 2)
      ? 0
      : parseInt(`${Math.random() * 10}`) * parseInt(`${Math.random() * 10}`) +
        6;

    // const productName = faker.commerce.productName();

    const id = cuid();

    productIds.push(id);

    productsData.push({
      id,
      name: /* productName */ productsAmount800[i].name,
      image:
        /* unsplashTemplate(productName + "-" + "product") */ productsAmount800[
          i
        ].imageUrl,
      // image: faker.image.fashion(),
      averageRating: Math.round(Math.random() * 5.1) || 1,
      countInStock,
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      brand: faker.company.companyName(),
      price: `${parseFloat(faker.commerce.price(56, 266, 2)) + 0.99}`,
      adminId: null,
      createdAt: faker.date.past(2019),
      updatedAt: faker.date.past(2020),
    });
  }

  return { productsData, productIds };
};

// FOR Reviews WE WOULD NEED EXISTING PRODUCTS
// AND EXISTING PROFILES

export const generateReviewsData = (
  prdoductIds: string[],
  profileIds: string[]
) => {
  const reviewsData: Review[] = [];

  // LETS SAY EVERY PRODUCT SHOUD HAVE 4 REVIEEWS

  for (let i = 0; i < prdoductIds.length; i++) {
    let profileNo = 0;
    let back = false;

    // const profileId = profileIds[profileNo];

    for (let j = 0; j < 5; j++) {
      //
      //

      const fallbackProfileId = profileIds[6];
      const randomProfId =
        profileIds[
          Math.round(Math.random() * 10 * (profileIds.length - 2) * 0.1)
        ];

      const profId = randomProfId || fallbackProfileId;

      reviewsData.push({
        id: cuid(),
        productId: prdoductIds[i],
        profileId: profId,
        comment: faker.lorem.sentences(),
        rating: Math.round(Math.random() * 5.1) || 1,
        createdAt: faker.date.past(),
        updatedAt: faker.date.future(),
      });

      if (back) {
        profileNo--;
      } else {
        profileNo++;
      }

      if (profileNo === profileIds.length) {
        back = true;
      }
      if (profileNo < 0) {
        back = false;
      }
    }
  }

  return reviewsData;
};
