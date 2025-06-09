import "./note-actions.molecule.scss"

import { Button, Icon } from "@/system-design/atoms"
import { HiOutlineSaveAs as ArchivedIcon } from "react-icons/hi";
import { TbTrash as DeleteIcon} from "react-icons/tb";

export function NoteActions() {
    return (
        <div className="note-actions">
            <Button variant="outline">
                <Icon icon={ArchivedIcon} />
                <span>Archive Note</span>
            </Button>
            <Button variant="outline">
                <Icon icon={DeleteIcon} />
                <span>Delete Note</span>
            </Button>
        </div>
    )
}