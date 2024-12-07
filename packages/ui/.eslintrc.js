/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react.js"],
  parserOptions: {
    // When running ESLint CLI from root, use relative path from packages/ui/
    // When using VS Code ESLint extension, use absolute path from root
    project: "./tsconfig.json",
  },
};
