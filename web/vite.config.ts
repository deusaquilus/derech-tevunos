import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    /**
     * The repo sits on the Windows filesystem under /mnt/c. WSL gets no inotify
     * events across that mount, so without polling the watcher never fires and
     * hot reload silently serves stale modules.
     */
    watch: { usePolling: true, interval: 300 },
  },
});
