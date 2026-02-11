import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const previewFlag = (env.VITE_PREVIEW_MODE || env.LOVABLE_PREVIEW || env.PREVIEW || "").toLowerCase();
  const isPreviewBuild = previewFlag === "true" || previewFlag === "1" || previewFlag === "yes";
  const disableImageOptimizer = (env.VITE_DISABLE_IMAGE_OPTIMIZER || "").toLowerCase() === "true";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      !isPreviewBuild &&
        !disableImageOptimizer &&
        ViteImageOptimizer({
          jpg: { quality: 80 },
          jpeg: { quality: 80 },
          png: { quality: 80 },
          webp: { quality: 80 },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
