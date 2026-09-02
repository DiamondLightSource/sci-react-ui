import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    // material-react-table otherwise pulls in its own nested React copy,
    // causing "Invalid hook call" errors.
    dedupe: ["react", "react-dom"],
  },
});
