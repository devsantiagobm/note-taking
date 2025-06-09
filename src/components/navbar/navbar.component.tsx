"use client";

import "./navbar.component.scss"
import Link from "next/link"
import { usePathname } from 'next/navigation';


import { LuTag as Tag } from "react-icons/lu";
import { IoIosArrowForward as RightArrow} from "react-icons/io";
import { Divider, Icon } from "@/system-design/atoms";
import { navbarData } from "./navbar.data";

export function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="navbar">
            <picture className="navbar__picture">
                <img src="/logos/logo.svg" alt="NotesTask Logo" />
            </picture>

            <ul className="navbar__list">
                {
                    navbarData.map(({ name, path, icon }) => {
                        const tabIsActive = pathname === path
                        return (
                            <li key={name}>
                                <Link className={`navbar__link ${tabIsActive && "navbar__link--active"}`} href={path}>
                                    <Icon icon={icon} size={16} className="navbar__link-icon"/>
                                    <span>{name}</span>

                                    <div className="navbar__link-arrow">
                                        <Icon icon={RightArrow} size={14}/>
                                    </div>
                                </Link>
                            </li>

                        )
                    })
                }
            </ul>

            <Divider marginTop={16} marginBottom={16} />


            <span className="navbar__tag-title">Tags</span>
            <ul className="navbar__list navbar__list--tags">
                {/* TODO PONER ESTADO ACTIVO EN LOS LINKS */}
                <li>
                    <Link className="navbar__link" href={"/"}>
                        <Icon icon={Tag} size={16} />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link className="navbar__link" href={"/"}>
                        <Icon icon={Tag} size={16} />
                        <span>Work</span>
                    </Link>
                </li>
                <li>
                    <Link className="navbar__link" href={"/"}>
                        <Icon icon={Tag} size={16} />
                        <span>School</span>
                    </Link>
                </li>
                <li>
                    <Link className="navbar__link" href={"/"}>
                        <Icon icon={Tag} size={16} />
                        <span>University</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}