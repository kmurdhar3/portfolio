// Converts the original headshot into a web-sized JPEG at public/me.jpg.
// Usage: node scripts/optimize-photo.mjs [path-to-original]
import sharp from "sharp";

const src = process.argv[2] ?? "originals/me-original.png";
const meta = await sharp(src).metadata();
console.log("source", meta.width, "x", meta.height);
await sharp(src)
  .resize({ width: 720, height: 720, fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/me.jpg");
console.log("wrote public/me.jpg");
