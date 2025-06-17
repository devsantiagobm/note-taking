import { deleteNote, ModalKey, setModal, toggleArchiveNote } from "@/stores/notes/notes.slice";
import { RootState } from "@/stores/store";
import { Button } from "@/system-design/atoms";
import { Modal } from "@/system-design/molecules";
import { useDispatch, useSelector } from "react-redux";
import { TbTrash as DeleteIcon } from "react-icons/tb";

export function DeleteNoteModal() {
    const modal = useSelector((store: RootState) => store.notes.modal)
    const dispatch = useDispatch()


    return (
        <Modal
            title={"Delete Note"}
            description="Are you sure you want to permanently delete this note? This action cannot be undone."
            isVisible={modal === "delete"}
            setIsVisible={(param) => dispatch(setModal(param as ModalKey))}
            icon={DeleteIcon}
            buttons={
                [
                    <Button variant="neutral" fitContent onClick={() => dispatch(setModal(null))}>Cancel</Button>,
                    <Button variant="alert" fitContent onClick={() => {
                        dispatch(deleteNote()); 
                        dispatch(setModal(null))
                    }}>Delete Note</Button>
                ]
            }
        />
    )
}