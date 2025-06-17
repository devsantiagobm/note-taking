import { ModalKey, setModal, toggleArchiveNote } from "@/stores/notes/notes.slice";
import { RootState } from "@/stores/store";
import { Button } from "@/system-design/atoms";
import { Modal } from "@/system-design/molecules";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineArchive as ArchivedIcon } from "react-icons/md";

export function ArchiveNoteModal() {
    const { selectedNote, modal } = useSelector((store: RootState) => ({ selectedNote: store.notes.currentNote, modal: store.notes.modal }))
    const archiveNoteTitle = selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"
    const dispatch = useDispatch()


    return (
        <Modal
            title={archiveNoteTitle}
            description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
            isVisible={modal === "archive"}
            setIsVisible={(param) => dispatch(setModal(param as ModalKey))}
            icon={ArchivedIcon}
            buttons={
                [
                    <Button variant="neutral" fitContent onClick={() => dispatch(setModal(null))}>Cancel</Button>,
                    <Button variant="action" fitContent onClick={() => {
                        dispatch(toggleArchiveNote());
                        dispatch(setModal(null))
                    }}>{archiveNoteTitle}</Button>
                ]
            }
        />
    )
}