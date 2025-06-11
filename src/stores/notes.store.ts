import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "@/app/(notes)/state/notes.slice";
import { notesMiddleware } from "@/app/(notes)/state/notes.middleware";

export const store = configureStore({
    reducer: {
        notes: notesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesMiddleware)
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;