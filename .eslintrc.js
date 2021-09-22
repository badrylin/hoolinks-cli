/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        // "prettier",
        // "prettier/@typescript-eslint"
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended',
        // "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "ignorePatterns": [
        ".eslintrc.js",
        "cli.config.js",
        "prettier.config.js",
        "commitlint.config.js",
        "src/common",
        "node_modules"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": void 0,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        // "eslint-plugin-prefer-arrow",
        "eslint-plugin-import",
        "eslint-plugin-no-null",
        "eslint-plugin-unicorn",
        "eslint-plugin-jsdoc",
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/consistent-type-definitions": "warn",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/member-delimiter-style": [
            "off",
            {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-dynamic-delete": "warn",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "warn",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-misused-new": "off",
        "@typescript-eslint/no-namespace": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-parameter-properties": "warn",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-shadow": [
            "off",
            {
                "hoist": "all"
            }
        ],
        "@typescript-eslint/no-this-alias": "warn",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
        "@typescript-eslint/no-unnecessary-qualifier": "off",
        "@typescript-eslint/no-unnecessary-type-arguments": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/prefer-namespace-keyword": "warn",
        "@typescript-eslint/prefer-readonly": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/quotes": [
            "warn",
            "single",
            {
                "avoidEscape": true
            }
        ],
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/semi": [
            "off",
            null
        ],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/triple-slash-reference": [
            "warn",
            {
                "path": "always",
                "types": "prefer-import",
                "lib": "always"
            }
        ],
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/unified-signatures": "warn",
        "arrow-body-style": "off",
        "arrow-parens": [
            "off",
            "always"
        ],
        // "brace-style": [
        //     "warn",
        //     "off"
        // ],
        "class-methods-use-this": "off",
        "comma-dangle": [
            "warn",
            "always-multiline"
        ],
        "complexity": [
            "warn",
            {
                "max": 30
            }
        ],
        "constructor-super": "warn",
        "curly": [
            "warn",
            "multi-line"
        ],
        "default-case": "off",
        "dot-notation": "off",
        "eqeqeq": [
            "warn",
            "always"
        ],
        "guard-for-in": "off",
        "id-blacklist": "off",
        "id-match": "off",
        "import/no-default-export": "off",
        // "import/no-deprecated": "warn",
        "import/no-extraneous-dependencies": "off",
        "import/no-internal-modules": "off",
        "import/no-unassigned-import": "off",
        "import/order": "off",
        "indent": "off",
        "jsdoc/check-alignment": "off",
        "jsdoc/check-indentation": "off",
        "jsdoc/newline-after-description": "off",
        "jsdoc/no-types": "off",
        "linebreak-style": "off",
        "max-classes-per-file": "off",
        "max-len": "off",
        "max-lines": "off",
        "new-parens": "off",
        "newline-per-chained-call": "off",
        "no-bitwise": "off",
        "no-caller": "warn",
        "no-cond-assign": "warn",
        "no-console": [
            "off",
            {
                "allow": [
                    "warn",
                    "dir",
                    "time",
                    "timeEnd",
                    "timeLog",
                    "trace",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "debug",
                    "info",
                    "dirxml",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-debugger": "off",
        "no-duplicate-case": "warn",
        "no-duplicate-imports": "warn",
        "no-empty": [
            "warn",
            {
                "allowEmptyCatch": true
            }
        ],
        "no-eval": "off",
        "no-fallthrough": "warn",
        "no-invalid-this": "off",
        "no-irregular-whitespace": "warn",
        "no-magic-numbers": "off",
        "no-multiple-empty-lines": [
            "warn",
            {
                "max": 3
            }
        ],
        "no-new-wrappers": "warn",
        "no-null/no-null": "off",
        "no-param-reassign": "warn",
        "no-redeclare": "off",
        "no-restricted-imports": "off",
        "no-return-await": "off",
        "no-sequences": "off",
        "no-shadow": "off",
        "no-sparse-arrays": "warn",
        "no-template-curly-in-string": "warn",
        "no-throw-literal": "warn",
        "no-trailing-spaces": "off",
        "no-undef-init": "warn",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "warn",
        "no-unused-expressions": "off",
        "no-unused-labels": "off",
        "no-use-before-define": "off",
        "no-var": "warn",
        "no-void": "off",
        "object-shorthand": "warn",
        "one-var": [
            "warn",
            "never"
        ],
        "padding-line-between-statements": [
            "off",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            }
        ],
        // "prefer-arrow/prefer-arrow-functions": ["error", {allowStandaloneDeclarations: true}],
        "prefer-const": "off",
        "prefer-object-spread": "warn",
        "prefer-template": "off",
        "quote-props": "off",
        "quotes": ["warn", "single"],
        "radix": "off",
        "semi": "off",
        "space-before-function-paren": "off",
        "space-in-parens": [
            "off",
            "never"
        ],
        "spaced-comment": "off",
        "unicorn/filename-case": "off",
        "unicorn/prefer-switch": "off",
        "unicorn/prefer-ternary": "off",
        "use-isnan": "warn",
        "valid-typeof": "off",
        "yoda": "off",
    }
};
