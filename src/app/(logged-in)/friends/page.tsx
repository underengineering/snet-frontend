"use client";

import assert from "assert";
import _ from "lodash";
import { useEffect, useState } from "react";
import useSWR from "swr";

import Chat, { ChatSkeleton } from "@/components/Chat";
import ChatCard, { ChatCardSkeleton } from "@/components/ChatCard";
import FriendList, { FriendListSkeleton } from "@/components/FriendList";
import { Api } from "@/lib/api";
import { PersonAdd } from "@mui/icons-material";

export default function Home() {
    const {
        data: friends,
        error: friendsError,
        isLoading: friendsLoading,
    } = useSWR("friends", Api.Users.meFriendList);

    return (
        <div className="p-2 flex flex-col flex-grow box-border gap-2">
            {friends?.isOk ? (
                <FriendList friends={friends.data} />
            ) : (
                <FriendListSkeleton />
            )}
        </div>
    );
}
