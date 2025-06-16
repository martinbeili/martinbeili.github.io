module.exports = function (eleventyConfig) {
    eleventyConfig.setInputDirectory("./src");
    eleventyConfig.addPassthroughCopy({ "src/images": "images" });
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "images/favicon": "/" });
};
