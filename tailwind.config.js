/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // DEFAULT: default value
                // hover: hover state value
                // focus: focus state value
                // disabled: disabled state value
                // content: inner content value
                // link: inner link value
                primaryBlue: {
                    DEFAULT: "#2293F7",
                    hover: "#3B9FF7",
                    focus: "#0877D9",
                    disabled: "#A5C9F5",
                    link: "#E2BE58",
                    text: "#fff",
                },
                primaryGray: {
                    DEFAULT: "#697492",
                    hover: "#E9EBEC",
                    focus: "#697492",
                    disabled: "#B0B7C6",
                    link: "#EBEDF1",
                    text: "#f8f9fa",
                },
                success: {
                    DEFAULT: "#06AC84",
                    hover: "#08D9A8",
                    focus: "#04765C",
                    disabled: "#A5D4B3",
                    link: "#fff",
                    text: "#fff",
                },
                error: {
                    DEFAULT: "#FE5448",
                    hover: "#FE675D",
                    focus: "#FE2F20",
                    disabled: "#FBB7B2",
                    link: "#fff",
                    text: "#fff",
                },
                warning: {
                    DEFAULT: "#E2BE58",
                    hover: "#F0CF70",
                    focus: "#CDA14E",
                    disabled: "#F5E1B9",
                    link: "#22262F",
                    text: "#fff",
                },
                text: {
                    DEFAULT: "#22262F", // dark on light
                    alternative: "#EBEDF1", // light ondark
                },
                background: {
                    100: "#fff",
                    200: "#f8f9fa",
                },
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
