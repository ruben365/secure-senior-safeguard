import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// NOTE: deferCssPlugin was removed — it converted the main CSS bundle to
// media="print" with an onload swap, which caused a blank page in production
// on Vercel (the CSS loaded but never became visible). The CSS bundle is
// small enough to load synchronously without harming LCP.

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const previewFlag = (
    env.VITE_PREVIEW_MODE ||
    env.LOVABLE_PREVIEW ||
    env.PREVIEW ||
    ""
  ).toLowerCase();
  const isPreviewBuild =
    previewFlag === "true" || previewFlag === "1" || previewFlag === "yes";
  const disableImageOptimizer =
    (env.VITE_DISABLE_IMAGE_OPTIMIZER || "").toLowerCase() === "true";

  // Honor PORT env var so the Claude Code preview launcher (which sets PORT
  // when autoPort:true picks a free port) can override the hardcoded default.
  // No code references localhost:5173/8080 for OAuth/webhooks/CORS, so the
  // server is free to bind to whatever port the launcher provides. Fall back
  // to 8080 for plain `npm run dev` outside the launcher.
  const portFromEnv = Number(process.env.PORT);
  const devServerPort = Number.isFinite(portFromEnv) && portFromEnv > 0
    ? portFromEnv
    : 8080;

  return {
    server: {
      host: "::",
      port: devServerPort,
      strictPort: false,
      allowedHosts: [".trycloudflare.com", "localhost", "192.168.1.201"],
    },
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      minify: "esbuild",
      target: "es2022",
      cssMinify: true,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Core React — loaded on every page
            if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
              return "react-vendor";
            }
            if (id.includes("node_modules/react-router")) {
              return "router-vendor";
            }
            // Deferred: only loaded when needed
            if (id.includes("node_modules/@supabase")) {
              return "supabase-vendor";
            }
            if (id.includes("node_modules/@tanstack/react-query")) {
              return "query-vendor";
            }
            if (id.includes("node_modules/framer-motion")) {
              return "animation-vendor";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "icons-vendor";
            }
            // Heavy libs — isolate so they only load when needed
            if (id.includes("node_modules/recharts") || id.includes("node_modules/d3-")) {
              return "charts-vendor";
            }
            if (id.includes("node_modules/@tiptap") || id.includes("node_modules/prosemirror") || id.includes("node_modules/@hocuspocus")) {
              return "editor-vendor";
            }
            if (id.includes("node_modules/@stripe") || id.includes("node_modules/@stripe/stripe-js")) {
              return "stripe-vendor";
            }
            if (id.includes("node_modules/react-helmet-async")) {
              return "helmet-vendor";
            }
            if (id.includes("node_modules/zod")) {
              return "zod-vendor";
            }
            if (id.includes("node_modules/dompurify")) {
              return "sanitize-vendor";
            }
          },
          // Optimize chunk file names for caching
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
      // Enable chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      // deferCssPlugin removed — caused blank page on Vercel (media="print" never swapped)
      !isPreviewBuild &&
        !disableImageOptimizer &&
        ViteImageOptimizer({
          jpg: { quality: 55, progressive: true },
          jpeg: { quality: 55, progressive: true },
          png: { quality: 60, compressionLevel: 9 },
          webp: { quality: 55 },
          avif: { quality: 50 },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
  };
});
