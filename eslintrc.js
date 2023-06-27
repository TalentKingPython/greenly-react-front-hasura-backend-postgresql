const path = require("path");

const testsPattern = [
  "**/*.test.{ts,tsx}",
  "**/*.stories.{ts,tsx}",
  "**/testUtils/**/*",
  "**/testData.ts",
  "**/test.{ts,tsx}",
];

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    extraFileExtensions: [".json"],
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest",
    "testing-library",
    "jsx-a11y",
    "local",
    "typescript-sort-keys",
  ],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/test.{ts,tsx}",
          "**/*.test.{ts,tsx}",
          "**/*.stories.{ts,tsx}",
          "**/testUtils/**/*",
          "**/testData.ts",
        ],
      },
    ],
    semi: "off",
    // https://github.com/benmosher/eslint-plugin-import/issues/1446
    // 0 = off, 1 = warn, 2 = error
    "import/named": "off",
    "import/extensions": "off",
    "linebreak-style": "off",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    quotes: "off",
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    "jsx-quotes": ["error", "prefer-single"],
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "arrow-body-style": "off",
    "eol-last": "off",
    "no-trailing-spaces": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "warn", // not critical
    "import/prefer-default-export": "off",
    "no-restricted-globals": "warn",
    "react/require-default-props": "off",
    "no-restricted-syntax": "warn", // preventing usage of for..in loops
    // ignore 'state' variables for immer mutability in redux-toolkit
    // https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
    "no-param-reassign": [
      "warn",
      {
        props: true,
        ignorePropertyModificationsFor: ["state", "beforeUnloadEvent"],
      },
    ],
    "consistent-return": "off",
    "import/order": "off",
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    "no-plusplus": "off",
    "newline-before-return": "warn",
    "max-classes-per-file": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/no-implied-eval": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/indent": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/1824
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "let", next: "*" },
      { blankLine: "never", prev: "let", next: "let" },
      { blankLine: "any", prev: "let", next: "const" },
      { blankLine: "always", prev: "const", next: "*" },
      { blankLine: "any", prev: "const", next: "const" },
      { blankLine: "any", prev: "const", next: "let" },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "if" },
      { blankLine: "always", prev: "*", next: "for" },
      { blankLine: "always", prev: "*", next: "export" },
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "never", prev: "import", next: "import" },
    ],
    "react-hooks/exhaustive-deps": "off", // need to pay attention, blind following the rule will break the logic
    radix: "off",
    "jest/no-export": "warn",
    "no-case-declarations": "warn",
    "default-case": "warn",
    "no-prototype-builtins": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"], allowAfterThis: true }], // use only for mongo _id
    "@typescript-eslint/naming-convention": [
      // For interfaces
      "warn",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
    ],
    "no-lonely-if": "off",
    "jest/no-done-callback": "warn", // waiting for decision
    // below rules added after unify eslint
    "prefer-destructuring": "warn", // Use object destructuring
    "@typescript-eslint/return-await": "warn", // Redundant use of `await` on a return value
    "no-unneeded-ternary": "warn", // Unnecessary use of conditional expression for default assignment
    "@typescript-eslint/no-shadow": "warn", // Avoid calling `expect` conditionally
    "jest/no-conditional-expect": "warn",
    "jest/no-try-expect": "warn",
    "jest/no-identical-title": "warn",
    "object-shorthand": "warn",
    "prefer-const": "warn",
    "import/no-duplicates": "warn",
    "array-callback-return": "warn",
    "no-nested-ternary": "warn",
    "no-console": "off",
    "one-var": "warn",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "no-await-in-loop": "warn",
    "no-else-return": ["warn", { allowElseIf: true }], // https://eslint.org/docs/rules/no-else-return#allowelseif-true
    "no-useless-return": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-template": "warn",
    "jest/no-standalone-expect": "warn",
    "jest/valid-title": "warn",
    "jest/consistent-test-it": ["error"],
    "@typescript-eslint/no-loop-func": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/lines-between-class-members": "warn",
    "@typescript-eslint/dot-notation": "warn",
    "operator-assignment": "warn",
    "import/no-useless-path-segments": "warn",
    "prefer-object-spread": "warn",
    "global-require": "warn",
    "react/jsx-no-target-blank": ["warn", { allowReferrer: false }],
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/accessible-emoji": "warn",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/control-has-associated-label": "warn",
    "jsx-a11y/iframe-has-title": "error",
    "jsx-a11y/mouse-events-have-key-events": "warn",
    "max-depth": ["warn", { max: 2 }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "typescript-sort-keys/string-enum": [
      "warn",
      "asc",
      { caseSensitive: true },
    ],
  },
  settings: {
    "import/resolver": "node",
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "CoreLink",
      { name: "Link", linkAttribute: "href" },
      "ButtonLink",
      { name: "Button", linkAttribute: "href" },
    ],
  },
  overrides: [
    {
      files: ["/src/**/*.{ts,tsx}"],
      rules: {
        "no-console": "warn",
        "local/no-nested-selectors": "warn",
        "import/no-extraneous-dependencies": [
          "error",
          {
            packageDir: ["./client", "./"],
            devDependencies: testsPattern,
          },
        ],
        "@typescript-eslint/ban-types": [
          "warn",
          {
            types: {
              "React.FC": {
                message:
                  "React.FC is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
              },
              "React.FunctionalComponent": {
                message:
                  "React.FunctionalComponent is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
              },
              "React.VFC": {
                message:
                  "React.VFC is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
              },
              "React.VoidFunctionComponent": {
                message:
                  "React.VoidFunctionComponent is problematic. [More info here](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)",
              },
            },
          },
        ],
      },
    },

    {
      files: [
        "/src/**/test.tsx",
        "/src/**/*.test.tsx",
        "/src/**/__tests__/**/*.{ts,tsx}",
      ],
      extends: ["plugin:testing-library/react", "plugin:jest/style"],
      rules: {
        "testing-library/no-unnecessary-act": "warn",
        "testing-library/prefer-user-event": "warn",
        "testing-library/prefer-wait-for": "warn",
        "testing-library/prefer-presence-queries": "warn",
        "testing-library/no-node-access": "warn",
        "testing-library/no-container": "warn",
      },
    },
    {
      files: ["**/test.tsx", "**/test.ts"],
      rules: {
        "jsx-a11y/control-has-associated-label": "off",
      },
    },
  ],
};
