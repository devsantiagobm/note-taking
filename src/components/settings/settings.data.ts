import { LuSun as SunIcon } from "react-icons/lu";
import { FaRegMoon as MoonIcon } from "react-icons/fa";
import { setFont, setTheme } from "@/stores/settings/settings.slice";

export const themeOptions = [
    {
        icon: SunIcon,
        title: "Light Mode",
        description: "Pick a clean and classic light theme",
        action: () => setTheme("light"),
        value: "light"
    },
    {
        icon: MoonIcon,
        title: "Dark Mode",
        description: "Select a sleek and modern dark theme",
        action: () => setTheme("dark"),
        value: "dark"
    },
];

export const fontOptions = [
    {
        title: "Inter",
        description: "Clean and modern, easy to read.",
        action: () => setFont("inter"),
        value: "inter",
    },
    {
        title: "Noto Serif",
        description: "Classic and elegant for timeless feel.",
        action: () => setFont("noto"),
        value: "noto",
    },
    {
        title: "Source Code",
        description: "Code-like, great for technical vibe.",
        action: () => setFont("source"),
        value: "source",
    },
];
