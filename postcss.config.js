module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-extend"),
    env === "production" ? require("cssnano") : null,
  ],
});
