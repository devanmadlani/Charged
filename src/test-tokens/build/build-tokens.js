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
  // Configuration for sparkCore tokens
  const sparkCore = new StyleDictionary({
    source: ["src/tokens/design-tokens.json"],
    filter: (token) => token.path[0] === "sparkCore",
    preprocessors: ["tokens-studio"],
    platforms: {
      css: {
        transformGroup: "tokens-studio",
        transforms: ["name/kebab"],
        buildPath: "src/test-tokens/design-tokens/",
        files: [
          {
            destination: "sparkCore.css",
            format: "css/variables",
          },
        ],
      },
    },
  });

  // Configuration for sparkSemantic tokens
  const sparkSemantic = new StyleDictionary({
    source: ["src/tokens/design-tokens.json"],
    filter: (token) => token.path[0] === "sparkSemantic",
    preprocessors: ["tokens-studio"],
    platforms: {
      css: {
        transformGroup: "tokens-studio",
        transforms: ["name/kebab"],
        buildPath: "src/test-tokens/design-tokens/",
        files: [
          {
            destination: "sparkSemantic.css",
            format: "css/variables",
          },
        ],
      },
    },
  });

  // Configuration for sparkSemanticDark tokens
  const sparkSemanticDark = new StyleDictionary({
    source: ["src/tokens/design-tokens.json"],
    filter: (token) => token.path[0] === "sparkSemanticDark",
    preprocessors: ["tokens-studio"],
    platforms: {
      css: {
        transformGroup: "tokens-studio",
        transforms: ["name/kebab"],
        buildPath: "src/test-tokens/design-tokens/",
        files: [
          {
            destination: "sparkSemanticDark.css",
            format: "css/variables",
          },
        ],
      },
    },
  });

  // Clean and build all platforms for each configuration
  await Promise.all([
    sparkCore.cleanAllPlatforms(),
    sparkSemantic.cleanAllPlatforms(),
    sparkSemanticDark.cleanAllPlatforms(),
  ]);

  await Promise.all([
    sparkCore.buildAllPlatforms(),
    sparkSemantic.buildAllPlatforms(),
    sparkSemanticDark.buildAllPlatforms(),
  ]);
}

buildTokens().catch(console.error);
