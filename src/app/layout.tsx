import type { Metadata } from "next";
import { Inter, Noto_Serif, Source_Code_Pro } from "next/font/google";

import "@/styles/reset.scss";
import "@/styles/globals.scss";

import { FontsProvider, ReduxProvider, ThemeProvider } from "@/providers";
import { Header, Navbar } from "@/components";
import { Toaster } from "sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const noto_serif = Noto_Serif({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const source_code_pro = Source_Code_Pro({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NoteTask | Manage Notes & Tasks Easily",
    description: "NoteTask helps you stay organized by creating, editing, and managing notes and tasks in one place. Simple, fast, and efficient.",
    icons: {
        icon: "/logos/favicon.svg"
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" >
            <body className={`${inter.variable} ${noto_serif.variable} ${source_code_pro.variable}`}>
                <ReduxProvider>
                    <FontsProvider>
                        <ThemeProvider>
                            <div className="layout">
                                <Toaster richColors visibleToasts={1}/>
                                <Navbar />
                                <main className="main">
                                    <Header />
                                    {children}
                                </main>
                            </div>
                        </ThemeProvider>
                    </FontsProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
