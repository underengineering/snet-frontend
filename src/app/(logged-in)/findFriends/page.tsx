"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import FriendList, { FriendListSkeleton } from "@/components/FriendList";
import UserList from "@/components/UserList";
import { Api } from "@/lib/api";
import { useDebounce } from "@/lib/utils";
import { Search } from "@mui/icons-material";

export default function Home() {
    const [searchResults, setSearchResults] = useState<Api.Users.IPublicUser[]>(
        []
    );

    const [searchQuery, setSearchQuery] = useState("");
    useDebounce(
        () => {
            async function fetchData() {
                const results = await Api.Users.search(searchQuery);
                if (results.isOk) setSearchResults(results.data);
            }

            fetchData();
        },
        searchQuery,
        500
    );

    return (
        <div className="p-2 flex flex-col flex-grow box-border gap-2">
            {/* Controls */}
            <div className="p-2 flex gap-2 items-center rounded shadow-md bg-secondary-bg">
                <div className="flex items-center">
                    <Search />
                    <input
                        className="p-1 border border-highlight rounded-md"
                        type="text"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.currentTarget.value)
                        }
                    />
                </div>
                <Link
                    className="p-1 rounded-md text-white bg-btn hover:bg-btn-hover active:bg-btn-active transition-colors"
                    href="/findFriends"
                >
                    Find new friends
                </Link>
            </div>
            <UserList users={searchResults} />
        </div>
    );
}
