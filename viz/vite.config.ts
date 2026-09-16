import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: false,
    // The project lives on a Windows drive mounted into WSL, where inotify
    // never fires. Without polling the dev server serves stale modules.
    watch: { usePolling: true, interval: 300 },
  },
  build: { outDir: "dist", emptyOutDir: true },
});
