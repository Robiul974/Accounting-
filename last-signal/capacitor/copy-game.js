const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..");
const dst = path.join(__dirname, "www");

fs.mkdirSync(path.join(dst, "icons"), { recursive: true });

for (const f of ["index.html", "manifest.json", "sw.js"]) {
  fs.copyFileSync(path.join(src, f), path.join(dst, f));
}
for (const f of fs.readdirSync(path.join(src, "icons"))) {
  fs.copyFileSync(path.join(src, "icons", f), path.join(dst, "icons", f));
}
console.log("Copied game files from last-signal/ to capacitor/www/");
