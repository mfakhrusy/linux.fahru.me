import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vinext()],
  ssr: {
    noExternal: [/^@emotion\//, "@chakra-ui/react"],
  },
});
