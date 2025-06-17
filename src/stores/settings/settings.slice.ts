import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type ThemeMode = "light" | "dark";
export type FontFamily = "inter" | "noto" | "source";

interface SettingsState {
    theme: ThemeMode;
    font: FontFamily;
}

const initialState: SettingsState = {
    theme: (Cookies.get("theme") as ThemeMode) ?? "dark",
    font: (Cookies.get("font") as FontFamily) ?? "inter",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeMode>) {
            state.theme = action.payload;
            document.documentElement.setAttribute("data-theme", state.theme);
            Cookies.set("theme", state.theme, { expires: 365 });
        },
        setFont(state, action: PayloadAction<FontFamily>) {
            state.font = action.payload;
            document.documentElement.classList.remove("font-inter", "font-noto", "font-source");
            document.documentElement.classList.add(`font-${action.payload}`);
            Cookies.set("font", state.font, { expires: 365 });
        }
    },
});

export const { setTheme, setFont } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
