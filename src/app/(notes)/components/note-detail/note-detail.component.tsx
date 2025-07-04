"use client";

import "./note-detail.component.scss"
import { Button, Divider, Icon } from "@/system-design/atoms"
import { LuTag as TagIcon } from "react-icons/lu";
import { GoClock as ClockIcon } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentNote, createNote, setModal, updateNote } from "@/stores/notes/notes.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "@/stores/store";
import { useSyncForm } from "./hooks/use-sync-form";
import { Inputs } from "./types/inputs";
import { isCreatingNoteSelector } from "@/stores/notes/notes.selector";
import { unixFormatter } from "@/utils/unix-formatter.util";
import { Fragment, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { IoIosArrowBack as BackIcon } from "react-icons/io";
import { MdOutlineArchive as ArchivedIcon } from "react-icons/md";
import { TbTrash as DeleteIcon } from "react-icons/tb";


export function NoteDetail() {
    const dispatch = useDispatch()
    const { selectedNote, isCreatingNote } = useSelector((store: RootState) => ({ selectedNote: store.notes.currentNote, isCreatingNote: store.notes.isCreatingNote }))
    const isCreation = useSelector(isCreatingNoteSelector)
    const { handleSubmit, register, formState: { errors }, reset, } = useForm<Inputs>()
    useSyncForm({ reset, selectedNote })
    const lastEdited = unixFormatter(selectedNote?.lastEdited ? new Date(selectedNote.lastEdited) : null)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const tags = data.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

        if (isCreation) {
            dispatch(createNote({ ...data, tags }));
            toast.success("Note created successfully!");
        }

        if (!isCreation && selectedNote) {
            dispatch(updateNote({ ...data, tags, id: selectedNote.id }));
            toast.success("Note updated successfully!");
        }

        dispatch(clearCurrentNote({ isCreatingNote: false }))
        reset()

    }

    useEffect(() => {
        if (errors.tags && errors?.tags?.type !== "required") {
            toast.error(errors.tags.message)
        }
    }, [errors.tags])


    return (
        <form className={`note-detail ${(selectedNote || isCreatingNote) && "note-detail--open"}`} onSubmit={handleSubmit(onSubmit)}>

            <section className="note-detail__top">
                <button className="note-detail__back" type="button" onClick={() => dispatch(clearCurrentNote({ isCreatingNote: false }))}>
                    <BackIcon size={20} />
                    Go Back
                </button>

                <div className="note-detail__top-content">
                    {
                        !isCreation && <Fragment>
                            <button type="button" className="note-detail__action" onClick={() => dispatch(setModal("delete"))}>
                                <DeleteIcon size={20} />
                            </button>
                            <button type="button" className="note-detail__action" onClick={() => dispatch(setModal("archive"))}>
                                <ArchivedIcon size={20} />
                            </button>
                        </Fragment>
                    }
                    <button className="note-detail__action note-detail__action--main">
                        {isCreation ? "Save Note" : "Update Note"}
                    </button>
                </div>
            </section>

            <label className="note-detail__input-label">
                <textarea className={`note-detail__input ${errors.title && "note-detail__input--error"}`} placeholder="Enter a title..." spellCheck="false" {...register("title", { required: true })} />
            </label>

            <ul className="note-detail__row-list">
                <li className="note-detail__row">
                    <label className="note-detail__label">
                        <Icon icon={TagIcon} size={14} />
                        <span className="note-detail__label-text">Tags</span>
                    </label>

                    <input
                        className={`note-detail__input note-detail__input--tags ${errors.tags && "note-detail__input--error"}`}
                        type="text"
                        placeholder="Add tags separated by commas (e.g. Work, Planning)"
                        spellCheck="false"
                        {...register("tags", {
                            required: true,
                            validate: (value) => {
                                const rawTags = value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
                                const uniqueTags = new Set(rawTags);

                                if (rawTags.length === 0) return "Please enter at least one tag.";
                                if (rawTags.length > 10) return "You can enter up to 10 tags.";
                                if (uniqueTags.size !== rawTags.length) return "Tags must be unique.";
                                if (rawTags.some(tag => tag.length > 20)) return "Each tag must be 20 characters or fewer.";

                                return true;
                            }
                        })}
                    />

                </li>

                <li className="note-detail__row">
                    <label className="note-detail__label">
                        <Icon icon={ClockIcon} size={14} />
                        <span className="note-detail__label-text">Last edited</span>
                    </label>
                    <span className="note-detail__last-edited-value">{lastEdited}</span>
                </li>
            </ul>

            <Divider className="note-detail__divider" marginTop={24} marginBottom={16} />

            <label className="note-detail__input-label">
                <textarea className={`note-detail__input note-detail__input--description ${errors.description && "note-detail__input--error"}`}
                    {...register("description", { required: true })}
                    placeholder="Start typing your note here..." spellCheck="false"
                />
            </label>

            <Divider className="note-detail__divider note-detail__divider--bottom" marginTop={16} marginBottom={16} />

            <div className="note-detail__buttons">
                <Button variant="action" fitContent>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isCreation ? "save" : "update"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isCreation ? "Save Note" : "Update Note"}
                        </motion.span>
                    </AnimatePresence>
                </Button>

                <AnimatePresence>
                    {
                        selectedNote && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Button variant="neutral" fitContent type="button" onClick={() => dispatch(clearCurrentNote({ isCreatingNote: false }))}>Cancel</Button>
                            </motion.div>
                        )
                    }
                </AnimatePresence>

            </div>
        </form >
    )
}

