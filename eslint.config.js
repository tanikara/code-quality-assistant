module.exports = [
  {
    files: ["*.js"],
    languageOptions: {
      sourceType: "module"
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];
