module.exports = function (eleventyConfig) {
    eleventyConfig.setInputDirectory("./src");
    eleventyConfig.addPassthroughCopy({ "src/images": "images" });
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/content": "content" });
    eleventyConfig.addPassthroughCopy({ "src/images/favicon": "/" });
};
