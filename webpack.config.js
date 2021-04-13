const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const cssLoader = [parts.autoprefix(),parts.tailwind()]

const commonConfig = merge([
    { entry:["./src"]},
    parts.page({title:"Game in pack"}),
    parts.extractCSS({loaders:cssLoader}),
    parts.loadImages({limit: 150000}),
    parts.loadJavascript(),
]);

const productionConfig = merge([
     parts.eliminateUnusedCSS(),
     { optimization: {
         splitChunks: {
             chunks: "all"
         }
     },}
    ]);

const developmentConfig = merge([
  { entry : ["webpack-plugin-serve/client"] },
  parts.devServer(),
  parts.generateSourceMap({type:"nosources-source-map"})
]);

const getConfig = (mode)=>{
    switch(mode){
        case "production":
            return merge(commonConfig,productionConfig,{mode});
        case "development":
            return merge(commonConfig,developmentConfig,{mode});
        default:
            throw new Error(`Sto provando una configurazione indefinita`);
    }
}


module.exports = getConfig(mode);