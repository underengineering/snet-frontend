import _ from "lodash";
import moment from "moment";
import { FC, useEffect, useRef } from "react";

import Message from "@/components/Message";
import { Api } from "@/lib/api";

import Avatar from "./Avatar";
import MessageInput from "./MessageInput";

export const ChatSkeleton: FC = () => {
    return (
        <div className="p-2 flex flex-col justify-end rounded shadow-md bg-secondary-bg w-full h-full mb-auto">
            <div className="p-2 flex flex-col gap-2 overflow-y-scroll"></div>
            <MessageInput onSubmit={() => {}} />
        </div>
    );
};

function groupMessages(messages: Api.Chats.IMessage[]) {
    if (messages.length === 0) return [];

    const groups = [];
    let group = [];
    let now = Date.now();
    let authorId = messages[messages.length - 1].author.id;
    const DAY = 1000 * 60 * 60 * 24;
    for (let messageIdx = messages.length - 1; messageIdx >= 0; messageIdx--) {
        const message = messages[messageIdx];
        const createdAt = Date.parse(message.createdAt);

        if (now - createdAt >= DAY || authorId != message.author.id) {
            if (group.length > 0) {
                groups.unshift(group);
                group = [];
            }

            now = createdAt;
            authorId = message.author.id;
        }

        group.unshift(message);
    }

    if (group.length > 0) {
        groups.unshift(group);
    }

    console.log("GROUPS", groups);

    return groups;
}

function formatAuthor(author: Api.Users.IPublicUser) {
    return `${author.name} ${author.surname}`;
}

interface Props {
    id?: string;
    meId: string;
    messages: Api.Chats.IMessage[];
}

const Chat: FC<Props> = ({ id, meId, messages }) => {
    const messageGroups = groupMessages(messages);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="p-2 flex flex-col justify-end rounded shadow-md bg-secondary-bg w-full h-full mb-auto">
            <div className="p-2 flex flex-col gap-2 overflow-y-scroll">
                {messageGroups.flatMap((messages, index) => {
                    return (
                        <div className="flex flex-col gap-2" key={index}>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-2">
                                    {messages[0].author.id !== meId ? (
                                        <div className="flex gap-2">
                                            <Avatar
                                                userId={messages[0].author.id}
                                            />
                                            <div className="flex flex-col">
                                                <div className="flex gap-2">
                                                    <span>
                                                        {formatAuthor(
                                                            messages[0].author
                                                        )}
                                                    </span>
                                                    <span>
                                                        {moment(
                                                            messages[0]
                                                                .createdAt
                                                        ).format("HH:MM")}
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex flex-col gap-1"
                                                    ref={lastMessageRef}
                                                >
                                                    {messages.map(
                                                        (message, index) => (
                                                            <Message
                                                                {...message}
                                                                local={false}
                                                                key={index}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex flex-col self-end gap-1"
                                            ref={lastMessageRef}
                                        >
                                            {messages.map((message, index) => (
                                                <Message
                                                    {...message}
                                                    local={true}
                                                    key={index}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <MessageInput
                onSubmit={async (content) => {
                    if (id === undefined) return;
                    await Api.Chats.createMessage(id, content);
                }}
            />
        </div>
    );
};

export default Chat;
