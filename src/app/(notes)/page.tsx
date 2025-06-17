"use client";

import "./notes.scss"

import { Button, Note } from "@/system-design/atoms";
import { FaPlus as NewIcon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentNote, getNotes } from "@/stores/notes/notes.slice";
import { visibleNotesSelector } from "@/stores/notes/notes.selector";
import { AnimatePresence, motion } from "motion/react";
import { NoteActions } from "./components/note-actions/note-actions.component";
import { NoteDetail } from "./components/note-detail/note-detail.component";
import { ArchiveNoteModal } from "./components/archive-note-modal/archive-note-modal.component";
import { DeleteNoteModal } from "./components/delete-note-modal/delete-note-modal.component";
import { useEffect } from "react";

export default function Notes() {
    const visibleNotes = useSelector(visibleNotesSelector)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(getNotes()) }, [])

    return (
        <main className="notes">
            <section className="notes__column-list">

                <Button className="notes__create-button" variant="action" alignment="center" onClick={() => dispatch(clearCurrentNote({ isCreatingNote: true }))}>
                    <NewIcon className="notes__create-button-icon" />
                    <span className="notes__create-button-text">Create New Note</span>
                </Button>

                <div className="notes__list">

                    <AnimatePresence initial={false}>
                        {visibleNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                                layout
                            >
                                <Note note={note} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                </div>
            </section>

            <section className="notes__column-note">
                <NoteDetail />
            </section>
            <section className="notes__column-actions">
                <NoteActions />
            </section>

            <ArchiveNoteModal />
            <DeleteNoteModal />
        </main >
    );
}
