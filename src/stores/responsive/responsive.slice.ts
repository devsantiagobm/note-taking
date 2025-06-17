import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    isMenuOpen: boolean
}

const initialState: State = {
    isMenuOpen: false
}

const responsiveSlice = createSlice({
    name: "responsive",
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        }
    },
});

export const { toggleMenu } = responsiveSlice.actions;

export const responsiveReducer = responsiveSlice.reducer;
