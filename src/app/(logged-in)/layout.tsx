import type { Metadata } from "next";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex w-screen h-screen">
            <NavBar />
            {children}
        </main>
    );
}
