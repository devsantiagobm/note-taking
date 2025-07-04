"use client";

import "./header.component.scss"
import { RootState } from "@/stores/store";

import { Icon } from "@/system-design/atoms"
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/stores/notes/notes.slice";
import { Settings } from "@/components";
import { motion } from "motion/react";
import { HiOutlineMenuAlt3 as MenuIcon } from "react-icons/hi";
import { toggleMenu } from "@/stores/responsive/responsive.slice";


export function Header() {
    const filters = useSelector((store: RootState) => store.notes.filters)
    const title = filters.archiveds ? "Archived Notes" : "All Notes"
    const tag = filters.tag ? ` - ${filters.tag}` : ""
    const dispatch = useDispatch()


    return (
        <header className="header">

            <motion.h1
                key={title + tag}
                className="header__title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                >
                {title}{tag}
            </motion.h1>

            <div className="header__container">
                <label className="header__label" htmlFor="search">
                    <Icon icon={SearchIcon}></Icon>
                    <input value={filters.search ?? ""} onInput={(e) => dispatch(setSearch(e.currentTarget.value))} className="header__input" id="search" placeholder="Search by title, content, or tags..." type="text" />
                </label>

                <div className="header__buttons">
                    <Settings />

                    <button className="header__button" onClick={() => dispatch(toggleMenu())}>
                        <Icon icon={MenuIcon} size={20}></Icon>
                    </button>
                </div>
            </div>
        </header>
    )
}