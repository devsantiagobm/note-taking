import { BiHomeAlt as HomeIcon } from "react-icons/bi";
import { HiOutlineSaveAs as ArchivedIcon } from "react-icons/hi";
import { IconType } from "react-icons"

interface NavbarItem {
    name: string
    path: string
    icon: IconType
}

export const navbarData: NavbarItem[] = [
    { name: "All Notes", path: "/", icon: HomeIcon },
    { name: "Archived", path: "/archived", icon: ArchivedIcon },
]