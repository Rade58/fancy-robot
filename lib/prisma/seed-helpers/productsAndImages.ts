import prodsImz from "../../../_dev/output/prods_and_imgs.json";

function parseProductNamesandImages() {
  const products = [];

  // @ts-ignore
  for (let i = 0; i < prodsImz.length; i++) {
    // @ts-ignore
    if (!prodsImz[i]) {
      continue;
    }
    // @ts-ignore
    if (!prodsImz[i].images) {
      continue;
    }
    // @ts-ignore
    if (!prodsImz[i].images[0]) {
      continue;
    }
    // @ts-ignore
    if (!prodsImz[i].images[0].urls) {
      continue;
    }

    // @ts-ignore
    const images = prodsImz[i].images;
    const imLength = images.length as number;
    const randomIndex = Math.round(Math.random() * (imLength - 6));

    const randomImage = (images[randomIndex] || images[0]).urls.regular;

    products.push({
      // @ts-ignore
      name: prodsImz[i].name as string,
      imageUrl: randomImage as string,
    });
  }

  return products;
}

export default function generateProdNamesAndImages() {
  // WE NEED 20 LOOPS

  let prods: { name: string; imageUrl: string }[] = [];

  for (let i = 0; i < 20; i++) {
    prods = prods.concat(parseProductNamesandImages());
  }

  return prods;
}
