const StyleDictionary = require("style-dictionary");

["light", "dark"].forEach((theme) => {
  const SD = StyleDictionary.extend({
    source: [`src/tokens/${theme}.json`],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `src/theme/${theme}/`,
        files: [
          {
            destination: "variables.css",
            format: "css/variables",
          },
        ],
      },
    },
  });

  SD.buildAllPlatforms();
});
