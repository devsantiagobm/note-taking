"use client";

import "./notes.scss"

import { Button, Note } from "@/system-design/atoms";
import { NoteActions, NoteDetail } from "@/system-design/molecules";
import { FaPlus as NewIcon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentNote } from "@/stores/notes/notes.slice";
import { visibleNotesSelector } from "@/stores/notes/notes.selector";
import { AnimatePresence, motion } from "motion/react";

const AnimatedNote = motion(Note)

export default function Notes() {
    const visibleNotes = useSelector(visibleNotesSelector)
    const dispatch = useDispatch()

    return (
        <main className="notes">
            <section className="notes__column-list">

                <Button variant="action" alignment="center" onClick={() => dispatch(clearCurrentNote())}>
                    <NewIcon size={12} />
                    <span>Create New Note</span>
                </Button>

                {/* // TODO MENSAJE DDE CUANDO NO HAY NOTAS */}

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

            </section>

            <section className="notes__column-note">
                <NoteDetail />
            </section>
            <section className="notes__column-actions">
                <NoteActions />
            </section>
        </main >
    );
}
