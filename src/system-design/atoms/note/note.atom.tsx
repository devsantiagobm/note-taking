import { useDispatch, useSelector } from "react-redux"
import "./note.atom.scss"
import { selectNote } from "@/stores/notes/notes.slice"
import { RootState } from "@/stores/store"
import { unixFormatter } from "@/utils/unix-formatter.util"

interface Props {
    note: Note
}

export function Note({ note }: Props) {
    const dispatch = useDispatch()
    const currentNote = useSelector((store: RootState) => store.notes.currentNote)
    const { title, tags, createdAt } = note
    const date = unixFormatter( new Date(createdAt))

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

            <span className="note__date">{date}</span>
        </article>
    )
}