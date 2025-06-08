import { Fragment, ReactNode } from "react";


interface Props{
    children: ReactNode
}

export function FontsProvider({children}: Props ) {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}