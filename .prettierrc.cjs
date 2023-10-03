/** @type {import("prettier").Options} */
const config = {
    singleQuote: false,
    trailingComma: "es5",
    tabWidth: 4,

    plugins: ["@trivago/prettier-plugin-sort-imports"],

    importOrder: ["<THIRD_PARTY_MODULES>", "^@(.*)$", "^[./]"],
    importOrderParserPlugins: ["typescript", "jsx"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};

module.exports = config;
