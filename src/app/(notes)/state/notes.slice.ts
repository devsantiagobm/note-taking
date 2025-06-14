import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { getNotes } from "./notes.utils";

interface Filters {
    archiveds: boolean;
    tag: string | null;
    search: string | null;
}

export interface NotesState {
    notes: Note[];
    currentNote: Note | null;
    filters: Filters;
}

const initialState: NotesState = {
    notes: getNotes(),
    currentNote: null,
    filters: {
        archiveds: false,
        tag: null,
        search: null
    }
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote: (state, action: PayloadAction<Omit<Note, "id" | "createdAt" | "lastEdited" | "isArchived">>) => {
            state.filters = initialState.filters
            
            const now = Date.now();
            const note = {
                ...action.payload,
                id: nanoid(),
                createdAt: now,
                lastEdited: now,
                isArchived: false
            }

            state.notes = [note, ...state.notes];
        },
        updateNote: (state, action: PayloadAction<Omit<Note, "createdAt" | "lastEdited" | "isArchived">>) => {
            const note = state.notes.find(n => n.id === action.payload.id)
            if (note) {
                Object.assign(note, action.payload);
                note.lastEdited = Date.now();
                state.filters.archiveds = note.isArchived
            }
        },
        deleteNote: (state) => {
            if (!state.currentNote?.id) return;
            state.notes = state.notes.filter(note => note.id !== state.currentNote?.id)
            state.currentNote = null
        },
        toggleArchiveNote: (state) => {
            if (!state.currentNote?.id) return;
            const note = state.notes.find(n => n.id === state?.currentNote?.id)            

            if (note) {
                note.isArchived = !note.isArchived;
                state.filters.archiveds = note.isArchived
            }
        },
        selectNote: (state, action: PayloadAction<string>) => {
            const currentNote = state.notes.find(note => note.id === action.payload)
            if (currentNote) state.currentNote = currentNote
        },
        clearCurrentNote: (state) => {
            state.currentNote = null
        },
        setArchivedFilter: (state, action: PayloadAction<boolean>) => {
            state.filters.archiveds = action.payload;
        },
        setTag: (state, action: PayloadAction<string | null>) => {
            state.filters.search = null
            state.filters.tag = action.payload
        },
        setSearch: (state, action: PayloadAction<string>)=> {
            state.filters.tag = null
            state.filters.search = action.payload
        }
    }
})

export const { setSearch, setTag, createNote, selectNote, clearCurrentNote, updateNote, deleteNote, toggleArchiveNote, setArchivedFilter } = notesSlice.actions
export const notesReducer = notesSlice.reducer