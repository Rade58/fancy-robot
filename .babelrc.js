module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
      ,
    ],
  ],
  plugins: ["@emotion/babel-plugin", "babel-plugin-macros", "superjson-next"],
  env: {
    test: {
      presets: [
        [
          "next/babel",
          {
            "preset-env": {
              modules: "commonjs",
            },
          },
        ],
      ],
    },
  },
};
