const { WebpackPluginServe } = require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"));
const PATH_SOURCE = path.join(__dirname,'src');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

exports.devServer = ()=>({
    watch: true,
    plugins:[
        new WebpackPluginServe({
            port: process.env.PORT || 3000,
            static: './dist',
            liveReload: true,
            waitForBuild: true
        })
    ]
});

exports.page = ({title})=>({
    plugins:[
        new MiniHtmlWebpackPlugin({
            context:{
                title
            }
        })
    ]
})

exports.loadCss = ()=>({
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    }
})

exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
      postcssOptions: { plugins: [require("tailwindcss")()] },
    },
  });

  exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: MiniCssExtractPlugin.loader, options },
              "css-loader",
            ].concat(loaders),
            sideEffects: true,
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
        }),
      ],
    };
  };

  exports.eliminateUnusedCSS = () => ({
    plugins: [
      new PurgeCSSPlugin({
        paths: ALL_FILES, // Consider extracting as a parameter
        extractors: [
          {
            extractor: (content) =>
              content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
            extensions: ["html"],
          },
        ],
      }),
    ],
  });

  exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
      postcssOptions: { plugins: [require("autoprefixer")()] },
    },
  });
  

  exports.loadImages = ({limit}={})=>({
    module:{
      rules:[
        {
          test:/\.(png|jpg)$/,
          type: "asset",
          parser:{
            dataUrlCondition:{
              maxSize: limit
            }
          }
        }
      ]
    }
  });

  exports.loadJavascript = ()=>({
    module: {
      rules:[
        {
          test: /\.js$/,
          include: PATH_SOURCE,
          use: "babel-loader"
        }
      ]
    }
  })

  exports.generateSourceMap = ({type})=>({
    devtool: type
  });

  exports.clean = ()=>({
    plugins:[
      new CleanWebpackPlugin()
    ]
  })