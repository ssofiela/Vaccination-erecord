const path = require("path")
module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "useJSXTextNode": true,
        "project": path.resolve(process.cwd(), "tsconfig.eslint.json")
    },
    env: {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:import/recommended",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "no-console": ["error"],
        "prefer-const": ["error"],
        "prefer-rest-params": ["error"],
        "prefer-spread": ["error"],

        "react/jsx-fragments": ["error"],
        "react/no-access-state-in-setstate": ["error"],
        "react/no-array-index-key": ["error"],
        "react/no-did-update-set-state": ["error"],
        "react/no-this-in-sfc": ["error"],

        /** Turn off some of the `eslint-plugin-react` rules since we are working with TypeScript */
        "react/prop-types": ["off"],

        "import/no-self-import": ["error"],
        "import/no-mutable-exports": ["error"],
        "import/first": ["error"],
        "import/extensions": ["error", "never", {json: "always"}],
        "import/order": ["error", {"newlines-between": "always"}],
        "import/newline-after-import": ["error"],
        "import/no-unassigned-import": ["error"],

        /** Turn off the import/named rule because it doesn't work types installed from the @typed scope. This rules is included vai the import/recommended config that we extend
         Also turn off the import/namespace, import/no-cycle (and a few other) rules since they offer very little benefit over their performance cost.
         @see https://github.com/benmosher/eslint-plugin-import/issues/1341
         @see https://github.com/typescript-eslint/typescript-eslint/issues/389
        */

        "import/default": ["off"],
        "import/named": ["off"],
        "import/namespace": ["off"],
        "import/no-cycle": ["off"],
        "import/no-named-as-default": ["off"],
        "import/no-named-as-default-member": ["off"],

        "@typescript-eslint/await-thenable": ["error"],
        "@typescript-eslint/ban-ts-ignore": ["error"],
        "@typescript-eslint/explicit-function-return-type": ["error", {allowExpressions: true, allowTypedFunctionExpressions: true}],
        "@typescript-eslint/member-ordering": ["error"],
        "@typescript-eslint/no-require-imports": ["error"],
        "@typescript-eslint/no-this-alias": ["error"],
        "@typescript-eslint/no-unnecessary-qualifier": ["error"],
        "@typescript-eslint/no-unnecessary-type-assertion": ["error"],
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/no-useless-constructor": ["error"],
        "@typescript-eslint/prefer-for-of": ["error"],
        "@typescript-eslint/prefer-function-type": ["error"],
        "@typescript-eslint/prefer-includes": ["error"],

        /** Turn turn off rules that conflict with prettier.
         @note There don't seem to be any rules that conflict with prettier in the recommended preset of eslint.
         */
        "@typescript-eslint/func-call-spacing": ["off"],
        "@typescript-eslint/indent": ["off"],
        "typescript-eslint/member-delimiter-type": ["off"],
        "@typescript-eslint/no-extra-parens": ["off"],
        "@typescript-eslint/semi": ["off"],
        "@typescript-eslint/type-annotation-spacing": ["off"]
    },
    settings: {
        "react": {
            "version": "detect"
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        },
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"]
    }
};