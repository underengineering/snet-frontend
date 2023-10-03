import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            primary: "#38bdf8",
            secondary: "#7dd3fc",

            "primary-red": "#ef4444",
            "secondary-red": "#f87171",

            "primary-bg": "#e4e4e7",
            "secondary-bg": "#fafafa",

            neutral: "#374151",

            btn: "#38bdf8",
            "btn-hover": "#0ea5e9",
            "btn-active": "#7dd3fc",
        },
    },
    plugins: [],
};

export default config;
