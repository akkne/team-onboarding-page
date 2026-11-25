import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([{ ignores: ["themes/*/built/**"] }, ...nextVitals, ...nextTypeScript]);
