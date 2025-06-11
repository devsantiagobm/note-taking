"use client";

import { store } from "@/stores/notes.store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}> 
            {children}
        </Provider>
    )
}