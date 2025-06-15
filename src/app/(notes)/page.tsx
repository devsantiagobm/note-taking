"use client";

import "./notes.scss"

import { Button, Note } from "@/system-design/atoms";
import { NoteActions, NoteDetail } from "@/system-design/molecules";
import { FaPlus as NewIcon} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentNote } from "@/stores/notes/notes.slice";
import { visibleNotesSelector } from "@/stores/notes/notes.selector";


export default function Notes() {
    const visibleNotes = useSelector(visibleNotesSelector)
    const dispatch = useDispatch()

    return (
        <main className="notes">
            <section className="notes__column-list">
                
                <Button variant="action" alignment="center" onClick={() => dispatch(clearCurrentNote())}>
                    <NewIcon size={12}/>
                    <span>Create New Note</span>
                </Button>

                {/* // TODO MENSAJE DDE CUANDO NO HAY NOTAS */}

                {
                    visibleNotes.map((note) => (
                        <Note note={note} key={note.id} />
                    ))
                }
            </section>

            <section className="notes__column-note">
                <NoteDetail />
            </section>
            <section className="notes__column-actions">
                <NoteActions />
            </section>
        </main>
    );
}
