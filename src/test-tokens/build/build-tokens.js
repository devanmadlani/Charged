import StyleDictionary from "style-dictionary";
import { register, expandTypesMap } from "@tokens-studio/sd-transforms";
import { promises as fs } from "fs";
import path from "path";

// Constants for paths and configuration
const CONFIG = {
  sourceFile: "src/tokens/design-tokens.json",
  outputDir: "src/test-tokens/design-tokens/",
  outputFile: "spark-tokens.css",
};

// Utility function for logging with timestamps
function log(message, type = "info") {
  const timestamp = new Date().toISOString();
  const prefix = type === "error" ? "❌" : type === "success" ? "✅" : "ℹ️";
  console.log(`${prefix} [${timestamp}] ${message}`);
}

// Register the transforms with proper options for semantic tokens
register(StyleDictionary, {
  excludeParentKeys: true,
  expand: {
    typography: true,
    shadow: true,
    border: true,
    composition: true,
  },
});

// Create Style Dictionary configuration
function createConfig() {
  return {
    source: [CONFIG.sourceFile],
    parsers: [
      {
        pattern: /\.json$/,
        parse: ({ contents }) => JSON.parse(contents),
      },
    ],
    // Required since version 0.16.0
    preprocessors: ["tokens-studio"],
    // Configure proper token expansion
    expand: {
      typesMap: expandTypesMap,
    },
    platforms: {
      css: {
        transformGroup: "tokens-studio",
        transforms: ["name/kebab"],
        buildPath: CONFIG.outputDir,
        files: [
          {
            destination: CONFIG.outputFile,
            format: "css/variables",
            options: {
              showFileHeader: true,
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
}

// Function to ensure output directory exists
async function ensureOutputDir() {
  try {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    log(`Ensured output directory exists: ${CONFIG.outputDir}`, "success");
  } catch (error) {
    log(`Failed to create output directory: ${error.message}`, "error");
    throw error;
  }
}

// Function to validate source file exists and contains correct structure
async function validateSourceFile() {
  try {
    await fs.access(CONFIG.sourceFile);
    log(`Source file exists: ${CONFIG.sourceFile}`, "success");

    // Read and validate JSON structure
    const content = await fs.readFile(CONFIG.sourceFile, "utf8");
    const tokens = JSON.parse(content);

    // Count total tokens
    const tokenCount = Object.entries(tokens).reduce(
      (acc, [setName, setTokens]) => {
        const count = Object.keys(setTokens).length;
        log(`Found ${count} tokens in ${setName}`, "success");
        return acc + count;
      },
      0,
    );

    log(`Total tokens found: ${tokenCount}`, "success");
    return tokens;
  } catch (error) {
    log(`Source file validation failed: ${error.message}`, "error");
    throw error;
  }
}

// Function to clean and build
async function cleanAndBuild(config) {
  const sd = new StyleDictionary(config);

  try {
    log("Starting build...");

    // Clean
    log("Cleaning previous build...");
    await sd.cleanAllPlatforms();

    // Build
    log("Building tokens...");
    await sd.buildAllPlatforms();

    // Verify output file exists
    const outputFile = path.join(CONFIG.outputDir, CONFIG.outputFile);
    await fs.access(outputFile);

    // Get file size and content for validation
    const stats = await fs.stat(outputFile);
    const content = await fs.readFile(outputFile, "utf8");
    const cssVarCount = (content.match(/--/g) || []).length;

    log(
      `Successfully built tokens (${(stats.size / 1024).toFixed(2)}KB, ${cssVarCount} variables)`,
      "success",
    );

    return true;
  } catch (error) {
    log(`Failed to build: ${error.message}`, "error");
    throw error;
  }
}

// Main build function
async function buildTokens() {
  try {
    log("Starting token build process...");

    // Ensure output directory exists
    await ensureOutputDir();

    // Validate source file
    await validateSourceFile();

    // Create configuration
    const config = createConfig();

    // Build
    await cleanAndBuild(config);

    log("Token build completed successfully! 🎉", "success");
  } catch (error) {
    log(`Build process failed: ${error.message}`, "error");
    process.exit(1);
  }
}

// Run the build process
buildTokens().catch((error) => {
  log(`Unexpected error: ${error.message}`, "error");
  process.exit(1);
});
