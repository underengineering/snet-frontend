import { FC } from "react";

import { Api } from "@/lib/api";
import { hashFloatRange } from "@/lib/utils";

export const ChatCardSkeleton: FC<{ seed: number }> = ({ seed }) => {
    const messageWidth = hashFloatRange(seed, 10, 75);
    return (
        <div className="p-2 flex flex-col rounded bg-secondary-bg animate-pulse w-72">
            <div className="my-1 rounded-full bg-skeleton whitespace-nowrap overflow-ellipsis h-4"></div>
            <div
                className={`my-1 rounded-full bg-skeleton h-4`}
                style={{ width: `${messageWidth}%` }}
            ></div>
        </div>
    );
};

interface Props {
    meId: string;
    chat: Api.Chats.IChat;
    onClick?: () => void;
}

const ChatCard: FC<Props> = ({ meId, chat, onClick }) => {
    const chatName =
        chat.participants.length === 2
            ? chat.participants.find((participant) => participant.id !== meId)!
                  .name
            : chat.participants
                  .map((participant) => participant.name)
                  .join(", ");
    return (
        <a
            className="p-2 flex flex-col rounded shadow-md bg-secondary-bg w-72"
            href={`#${chat.id}`}
            onClick={onClick}
        >
            <span className="whitespace-nowrap overflow-ellipsis">
                {chatName}
            </span>
            {chat.messages.length === 1 ? (
                <span>{chat.messages[0].content}</span>
            ) : (
                <></>
            )}
        </a>
    );
};

export default ChatCard;
