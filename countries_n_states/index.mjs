// TO RUN THIS FILE:  npx node /countries_n_states/index.mjs

import fs from "fs";
// import path from "path";

const content = fs.readFileSync("./states.json", { encoding: "utf8" });

const statesArr = JSON.parse(content);

let states = [];

for (const item of statesArr) {
  if (item.country_code === "US") {
    states.push(item);
  }
}

fs.writeFileSync("./countries_n_states/2_states.json", JSON.stringify(states), {
  encoding: "utf8",
});

// GETTING ONLY US STATES

// console.log(ob);
