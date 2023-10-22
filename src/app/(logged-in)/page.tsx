"use client";

import assert from "assert";
import _ from "lodash";
import { useEffect, useState } from "react";
import useSWR from "swr";

import Chat, { ChatSkeleton } from "@/components/Chat";
import ChatCard, { ChatCardSkeleton } from "@/components/ChatCard";
import { Api } from "@/lib/api";

export default function Home() {
    const {
        data: me,
        error: meError,
        isLoading: meLoading,
    } = useSWR("users", Api.Users.me);

    const [selectedChat, setSelectedChat] = useState<
        Api.Chats.IChat | undefined
    >();

    const [selectedChatMessages, setSelectedChatMessages] = useState<
        Api.Chats.IMessage[] | undefined
    >();

    const {
        data: chats,
        error: chatsError,
        isLoading: chatsLoading,
    } = useSWR("chats", async () => {
        const chats = await Api.Chats.getAll();
        if (chats.isErr) return chats;

        const anchor = location.hash.slice(1);
        if (anchor.length > 0) {
            const chat = chats.data.find((chat) => chat.id === anchor);
            if (chat !== undefined) {
                const messages = await Api.Chats.paginate(chat.id);
                if (messages.isOk) setSelectedChatMessages(messages.data);

                setSelectedChat(chat);
            }
        }

        return chats;
    });

    useEffect(() => {
        async function fetchData() {
            if (selectedChat === undefined) return;
            const messages = await Api.Chats.paginate(selectedChat.id);
            if (messages.isOk) setSelectedChatMessages(messages.data);
        }

        fetchData();
    }, [selectedChat]);

    const activeListEl = (() => {
        if (meLoading || chatsLoading) {
            return (
                <ul className="flex flex-col gap-1">
                    {_.range(8).map((index) => (
                        <ChatCardSkeleton seed={index} key={index} />
                    ))}
                </ul>
            );
        }

        assert(me?.isOk && chats?.isOk);

        return (
            <ul className="flex flex-col gap-1">
                {
                    <ul className="flex flex-col">
                        {chats!.data.map((chat, index) => (
                            <ChatCard
                                meId={me.data.id}
                                chat={chat}
                                onClick={async () => setSelectedChat(chat)}
                                key={index}
                            />
                        ))}
                    </ul>
                }
            </ul>
        );
    })();

    return (
        <div className="p-2 flex flex-grow box-border gap-2">
            {activeListEl}
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
