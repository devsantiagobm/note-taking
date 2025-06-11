import "./note-actions.molecule.scss"
import { deleteNote, toggleArchiveNote } from "@/app/(notes)/state/notes.slice";

import { Button, Icon } from "@/system-design/atoms"
import { HiOutlineSaveAs as ArchivedIcon } from "react-icons/hi";
import { TbTrash as DeleteIcon } from "react-icons/tb";
import { useDispatch } from "react-redux";


export function NoteActions() {
    const dispatch = useDispatch()

    return (
        <div className="note-actions">
            <Button variant="outline" onClick={() => dispatch(toggleArchiveNote())} >
                <Icon icon={ArchivedIcon} />
                <span>Archive Note</span>
            </Button>
            <Button variant="outline" onClick={() => dispatch(deleteNote())}>
                <Icon icon={DeleteIcon} />
                <span>Delete Note</span>
            </Button>
        </div>
    )
}