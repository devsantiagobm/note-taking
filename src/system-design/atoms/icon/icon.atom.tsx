import "./icon.atom.scss"
import { IconName } from "./icon";

interface Props{
    name: IconName;
    size?: number
    alt?: string
}

export function Icon({name, size = 16, alt = "Icon"}: Props) {
    return (
        <img className="icon" src={`/icons/icon-${name}.svg`} width={size} height={16} alt={alt}></img>
    )
}