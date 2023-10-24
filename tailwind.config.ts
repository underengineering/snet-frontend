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
            "text-light": "#f2f2f2",
            "text-dark": "#0b0b0b",

            primary: "#39b2e8",
            secondary: "#50c5fc",

            transparent: "#00000000",

            "primary-red": "#d73818",
            "secondary-red": "#e54728",

            "primary-bg": "#dedede",
            "secondary-bg": "#eeeeee",

            neutral: "#374151",
            skeleton: "#536067",
            highlight: "#cecece",

            btn: "#50c5fc",
            "btn-hover": "#39b2e8",
            "btn-active": "#30abe1",

            "btn-green": "#63ca3f",
            "btn-green-hover": "#74db51",
            "btn-green-active": "#59c033",

            "btn-red": "#de4022",
            "btn-red-hover": "#f05234",
            "btn-red-active": "#d63819",
        },
    },
    plugins: [],
};

export default config;
