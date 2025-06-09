import "@/styles/shared/notes.scss"
import { Button } from "@/system-design/atoms";
import { NoteActions, NoteDetail, NotesList } from "@/system-design/molecules";
import { FaPlus as NewIcon} from "react-icons/fa6";

export default function Notes() {
    return (
        <main className="notes">
            <section className="notes__column-list">
                
                <Button variant="action" alignment="center">
                    <NewIcon size={12}/>
                    <span>Create New Note</span>
                </Button>

                <NotesList />
            </section>

            <section className="notes__column-note">
                <NoteDetail />
            </section>
            <section className="notes__column-actions">
                <NoteActions />
            </section>
        </main>
    );
}
