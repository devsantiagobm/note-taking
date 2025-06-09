import { CSSProperties, HTMLProps } from "react";
import "./divider.atom.scss"

interface Props extends HTMLProps<"hr"> {
    marginTop?: number;
    marginBottom?: number;
}

export function Divider({ marginTop = 0, marginBottom = 0, className }: Props) {
    return (
        <hr className={`divider ${className ?? ""}`} style={
            {
                "--margin-top": `${marginTop}px`,
                "--margin-bottom": `${marginBottom}px`,
            } as CSSProperties}>

        </hr>
    )
}