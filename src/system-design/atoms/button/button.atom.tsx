import { ComponentPropsWithoutRef, HTMLProps, ReactNode } from "react"
import "./button.atom.scss"


interface Props  {
    children: ReactNode;
    variant: ButtonType
    alignment?: ButtonAlignment
    fitContent?: boolean;
}

export function Button({ children, variant = "action", alignment = "left", fitContent = false, ...props }: Props & ComponentPropsWithoutRef<"button">) {

    const className = `button button--${variant} button--${alignment} ${fitContent && "button--fit-content"} ${props.className}`
    
    return (
        <button {...props} className={className} >
            {children}
        </button>
    )
}