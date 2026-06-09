import { cloudflare } from "@cloudflare/vite-plugin";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins: [vinext(), command === "build" && cloudflare()],
  ssr: {
    noExternal: [/^@emotion\//, "@chakra-ui/react"],
  },
}));
