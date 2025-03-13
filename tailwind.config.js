/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // can be removed later on
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

                primaryBlue: {
                    DEFAULT: "#2293F7", // blue-base
                    hover: "#3B9FF7", // blue-light
                    focus: "#0877D9", // blue-dark
                    disabled: "#A5C9F5", // inaktív állapotban halványított
                    content: "#E2BE58", // tartalom szín: sárga (#E2BE58)
                },
                primaryGray: {
                    DEFAULT: "#697492", // gray-base
                    hover: "#8A9BB8", // enyhén világosabb árnyalat hover esetén
                    focus: "#4D5A79", // sötétebb, fókusz állapot
                    disabled: "#B0B7C6", // disabled állapot: halványított
                    content: "#EBEDF1", // tartalom szín: szürkén kék (text-default)
                },
                success: {
                    DEFAULT: "#06AC84",
                    hover: "#08D9A8",
                    focus: "#04765C",
                    disabled: "#A5D4B3",
                    content: "#FFFFFF",
                },
                error: {
                    DEFAULT: "#FE5448",
                    hover: "#FE675D",
                    focus: "#FE2F20",
                    disabled: "#FBB7B2",
                    content: "#FFFFFF",
                },
                warning: {
                    DEFAULT: "#E2BE58",
                    hover: "#F0CF70",
                    focus: "#CDA14E",
                    disabled: "#F5E1B9",
                    content: "#22262F",
                },
                text: {
                    DEFAULT: "#22262F", // világos háttéren sötét szöveghez
                    alternative: "#EBEDF1", // sötét háttéren világos szöveghez
                },
                background: {
                    DEFAULT: "#FFFFFF", // alap háttérszín
                },
                // can be removed later on
                primary: {
                    DEFAULT: "#6d28d9", // violet-700
                    focus: "#5b21b6", // violet-800
                    content: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#db2777", // pink-600
                    focus: "#be185d", // pink-700
                    content: "#ffffff",
                },
                accent: {
                    DEFAULT: "#f59e0b", // amber-500
                    focus: "#d97706", // amber-600
                    content: "#ffffff",
                },
                neutral: {
                    DEFAULT: "#f3f4f6", // gray-100
                    focus: "#e5e7eb", // gray-200
                    content: "#1f2937", // gray-800
                },
                base: {
                    100: "#ffffff",
                    200: "#f8f9fa", // slightly off-white
                    300: "#f3f4f6", // gray-100
                    content: "#1f2937", // gray-800
                },
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
