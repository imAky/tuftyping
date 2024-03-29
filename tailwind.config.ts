import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#272932",
        "primary-2": "#18a4b5",
        "secondary-1": "#a48e85",
        "secondary-2": "#3D404F",
      },
    },
  },
  plugins: [],
};
export default config;
