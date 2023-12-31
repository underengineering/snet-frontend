"use client";

import assert from "assert";
import _ from "lodash";
import { useEffect, useState } from "react";
import useSWR from "swr";

import Chat, { ChatSkeleton } from "@/components/Chat";
import ChatCard, { ChatCardSkeleton } from "@/components/ChatCard";
import ErrorCard from "@/components/ErrorCard";
import { Api } from "@/lib/api";

export default function Home() {
    const { data: me, isLoading: meLoading } = useSWR("users", Api.Users.me);
    const [selectedChat, setSelectedChat] = useState<Api.DM.IDM | undefined>();

    const [selectedChatMessages, setSelectedChatMessages] = useState<
        Api.DM.IMessage[] | undefined
    >();

    const { data: dms, isLoading: dmsLoading } = useSWR("chats", async () => {
        const chats = await Api.DM.getAll();
        if (chats.isErr) return chats;

        const anchor = location.hash.slice(1);
        if (anchor.length > 0) {
            const chat = chats.data.find((chat) => chat.id === anchor);
            if (chat !== undefined) {
                const messages = await Api.DM.paginate(chat.id);
                if (messages.isOk) setSelectedChatMessages(messages.data);

                setSelectedChat(chat);
            }
        }

        return chats;
    });

    useEffect(() => {
        async function fetchData() {
            if (selectedChat === undefined) return;
            const messages = await Api.DM.paginate(selectedChat.id);
            if (messages.isOk) setSelectedChatMessages(messages.data);
        }

        fetchData();
    }, [selectedChat]);

    const activeListEl = (() => {
        if (dmsLoading || dms === undefined) {
            return (
                <>
                    {_.range(8).map((index) => (
                        <ChatCardSkeleton seed={index} key={index} />
                    ))}
                </>
            );
        }

        if (dms.isErr)
            return (
                <ErrorCard
                    message={`Error fetching /dms: ${dms?.data.message}`}
                />
            );

        return (
            <>
                {
                    <ul className="flex flex-col">
                        {dms!.data.map((dm, index) => (
                            <ChatCard
                                dm={dm}
                                onClick={async () => setSelectedChat(dm)}
                                key={index}
                            />
                        ))}
                    </ul>
                }
            </>
        );
    })();

    return (
        <div className="p-2 flex flex-grow box-border gap-2">
            <ul className="flex flex-col gap-1">{activeListEl}</ul>
            {selectedChat !== undefined ? (
                !meLoading && me !== undefined && me.isOk ? (
                    <Chat
                        meId={me.data.id}
                        id={selectedChat?.id}
                        messages={selectedChatMessages ?? []}
                    />
                ) : (
                    <ChatSkeleton />
                )
            ) : (
                <></>
            )}
        </div>
    );
}
