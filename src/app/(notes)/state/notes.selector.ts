import { RootState } from "@/stores/notes.store";
import { createSelector } from "@reduxjs/toolkit";

export const currentNote = (state: RootState) => state.notes.currentNote
export const notes = (state: RootState) => state.notes.notes

export const isCreatingNoteSelector = createSelector(
    [currentNote],
    (id) => !id
)

export const visibleNotesSelector = createSelector(
    [notes],
    (notes) => notes.filter(note => !note.isArchived)
)