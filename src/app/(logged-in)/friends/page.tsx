"use client";

import useSWR from "swr";

import FriendList, { FriendListSkeleton } from "@/components/FriendList";
import FriendRequestList from "@/components/FriendRequestList";
import { Api } from "@/lib/api";

export default function Home() {
    const { data: friendRequests } = useSWR(
        "friendRequests",
        Api.Friends.getRequests
    );

    const { data: friends } = useSWR("friends", Api.Friends.getAll);

    return (
        <div className="p-2 flex flex-col flex-grow box-border gap-2">
            {friendRequests?.isOk && friendRequests.data.received.length > 0 ? (
                <FriendRequestList
                    received={friendRequests.data.received}
                ></FriendRequestList>
            ) : (
                <></>
            )}
            {friends?.isOk ? (
                <FriendList friends={friends.data} />
            ) : (
                <FriendListSkeleton />
            )}
        </div>
    );
}
