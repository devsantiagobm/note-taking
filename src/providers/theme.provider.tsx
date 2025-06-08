import { ReactNode } from "react"

interface Props{
    children: ReactNode
}

export function ThemeProvider({children}: Props) {
    return (
        <div data-theme="dark">
            {children}
        </div>
    )
}