import "./note-actions.component.scss"
import { RootState } from "@/stores/store";
import { setModal } from "@/stores/notes/notes.slice";

import { Button, Icon } from "@/system-design/atoms"
import { MdOutlineArchive as ArchivedIcon } from "react-icons/md";
import { TbTrash as DeleteIcon } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";


export function NoteActions() {
    const dispatch = useDispatch()
    const selectedNote = useSelector((store: RootState) => store.notes.currentNote)
    const archiveNoteTitle = selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"

    return (
        <Fragment>

            <AnimatePresence>
                {
                    selectedNote && (
                        <motion.div className="note-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <Button variant="outline" onClick={() => dispatch(setModal("archive"))} >
                                <Icon icon={ArchivedIcon} />
                                <span>{archiveNoteTitle}</span>
                            </Button>
                            <Button variant="outline" onClick={() => dispatch(setModal("delete"))}>
                                <Icon icon={DeleteIcon} />
                                <span>Delete Note</span>
                            </Button>
                        </motion.div>
                    )
                }
            </AnimatePresence>


        </Fragment>
    )
}