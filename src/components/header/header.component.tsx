import "./header.component.scss"

import { Icon } from "@/system-design/atoms"
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";

export function Header() {
    return (
        <header className="header">
            <h1 className="header__title">All Notes</h1>

            <div className="header__container">
                <label className="header__label" htmlFor="search">
                    <Icon icon={SearchIcon}></Icon>
                    <input className="header__input" id="search" placeholder="Search by title, content, or tags..." type="text" />
                </label>
                <Icon icon={SettingsIcon} />
            </div>
        </header>
    )
}