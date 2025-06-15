"use client";

import "./navbar.component.scss"
import Link from "next/link"


import { LuTag as Tag } from "react-icons/lu";
import { IoIosArrowForward as RightArrow } from "react-icons/io";
import { Divider, Icon } from "@/system-design/atoms";
import { navbarData } from "./navbar.data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { tagsSelector } from "@/stores/notes/notes.selector";
import { setTag } from "@/stores/notes/notes.slice";

export function Navbar() {
    const dispatch = useDispatch()
    const filters = useSelector((store: RootState) => store.notes.filters)
    const tags = useSelector(tagsSelector)


    return (
        <nav className="navbar">
            <picture className="navbar__picture">
                <img src="/logos/logo.svg" alt="NotesTask Logo" />
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
                {
                    tags.map((tag) => {
                        const isActive = filters.tag === tag && "navbar__link--active"
                        return (
                            <li key={tag}>
                                <button className={`navbar__link navbar__link--tags ${isActive}`} onClick={() => dispatch(setTag(isActive ? null : tag))}>
                                    <Icon icon={Tag} size={16} />
                                    <span className="navbar__link-text">{tag}</span>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}