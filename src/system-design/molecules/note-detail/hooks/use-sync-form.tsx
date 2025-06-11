import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { Inputs } from "../types/inputs";

interface Props {
    reset: UseFormReset<Inputs>;
    selectedNote: Note | null;
}

export function useSyncForm({ reset, selectedNote }: Props) {
    useEffect(() => {
        if (!selectedNote) {
            reset({ title: "", tags: "", description: "" })
            return;
        }

        const { title, tags, description } = selectedNote

        reset({title, tags: tags.join(","), description})
    }, [selectedNote])
}