import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            // https://oklch.com
            primary: "#39b2e8",
            secondary: "#50c5fc",

            transparent: "#00000000",

            "primary-red": "#e62f01",
            "secondary-red": "#f94421",

            "primary-bg": "#dedede",
            "secondary-bg": "#eeeeee",

            neutral: "#374151",
            skeleton: "#536067",
            highlight: "#cecece",

            btn: "#50c5fc",
            "btn-hover": "#39b2e8",
            "btn-active": "#30abe1",
        },
    },
    plugins: [],
};

export default config;
