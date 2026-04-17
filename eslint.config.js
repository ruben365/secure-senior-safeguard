import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Contexts legitimately export both Provider components and context objects.
    // shadcn/ui components export both components and variant helpers (e.g. buttonVariants).
    // These patterns are intentional and do not affect production HMR behaviour.
    files: [
      "src/contexts/**/*.{ts,tsx}",
      "src/components/ui/**/*.{ts,tsx}",
      "src/components/SEO.tsx",
      "src/components/HeroCarousel.tsx",
      "src/components/reader/ReadingModeToggle.tsx",
    ],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
);
