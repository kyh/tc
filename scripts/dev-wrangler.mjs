import "dotenv/config";
import { spawn } from "child_process";

const child = spawn(
  "wrangler",
  [
    "pages",
    "dev",
    "./public",
    "--kv",
    "PROXY",
    "--binding",
    ...Object.keys(process.env).map((k) => `${k}=${process.env[k]}`),
  ],
  { stdio: "inherit" }
);

process.on("SIGTERM", () => {
  child.kill();
});
