/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                "blue-light": "#3B9FF7",
                "blue-base": "#2293F7",
                "blue-dark": "#0877D9",
                "green-light": "#08D9A8",
                "green-base": "#06AC84",
                "green-dark": "#04765C",
                "gray-light": "#E9EBEC",
                "gray-base": "#697492",
                "gray-dark": "#22262F",
                "red-light": "#FE675D",
                "red-base": "#FE5448",
                "red-dark": "#FE2F20",
                "yellow-base": "#E2BE58",
                "text-default": "#EBEDF1",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
