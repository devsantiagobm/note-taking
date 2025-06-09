import "./note-detail.molecule.scss"
import { Button, Divider, Icon } from "@/system-design/atoms"
import { LuTag as TagIcon } from "react-icons/lu";
import { GoClock as ClockIcon } from "react-icons/go";

export function NoteDetail() {
    return (
        <form className="note-detail">

            <label className="note-detail__input-label">
                <textarea className="note-detail__input" placeholder="Enter a title..." spellCheck="false" />
            </label>

            <ul className="note-detail__row-list">
                <li className="note-detail__row">
                    <label className="note-detail__label">
                        <Icon icon={TagIcon} size={14}/>
                        <span className="note-detail__label-text">Tags</span>
                    </label>

                    <input
                        className="note-detail__input note-detail__input--tags"
                        type="text"
                        placeholder="Enter a title..."
                        spellCheck="false"
                    />
                </li>

                <li className="note-detail__row">
                    <label className="note-detail__label">
                        <Icon icon={ClockIcon} size={14}/>
                        <span className="note-detail__label-text">Last edited</span>
                    </label>

                    <span className="note-detail__last-edited-value">29 Oct 2024</span>
                </li>
            </ul>

            <Divider className="note-detail__divider" marginTop={24} marginBottom={16} />

            <label className="note-detail__input-label">
                <textarea className="note-detail__input note-detail__input--description" placeholder="Start typing your note here..." spellCheck="false" />
            </label>

            <Divider className="note-detail__divider" marginTop={16} marginBottom={16} />

            <div className="note-detail__buttons">
                <Button variant="action" fitContent>Save Note</Button>
                <Button variant="neutral" fitContent type="button">Cancel</Button>
            </div>
        </form >
    )
}