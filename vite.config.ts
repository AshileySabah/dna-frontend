/* eslint-disable prefer-const */
import { setDefaultResultOrder } from "dns";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

setDefaultResultOrder("verbatim");

export default ({ mode }) => {
  let env = loadEnv(mode, process.cwd());
  env.MODE = mode;

  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return defineConfig({
    plugins: [react()],
    define: envWithProcessPrefix,
  });
};
