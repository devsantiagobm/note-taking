// localStorage.middleware.ts
import { Middleware } from '@reduxjs/toolkit';

export const notesMiddleware: Middleware = store => next => action => {
    const result = next(action);

    if (typeof window !== "undefined") {
        const notes = store.getState().notes.notes;
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    return result;
};
