import antfu from "@antfu/eslint-config";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import playwright from "eslint-plugin-playwright";

export default antfu(
    {
        type: "app",
        stylistic: {
            jsx: true,
            indent: 4,
            quotes: "double",
        },
        typescript: true,
        react: true,
        nextjs: true,
        jsx: true,
        json: false,
        jsonc: false,
        yaml: false,
        formatters: {
            css: true,
        },
        lessOpinionated: true,
        ignores: [
            ".next",
            "node_modules",
            "public",
            "src/components/ui/**/",
            "src/generated/prisma/**"
        ],
    },
    {
        files: ["**/*.{ts,tsx,cts,mts}"],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                project: true,
            },
        },
    },
    {
        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "better-tailwindcss": eslintPluginBetterTailwindcss,
        },
        rules: {
            ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
            "better-tailwindcss/enforce-consistent-line-wrapping": ["off"],
        },
        settings: {
            "better-tailwindcss": {
                entryPoint: "src/app/globals.css",
            },
        },
    },
    {
        ...playwright.configs["flat/recommended"],
        files: ["tests/**"],
        rules: {
            ...playwright.configs["flat/recommended"].rules,
        },
    },
    {
        rules: {
            "no-console": ["warn", { allow: ["warn", "error", "info"], }],
            "ts/consistent-type-definitions": ["error", "type"],
            "node/prefer-global/process": "off",
            "@eslint-react/prefer-shorthand-fragment": "error",
            "@eslint-react/prefer-shorthand-boolean": "error",
            "style/semi": ["error", "always"],
            "style/brace-style": ["error", "1tbs"],
            "style/comma-dangle": ["error", {
                objects: "always",
                enums: "always",
                arrays: "only-multiline",
            }],
            "style/max-len": ["error", {
                code: 120,
                ignoreStrings: true,
                ignoreComments: true,
                ignoreTemplateLiterals: true,
            }],
            "style/jsx-curly-brace-presence": [
                "warn",
                {
                    props: "always",
                    children: "never",
                    propElementValues: "always",
                }
            ],
            "react-refresh/only-export-components": [
                "error",
                {
                    allowExportNames: ["metadata", "viewport"],
                    allowConstantExport: true,
                }
            ],
        },
    }
);
