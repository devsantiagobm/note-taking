import "./navbar.component.scss"
import { Icon } from "@/system-design/atoms/icon/icon.atom"
import Link from "next/link"

export function Navbar() {
    return (
        <nav className="navbar">
            <picture className="navbar__picture">
                <img src="/logos/logo.svg" alt="NotesTask Logo" />
            </picture>

            <ul className="navbar__list">
                <li>
                    <Link className="navbar__link" href={"/"}>
                        <Icon name="home"/> All Notes
                    </Link>
                </li>
                <li>
                    <Link className="navbar__link" href={"/"}>
                        Archived Notes
                    </Link>
                </li>
            </ul>
        </nav>
    )
}