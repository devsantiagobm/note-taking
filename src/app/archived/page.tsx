import "@/styles/shared/notes.scss"
import { Button } from "@/system-design/atoms";
import { FaPlus as NewIcon} from "react-icons/fa6";

export default function Notes() {
    return (
        <main className="notes">
            <section className="notes__column-list">
                <Button type="action" alignment="center">
                    <NewIcon size={12}/>
                    <span>Create New Note</span>
                </Button>
            </section>
            <section className="notes__column-note">
                asdad
            </section>
            <section className="notes__column-actions">
                asdad
            </section>
        </main>
    );
}
