const fs = require("fs");
const path = require("path");

const tokensPath = path.resolve(__dirname, "../src/tokens/tokens.json");
const raw = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));

const transform = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, { value: val }]),
  );

const outDir = path.resolve(__dirname, "../src/tokens");

["light", "dark"].forEach((theme) => {
  const data = raw?.iONICTheme?.[theme];
  if (!data) {
    console.error(`❌ No ${theme} tokens found`);
    return;
  }

  fs.writeFileSync(
    path.join(outDir, `${theme}.json`),
    JSON.stringify(transform(data), null, 2),
  );
});

console.log("✅ Created light.json and dark.json");
