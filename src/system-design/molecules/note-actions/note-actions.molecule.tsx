import { RootState } from "@/stores/store";
import "./note-actions.molecule.scss"
import { deleteNote, toggleArchiveNote } from "@/stores/notes/notes.slice";

import { Button, Icon } from "@/system-design/atoms"
import { HiOutlineSaveAs as ArchivedIcon } from "react-icons/hi";
import { TbTrash as DeleteIcon } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";
import { Modal } from "../modal/modal.molecule";

type ModalKey = "archive" | "delete" | string;

export function NoteActions() {
    const dispatch = useDispatch()
    const selectedNote = useSelector((store: RootState) => store.notes.currentNote)
    const [modal, setModal] = useState<ModalKey | null>(null);
    const archiveNoteTitle = selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"

    return (
        <Fragment>

            <AnimatePresence>
                {
                    selectedNote && (
                        <motion.div className="note-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <Button variant="outline" onClick={() => setModal("archive")} >
                                <Icon icon={ArchivedIcon} />
                                <span>{archiveNoteTitle}</span>
                            </Button>
                            <Button variant="outline" onClick={() => setModal("delete")}>
                                <Icon icon={DeleteIcon} />
                                <span>Delete Note</span>
                            </Button>
                        </motion.div>
                    )
                }
            </AnimatePresence>

            <Modal
                title={archiveNoteTitle}
                description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                isVisible={modal === "archive"}
                setIsVisible={setModal}
                icon={ArchivedIcon}
                buttons={
                    [
                        <Button variant="neutral" fitContent onClick={() => setModal(null)}>Cancel</Button>,
                        <Button variant="action" fitContent onClick={() => { dispatch(toggleArchiveNote()); setModal(null) }}>{archiveNoteTitle}</Button>
                    ]
                }
            />
            <Modal
                title={"Delete Note"}
                description="Are you sure you want to permanently delete this note? This action cannot be undone."
                isVisible={modal === "delete"}
                setIsVisible={setModal}
                icon={DeleteIcon}
                buttons={
                    [
                        <Button variant="neutral" fitContent onClick={() => setModal(null)}>Cancel</Button>,
                        <Button variant="alert" fitContent onClick={() => { dispatch(deleteNote()); setModal(null) }}>Delete Note</Button>
                    ]
                }
            />

        </Fragment>
    )
}