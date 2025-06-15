import { BiHomeAlt as HomeIcon } from "react-icons/bi";
import { HiOutlineSaveAs as ArchivedIcon } from "react-icons/hi";
import { IconType } from "react-icons"
import { setArchivedFilter } from "@/stores/notes/notes.slice";

interface NavbarItem {
    name: string
    action: Function;
    icon: IconType;
    conditionToBeActive: boolean;
}

export const navbarData: NavbarItem[] = [
    { name: "All Notes", action: () => setArchivedFilter(false), icon: HomeIcon, conditionToBeActive: false },
    { name: "Archived", action: () => setArchivedFilter(true), icon: ArchivedIcon, conditionToBeActive: true },
]