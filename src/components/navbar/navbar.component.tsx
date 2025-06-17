"use client";

import "./navbar.component.scss"

import { LuTag as Tag } from "react-icons/lu";
import { IoIosArrowForward as RightArrow } from "react-icons/io";
import { Button, Divider, Icon } from "@/system-design/atoms";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { tagsSelector } from "@/stores/notes/notes.selector";
import { setTag } from "@/stores/notes/notes.slice";
import { AnimatePresence, motion } from "motion/react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { toggleMenu } from "@/stores/responsive/responsive.slice";
import { navbarData } from "@/utils/navbar.data";


export function Navbar() {
    const dispatch = useDispatch()
    const { filters, theme, isMenuOpen } = useSelector((state: RootState) => ({
        filters: state.notes.filters,
        theme: state.settings.theme,
        isMenuOpen: state.responsive.isMenuOpen
    }));
    const tags = useSelector(tagsSelector)


    return (
        <nav className={`navbar ${isMenuOpen && "navbar--open"}`}>
            <picture className="navbar__picture">
                <img src={`/logos/logo-${theme}.svg`} alt="NotesTask Logo" />

                <button className="navbar__close-button" onClick={() => dispatch(toggleMenu())}>
                    <Icon icon={CloseIcon} size={20}/>
                </button>
            </picture>

            <ul className="navbar__list">
                {
                    navbarData.map(({ name, action, icon, conditionToBeActive }) => {
                        const tabIsActive = filters.archiveds === conditionToBeActive

                        return (
                            <li key={name}>
                                <button onClick={() => dispatch(action())} className={`navbar__link ${tabIsActive && "navbar__link--active"}`} >
                                    <Icon icon={icon} size={16} className="navbar__link-icon" />
                                    <span>{name}</span>

                                    <div className="navbar__link-arrow">
                                        <Icon icon={RightArrow} size={14} />
                                    </div>
                                </button>
                            </li>

                        )
                    })
                }
            </ul>

            <Divider marginTop={16} marginBottom={16} />


            <span className="navbar__tag-title">Tags</span>
            <ul className="navbar__list navbar__list--tags">


                <AnimatePresence initial={false}>
                    {
                        tags.map((tag) => {
                            const isActive = filters.tag === tag && "navbar__link--active"
                            return (
                                <motion.li key={tag}
                                    initial={{ opacity: 0, y: 0, height: 0 }}
                                    animate={{ opacity: 1,y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                    layout
                                >
                                    <button className={`navbar__link navbar__link--tags ${isActive}`} onClick={() => dispatch(setTag(isActive ? null : tag))}>
                                        <Icon icon={Tag} size={16} />
                                        <span className="navbar__link-text">{tag}</span>
                                    </button>
                                </motion.li>
                            )
                        })
                    }
                </AnimatePresence>
            </ul>


        </nav>
    )
}

