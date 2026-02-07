import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
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
    ViteImageOptimizer({
      jpg: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    command === "build" &&
      prerender({
        routes: [
          "/",
          "/training",
          "/business",
          "/business/ai-receptionist",
          "/business/ai-automation",
          "/business/website-design",
          "/business/website-insurance",
          "/about",
          "/services",
          "/resources",
          "/articles",
          "/contact",
          "/careers",
          "/faq",
          "/application-pending",
          "/privacy-policy",
          "/terms-of-service",
          "/refund-policy",
          "/cookie-policy",
          "/acceptable-use",
          "/disclaimer",
          "/maintenance",
          "/payment-success",
          "/payment-canceled",
          // Auth/dynamic pages intentionally excluded:
          // /auth, /login, /signup, /reset-password, /portal/*, /admin/*, /articles/:slug
        ],
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "prerender-ready",
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
