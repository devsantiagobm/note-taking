"use client";

import "./mobile-header.component.scss"
import { RootState } from "@/stores/store";

import { Divider, Icon } from "@/system-design/atoms"
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setTag } from "@/stores/notes/notes.slice";
import { Settings } from "@/components";
import { AnimatePresence, motion } from "motion/react";
import { navbarData } from "@/utils/navbar.data";
import { tagsSelector } from "@/stores/notes/notes.selector";

export function MobileHeader() {
    const dispatch = useDispatch()
    const filters = useSelector((store: RootState) => store.notes.filters)
    const title = filters.archiveds ? "Archived Notes" : "All Notes"
    const tag = filters.tag ? ` - ${filters.tag}` : ""
    const tags = useSelector(tagsSelector)


    return (
        <header className="mobile-header">
            <section className="mobile-header__top" role="banner" aria-label="Header">
                <picture>
                    <img src="/logos/favicon.svg" alt="NoteTask Logo" width={24} height={24} />
                </picture>

                <motion.h1 className="mobile-header__title" key={title + tag} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {title}{tag}
                </motion.h1>

                <Settings />
            </section>

            <nav className="mobile-header__nav">
                {
                    navbarData.map(({ name, action, icon, conditionToBeActive }) => {
                        const tabIsActive = filters.archiveds === conditionToBeActive

                        return (
                            <button key={name} onClick={() => dispatch(action())} className={`mobile-header__link ${tabIsActive && "mobile-header__link--active"}`} >
                                <Icon icon={icon} size={16} className="mobile-header__link-icon" />
                                <span>{name}</span>
                            </button>

                        )
                    })
                }
            </nav>

            <div className="mobile-header__tags">
                <AnimatePresence initial={false}>
                    {
                        tags.map((tag) => {
                            const isActive = filters.tag === tag && "mobile-header__tag--active"

                            return (
                                <motion.button
                                    key={tag}
                                    initial={{ opacity: 0, y: 0, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                    layout
                                    className={`mobile-header__tag mobile-header__tag--tags ${isActive}`}
                                    onClick={() => dispatch(setTag(isActive ? null : tag))}
                                >
                                    <span className="mobile-header__tag-text">{tag}</span>
                                </motion.button>

                            )
                        })
                    }
                </AnimatePresence>
            </div>

            <div>
                <Divider marginTop={16} marginBottom={16} />
            </div>

            <div>

                <label className="mobile-header__label" htmlFor="search">
                    <Icon icon={SearchIcon}></Icon>
                    <input value={filters.search ?? ""} onInput={(e) => dispatch(setSearch(e.currentTarget.value))} className="mobile-header__input" id="search" placeholder="Search by title, content, or tags..." type="text" />
                </label>
            </div>

        </header>
    )
}