import "./note.atom.scss"

interface Props {
    note: Note
}

export function Note({ note }: Props) {
    const { title, tags, createdAt } = note

    return (
        <article className="note">
            <h2 className="note__title">{title}</h2>
            <ul className="note__tags">
                {
                    tags.map((tag) => (
                        <li key={tag} className="note__tag">{tag}</li>
                    ))
                }
            </ul>

            <span className="note__date">29 Oct 2024</span>
        </article>
    )
}