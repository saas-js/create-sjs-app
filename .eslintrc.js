module.exports = {
  $schema: "http://json.schemastore.org/eslintrc",
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    cli: "./apps/cli/tsconfig.json",
    installers: "./packages/installers/tsconfig.json",
    addOn: "./packages/addon-saas-ui/tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "no-shadow": 1,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/order": [
      "error",
      {
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./apps/cli/tsconfig.json",
        installers: "./packages/installers/tsconfig.json",
        addOn: "./packages/addon-saas-ui/tsconfig.json",
      },
    },
  },
  ignorePatterns: ["node_modules/", "build/", "dist/"],
};
