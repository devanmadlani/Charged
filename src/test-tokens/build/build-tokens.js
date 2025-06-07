import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

// Register the transforms with proper options for semantic tokens
register(StyleDictionary, {
  excludeParentKeys: true, // This helps with token references
  expand: {
    typography: true,
    shadow: true,
    border: true,
    composition: true,
  },
});

async function buildTokens() {
  const sd = new StyleDictionary({
    source: ["src/tokens/design-tokens.json"],
    preprocessors: ["tokens-studio"], // required since 0.16.0
    platforms: {
      css: {
        transformGroup: "tokens-studio", // use the standard transformGroup
        transforms: ["name/kebab"],
        buildPath: "src/test-tokens/design-tokens/",
        files: [
          {
            destination: "variables.css",
            format: "css/variables",
          },
        ],
      },
    },
  });

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

buildTokens().catch(console.error);
