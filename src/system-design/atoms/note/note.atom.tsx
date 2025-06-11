import { useDispatch, useSelector } from "react-redux"
import "./note.atom.scss"
import { selectNote } from "@/app/(notes)/state/notes.slice"
import { RootState } from "@/stores/notes.store"

interface Props {
    note: Note
}

export function Note({ note }: Props) {
    const dispatch = useDispatch()
    const currentNote = useSelector((store: RootState) => store.notes.currentNote)
    const { title, tags, createdAt } = note


    function handleOnClick() {
        dispatch(selectNote(note.id))
    }

    return (
        <article className={`note ${currentNote?.id === note.id && "note--active"}`} onClick={handleOnClick}>
            <h2 className="note__title">{title}</h2>
            <ul className="note__tags">
                {
                    tags.map((tag) => (
                        <li key={tag} className="note__tag">{tag}</li>
                    ))
                }
            </ul>

            <span className="note__date">{createdAt}</span>
        </article>
    )
}