import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "@/stores/notes/notes.slice";
import { settingsReducer } from "@/stores/settings/settings.slice";
import { notesMiddleware } from "@/stores/notes/notes.middleware";
import { responsiveReducer } from "@/stores/responsive/responsive.slice";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        settings: settingsReducer,
        responsive: responsiveReducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesMiddleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;