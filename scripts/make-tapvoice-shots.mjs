// Builds the TapVoice gallery slides (16:10, 2880x1800) at public/projects/tapvoice*.png.
// Each slide is a real app screenshot in a rounded window on the brand gradient.
// Usage: node scripts/make-tapvoice-shots.mjs
import sharp from "sharp";

const SRC = "originals/tapvoice";
const OUT = "public/projects";
const W = 2880;
const H = 1800;
const RADIUS = 28;

// Warm beige gradient with soft light stripes (same look as the TapVoice poster).
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5eedc"/>
      <stop offset="0.55" stop-color="#d9ccaa"/>
      <stop offset="1" stop-color="#8f8670"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g fill="#ffffff" opacity="0.28" transform="skewX(-20)">
    <rect x="300" y="0" width="330" height="${H}"/>
    <rect x="1150" y="0" width="330" height="${H}"/>
    <rect x="2000" y="0" width="330" height="${H}"/>
    <rect x="2850" y="0" width="330" height="${H}"/>
  </g>
</svg>`);

/** Layers (shadow, rounded window, edge highlight) for one screenshot placed at x,y. */
async function windowLayers(file, width, x, y) {
  const path = `${SRC}/${file}`;
  const meta = await sharp(path).metadata();
  const height = Math.round((meta.height * width) / meta.width);

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${RADIUS}" fill="#fff"/></svg>`,
  );
  const win = await sharp(path)
    .resize(width, height)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const shadowSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect x="${x}" y="${y + 40}" width="${width}" height="${height}" rx="${RADIUS}" fill="#2a2414" opacity="0.45"/></svg>`,
  );
  const shadow = await sharp(shadowSvg).blur(46).png().toBuffer();

  const edge = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect x="${x + 1}" y="${y + 1}" width="${width - 2}" height="${height - 2}" rx="${RADIUS}" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="2"/></svg>`,
  );

  return [{ input: shadow }, { input: win, left: x, top: y }, { input: edge }];
}

async function slide(name, windows) {
  const layers = [];
  for (const [file, width, x, y] of windows) layers.push(...(await windowLayers(file, width, x, y)));
  const out = `${OUT}/${name}`;
  await sharp(background).composite(layers).png({ compressionLevel: 9 }).toFile(out);
  const { size } = await sharp(out).metadata();
  console.log(`wrote ${out}${size ? ` (${Math.round(size / 1024)} KB)` : ""}`);
}

// Keep windows >= ~9% from the left/right edges: the card crops the sides a little on narrow layouts.
const FULL = 2340;
const fullX = (W - FULL) / 2;

// 1. Hotkeys, F9 provider and model.
await slide("tapvoice.png", [["Setting.png", FULL, fullX, 230]]);

// 2. F8 options: smart formatting, editing commands, recording indicator.
await slide("tapvoice-2.png", [["Setting_more.png", FULL, fullX, 230]]);

// 3. Dashboard, transcripts and F9 chat history, layered so each partial window's cut edge is covered.
await slide("tapvoice-3.png", [
  ["Dashboard.png", 1700, 330, 270],
  ["Transcript.png", 1700, 590, 560],
  ["ChatHistory.png", 1700, 850, 830],
]);
