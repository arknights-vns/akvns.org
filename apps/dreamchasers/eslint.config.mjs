import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import antfu from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";

export default antfu(
    // anthony fu
    {
        type: "app",
        stylistic: {
            indent: 4,
            semi: true,
            jsx: true,
            overrides: {
                "style/quotes": ["error", "double", { avoidEscape: true }]
            }
        },
        typescript: true,
        react: true,
        nextjs: true,
        jsx: true,
        yaml: false,
        jsonc: false,
        formatters: {
            css: true
        },
        lessOpinionated: true,
        ignores: [
            ".next",
            "node_modules",
            "public",
            "scripts/**/*.ts",
            // let shadcn cook on his own.
            "components/ui/**/*.tsx",
            "components/shadcn/**/*.tsx",
            "lib/hooks/shadcn/**/*.ts",
            // generated
            "lib/supabase/terra.d.ts"
        ]
    },
    // Tailwind
    ...tailwind.configs["flat/recommended"],
    {
        settings: {
            tailwindcss: {
                config: `${dirname(fileURLToPath(import.meta.url))}/app/globals.css`
            }
        }
    },
    // Custom rules for antfu.
    {
        rules: {
            "no-console": ["warn", { allow: ["warn", "error", "info"] }],
            "ts/consistent-type-definitions": ["error", "type"],
            "node/prefer-global/process": "off",
            // "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
            "@eslint-react/prefer-shorthand-fragment": "error",
            "@eslint-react/prefer-shorthand-boolean": "error",
            "style/brace-style": ["error", "1tbs"],
            "style/comma-dangle": ["error", "never"],
            "style/max-len": ["error", {
                code: 120,
                tabWidth: 4,
                ignoreStrings: true,
                ignoreComments: true,
                ignoreTemplateLiterals: true
            }],
            "style/jsx-curly-brace-presence": [
                "warn",
                {
                    props: "never",
                    children: "never",
                    propElementValues: "always"
                }
            ],
            "no-restricted-syntax": [
                "error",
                {
                    selector: "JSXAttribute[name.name='className'] JSXExpressionContainer > TemplateLiteral[expressions.length > 0]",
                    message: "Haiya please use clsx bro..."
                }
            ],
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["./*", "../*"],
                            message: "Haiya please use @ import bro..."
                        }
                    ]
                }
            ],
            "react-refresh/only-export-components": [
                "error",
                {
                    allowExportNames: ["metadata", "viewport"],
                    allowConstantExport: true
                }
            ]
        }
    }
);
