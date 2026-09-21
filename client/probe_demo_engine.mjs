import { createServer, mergeConfig } from "vite";
import { createServer as createHttp } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, ".."); // client/
const publicDir = path.join(root, "public");

const server = await createServer({
  root,
  logLevel: "silent",
  server: { port: 5199, strictPort: true, host: "127.0.0.1" },
});
await server.listen();

const base = "http://127.0.0.1:5199";
const targets = [
  { label: "demo-engine.html",            rel: "demo-engine.html",           file: path.join(publicDir, "demo-engine.html") },
  { label: "transparent_engine.webm",     rel: "transparent_engine.webm",     file: path.join(publicDir, "transparent_engine.webm") },
  { label: "new_background.png",          rel: "new_background.png",          file: path.join(publicDir, "new_background.png") },
];

for (const t of targets) {
  try {
    const res = await fetch(`${base}/${t.rel}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const sha = createHash("sha256").update(buf).digest("hex").toUpperCase();
    const disk = await readFile(t.file);
    const diskSha = createHash("sha256").update(disk).digest("hex").toUpperCase();
    console.log(
      `${t.label}: HTTP=${res.status} bytes=${buf.length} sha=${sha} diskSha=${diskSha} IDENTICAL=${sha === diskSha}`
    );
  } catch (e) {
    console.log(`${t.label}: ERROR ${e.message}`);
  }
}

await server.close();
console.log("--- done ---");
