import react from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import nextjs from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import tailwindcss from "eslint-plugin-better-tailwindcss";
import importLite from "eslint-plugin-import-lite";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
    // global ignore list
    {
        ignores: [
            ".next/*",
            "next-env.d.ts",
            "node_modules/*",
            "src/generated/prisma/*",
            "src/components/ui/*",
            "src/api/docs/*",
        ],
    },
    // TS & React & its slow af parser.
    // Yes, I am losing it.
    {
        extends: [
            eslint.configs.recommended,
            importLite.configs.recommended,
            tseslint.configs.strict,
            tseslint.configs.stylistic,
            tanstackQuery.configs["flat/recommended"],
            react.configs["recommended-typescript"],
            reactHooks.configs["recommended-latest"],
            reactRefresh.configs.recommended,
            reactRefresh.configs.next,
        ],
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "@eslint-react/jsx-shorthand-boolean": "error",
            "@eslint-react/jsx-shorthand-fragment": "error",
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "no-console": "error",
        },
    },
    // Next.js
    {
        plugins: { "@next/next": nextjs },
        rules: {
            ...nextjs.configs.recommended.rules,
            ...nextjs.configs["core-web-vitals"].rules,
        },
    },
    // Stylistic
    stylistic.configs.customize({
        braceStyle: "stroustrup",
        commaDangle: "always-multiline",
        indent: 4,
        jsx: true,
        quotes: "double",
        semi: true,
    }),
    {
        rules: {
            "@stylistic/jsx-curly-brace-presence": [
                "warn",
                {
                    children: "never",
                    propElementValues: "always",
                    props: "always",
                },
            ],
            "@stylistic/object-curly-newline": ["error"],
            "@stylistic/object-property-newline": "error",
        },
    },
    // Playwright
    {
        files: ["tests/**/*.spec.ts"],
        ...playwright.configs["flat/recommended"],
        rules: { ...playwright.configs["flat/recommended"].rules },
    },
    // TailwindCSS
    {
        files: ["**/*.{tsx}"],
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        plugins: { "better-tailwindcss": tailwindcss },
        rules: {
            ...tailwindcss.configs["recommended-error"].rules,
            "better-tailwindcss/enforce-consistent-line-wrapping": ["off"],
        },
        settings: { "better-tailwindcss": { entryPoint: `${import.meta.dirname}/src/app/globals.css` } },
    },
    // Unicorn
    eslintPluginUnicorn.configs.recommended,
    {
        rules: {
            "unicorn/filename-case": "off",
            "unicorn/prevent-abbreviations": ["error", { checkFilenames: false }],
        },
    },
    // perfectionist
    perfectionist.configs["recommended-natural"],
]);
