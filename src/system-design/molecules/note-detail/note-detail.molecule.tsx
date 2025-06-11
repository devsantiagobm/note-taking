"use client";

import "./note-detail.molecule.scss"
import { Button, Divider, Icon } from "@/system-design/atoms"
import { LuTag as TagIcon } from "react-icons/lu";
import { GoClock as ClockIcon } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentNote, createNote, updateNote } from "@/app/(notes)/state/notes.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "@/stores/notes.store";
import { useSyncForm } from "./hooks/use-sync-form";
import { Inputs } from "./types/inputs";
import { isCreatingNoteSelector } from "@/app/(notes)/state/notes.selector";


export function NoteDetail() {
    const dispatch = useDispatch()
    const selectedNote = useSelector((store: RootState) => store.notes.currentNote)
    const isCreatingNote = useSelector(isCreatingNoteSelector)
    const { handleSubmit, register, formState: { errors }, reset, } = useForm<Inputs>()
    useSyncForm({ reset, selectedNote })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const tags = data.tags.split(",")

        if (isCreatingNote) {
            dispatch(createNote({ ...data, tags }))
        }

        if (!isCreatingNote && selectedNote) {
            dispatch(updateNote({ ...data, tags, id: selectedNote.id }))
        }


        dispatch(clearCurrentNote())
        reset()
    }

    return (
        <form className="note-detail" onSubmit={handleSubmit(onSubmit)}>
            <label className="note-detail__input-label">
                <textarea className={`note-detail__input ${errors.title && "note-detail__input--error"}`} placeholder="Enter a title..." spellCheck="false" {...register("title", { required: true })} />
            </label>

            <ul className="note-detail__row-list">
                <li className="note-detail__row">
                    <label className="note-detail__label">
                        <Icon icon={TagIcon} size={14} />
                        <span className="note-detail__label-text">Tags</span>
                    </label>
                    {/* //TODO VALIDAR QUE NO SE PONGAN TAGS IGUALES, tambien validar espacios con .trim */}
                    <input className={`note-detail__input note-detail__input--tags ${errors.tags && "note-detail__input--error"}`} type="text"
                        placeholder="Add tags separated by commas (e.g. Work, Planning)" spellCheck="false"
                        {...register("tags", { required: true, validate: (value) => value.length > 10 && "asdad" })}
                    />
                </li>

                <li className="note-detail__row">
                    <label className="note-detail__label">
                        <Icon icon={ClockIcon} size={14} />
                        <span className="note-detail__label-text">Last edited</span>
                    </label>

                    <span className="note-detail__last-edited-value">29 Oct 2024</span>
                </li>
            </ul>

            <Divider className="note-detail__divider" marginTop={24} marginBottom={16} />

            <label className="note-detail__input-label">
                <textarea className={`note-detail__input note-detail__input--description ${errors.description && "note-detail__input--error"}`}
                    {...register("description", { required: true })}
                    placeholder="Start typing your note here..." spellCheck="false"
                />
            </label>

            <Divider className="note-detail__divider" marginTop={16} marginBottom={16} />

            <div className="note-detail__buttons">
                <Button variant="action" fitContent>{isCreatingNote ? "Save Note" : "Update Note"}</Button>
                <Button variant="neutral" fitContent type="button">Cancel</Button>
            </div>
        </form >
    )
}