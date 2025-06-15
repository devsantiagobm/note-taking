export function getNotes(): Array<Note> {
    if (typeof localStorage === "undefined") return []

    try {
        const notes = localStorage.getItem("notes")
        return notes ? JSON.parse(notes) : []
    } catch (error) {
        return []
    }
}