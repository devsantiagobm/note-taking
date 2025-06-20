import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface Filters {
    archiveds: boolean;
    tag: string | null;
    search: string | null;
}

export type ModalKey = "archive" | "delete" | null;


export interface NotesState {
    notes: Note[];
    currentNote: Note | null;
    filters: Filters;
    isCreatingNote: boolean;
    modal: ModalKey;
}

const initialState: NotesState = {
    notes: [],
    currentNote: null,
    filters: {
        archiveds: false,
        tag: null,
        search: null
    },
    isCreatingNote: false,
    modal: null
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        getNotes(state) {
            try {
                const notes = localStorage.getItem("notes")
                console.log({ notes });
                state.notes = notes ? JSON.parse(notes) : []
            } catch (error) {
                state.notes = []
            }
        },
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
            toast.success("Note deleted successfully.");
            state.notes = state.notes.filter(note => note.id !== state.currentNote?.id)
            state.currentNote = null
        },
        toggleArchiveNote: (state) => {
            if (!state.currentNote?.id) return;
            const note = state.notes.find(n => n.id === state?.currentNote?.id)

            if (note) {
                note.isArchived = !note.isArchived;
                state.currentNote.isArchived = note.isArchived
                state.filters.archiveds = note.isArchived
                toast.success(note.isArchived ? "Note archived successfully." : "Note unarchived.");
            }
        },
        selectNote: (state, action: PayloadAction<string>) => {
            const currentNote = state.notes.find(note => note.id === action.payload)
            if (currentNote) state.currentNote = currentNote
        },
        clearCurrentNote: (state, action: PayloadAction<{ isCreatingNote: boolean }>) => {
            state.currentNote = null
            state.isCreatingNote = action.payload.isCreatingNote
        },
        setArchivedFilter: (state, action: PayloadAction<boolean>) => {
            state.filters.archiveds = action.payload;
        },
        setTag: (state, action: PayloadAction<string | null>) => {
            state.filters.search = null
            state.filters.tag = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.filters.tag = null
            state.filters.search = action.payload
        },
        setModal: (state, action: PayloadAction<ModalKey>) => {
            state.modal = action.payload
        },
    }
})

export const { setSearch, setTag, createNote, selectNote, clearCurrentNote, updateNote, deleteNote, toggleArchiveNote, setArchivedFilter, setModal, getNotes } = notesSlice.actions
export const notesReducer = notesSlice.reducer