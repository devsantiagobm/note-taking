import { RootState } from "@/stores/notes.store";
import "./note-actions.molecule.scss"
import { deleteNote, toggleArchiveNote } from "@/app/(notes)/state/notes.slice";

import { Button, Icon } from "@/system-design/atoms"
import { HiOutlineSaveAs as ArchivedIcon } from "react-icons/hi";
import { TbTrash as DeleteIcon } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";


export function NoteActions() {
    const dispatch = useDispatch()
    const selectedNote = useSelector((store: RootState) => store.notes.currentNote)

    //TODO MODALES DE CONFIRMACION

    return (
        <div className="note-actions">
            <Button variant="outline" onClick={() => dispatch(toggleArchiveNote())} >
                <Icon icon={ArchivedIcon} />
                <span>{selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"}</span>
            </Button>
            <Button variant="outline" onClick={() => dispatch(deleteNote())}>
                <Icon icon={DeleteIcon} />
                <span>Delete Note</span>
            </Button>
        </div>
    )
}