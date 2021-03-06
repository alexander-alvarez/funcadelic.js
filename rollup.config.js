const babel = require("rollup-plugin-babel");
const filesize = require("rollup-plugin-filesize");
const pkg = require("./package.json");

const globals = {
  "lodash.curry": "_.curry",
  "object.getownpropertydescriptors": "Object.getOwnPropertyDescriptors"
};

let external = Object.keys(globals);

module.exports = {
  input: "src/funcadelic.js",
  external,  
  output: [
    {
      name: "funcadelic",
      file: pkg.browser,
      globals,
      format: "umd"
    },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [
    babel({
      babelrc: false,
      comments: false,
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ]
    }),
    filesize({
      render(opt, size, gzip, bundle) {
        return `Built: ${bundle.file} ( size: ${size}, gzip: ${gzip})`;
      }
    })
  ]
};
