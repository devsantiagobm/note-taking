import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";
export type FontFamily = "inter" | "noto" | "source";

interface SettingsState {
    theme: ThemeMode;
    font: FontFamily;
}

//TODO ESTADO INICIAL SACARLO DE COOKIES

const initialState: SettingsState = {
    theme: "dark",
    font: "inter",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeMode>) {
            state.theme = action.payload;
            document.documentElement.setAttribute("data-theme", state.theme);
            localStorage.setItem("theme", state.theme);
        },
        setFont(state, action: PayloadAction<FontFamily>) {
            state.font = action.payload;
            document.documentElement.classList.remove("font-inter", "font-noto", "font-source");
            document.documentElement.classList.add(`font-${action.payload}`);
            localStorage.setItem("font", state.font);
        },
        initSettings(state) {
            const savedTheme = localStorage.getItem("theme") as ThemeMode;
            const savedFont = localStorage.getItem("font") as FontFamily;

            if (savedTheme) {
                state.theme = savedTheme;
                document.documentElement.setAttribute("data-theme", savedTheme);
            }

            if (savedFont) {
                state.font = savedFont;
                document.documentElement.style.setProperty("--app-font", savedFont);
            }
        }
    },
});

export const { setTheme, setFont, initSettings } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
