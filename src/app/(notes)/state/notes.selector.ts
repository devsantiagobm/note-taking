import { RootState } from "@/stores/notes.store";
import { createSelector } from "@reduxjs/toolkit";

export const currentNote = (state: RootState) => state.notes.currentNote
export const filters = (state: RootState) => state.notes.filters
export const notes = (state: RootState) => state.notes.notes

export const isCreatingNoteSelector = createSelector(
    [currentNote],
    (id) => !id
)

export const visibleNotesSelector = createSelector([notes, filters],
    (notes, filters) => {
        const { search, archiveds, tag } = filters;

        const sortByLastEdited = (a: Note, b: Note) => b.lastEdited - a.lastEdited;

        if (search) {
            const parsedSearch = search?.toLowerCase();

            return notes
                .filter(note =>
                    note.isArchived === archiveds &&
                    (
                        note.title.toLowerCase().includes(parsedSearch) ||
                        note.description.toLowerCase().includes(parsedSearch) ||
                        note.tags.join(" ").toLowerCase().includes(parsedSearch)
                    )
                ).sort(sortByLastEdited);
        }

        if (tag) {
            return notes.filter(note => note.isArchived === archiveds && note.tags.includes(tag)).sort(sortByLastEdited);
        }

        return notes.filter(note => note.isArchived === archiveds).sort(sortByLastEdited);
    }
);


export const tagsSelector = createSelector([notes],
    (notes) => {
        const tags: Set<string> = new Set()
        for (const note of notes) {
            note.tags.forEach(tag => tags.add(tag))
        }
        return Array.from(tags);
    }
)