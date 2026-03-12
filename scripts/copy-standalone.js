const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source not found, skipping: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Copying .next/static → .next/standalone/.next/static ...");
copyDir(
  path.join(".next", "static"),
  path.join(".next", "standalone", ".next", "static")
);

console.log("Copying public → .next/standalone/public ...");
copyDir("public", path.join(".next", "standalone", "public"));

console.log("Done!");
