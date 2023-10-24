"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

import { Api } from "@/lib/api";
import { Chat, PeopleAlt, Settings } from "@mui/icons-material";

import Avatar, { AvatarSkeleton } from "./Avatar";

const NavBar = () => {
    const { data: me } = useSWR("/me", Api.Users.me);

    const pathName = usePathname();
    const routes = [
        { text: "Chat", href: "/", icon: <Chat /> },
        { text: "Friends", href: "/friends", icon: <PeopleAlt /> },
        { text: "Settings", href: "/settings", icon: <Settings /> },
    ];

    return (
        <div className="px-2 py-4 flex flex-col rounded shadow-md bg-secondary-bg w-48 h-full">
            {me?.isOk ? (
                <div className="flex flex-col items-center">
                    <Avatar hash={me.data.avatar} />
                    <span>
                        {me.data.name} {me.data.surname}
                    </span>
                </div>
            ) : (
                <div className="flex flex-col items-center animate-pulse">
                    <AvatarSkeleton />
                    <div className="my-1 px-16 rounded-full bg-skeleton whitespace-nowrap overflow-ellipsis w-1/4 h-4"></div>
                </div>
            )}
            <nav className="py-4">
                <ol className="p-2 flex flex-col gap-2">
                    {routes.map((route, index) => (
                        <Link
                            className={`transition-colors hover:text-primary active:text-secondary ${
                                route.href === pathName ? "text-primary" : ""
                            }`}
                            href={route.href}
                            key={index}
                        >
                            {route.icon} {route.text}
                        </Link>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default NavBar;
