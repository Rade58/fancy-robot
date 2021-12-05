/** @type {import('next').NextConfig} */
const path = require("path");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  /* PHASE_EXPORT,
  PHASE_PRODUCTION_SERVER, */
} = require("next/constants");

const withPlugins = require("next-compose-plugins");
const withReactSvg = require("next-react-svg");

// REACT SVG, PLUGIN FOR INLINING .svg FILES
const svgReactPlugin = withReactSvg({
  include: path.resolve(__dirname, "svgs/inline"),
  webpack(config, options) {
    return config;
  },
});
//

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) console.log("Development");
  if (phase === PHASE_PRODUCTION_BUILD) console.log("Production");

  const newConfig = { ...defaultConfig };

  newConfig.webpack = (config, options) => {
    // DON'T NEED THIS
    /* config.module.rules.push({
      test: /\.js$/,
      exclude: /(node_modules)/,
      enforce: "post",
      use: {
        loader: "ify-loader",
      },
    }); */

    return config;
  };

  // DON'T NEED THIS (EBBLED BY DEFAULT)
  // WEBPACK 5 ENABLING
  /* newConfig.future = {
    webpack5: true,
  }; */

  // *********************
  // DON'T NEED THIS
  /* newConfig.webpackDevMiddleware = (config) => {
    config.watchOptions.poll = 1000;
    config.watchOptions.aggregateTimeout = 300;
    return config;
  }; */
  // ***********************

  newConfig.swcMinify = true;

  const configuration = withPlugins([/* envPlugin,  */ svgReactPlugin])(phase, {
    defaultConfig: newConfig,
  });

  // console.log({ configuration });

  return configuration;
};
