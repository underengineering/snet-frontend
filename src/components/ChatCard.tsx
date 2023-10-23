import { FC } from "react";

import Avatar, { AvatarSkeleton } from "@/components/Avatar";
import { Api } from "@/lib/api";
import { hashFloatRange } from "@/lib/utils";

export const ChatCardSkeleton: FC<{ seed: number }> = ({ seed }) => {
    const nameWidth = hashFloatRange(seed, 20, 50);
    const surnameWidth = hashFloatRange(seed, 20, 50);
    const messageWidth = hashFloatRange(seed, 10, 75);
    return (
        <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg w-72">
            <div className="flex items-center gap-2 animate-pulse">
                <AvatarSkeleton />
                <div
                    className="my-1 rounded-full bg-skeleton whitespace-nowrap overflow-ellipsis h-4"
                    style={{ width: `${nameWidth}%` }}
                ></div>
                <div
                    className="my-1 rounded-full bg-skeleton whitespace-nowrap overflow-ellipsis h-4"
                    style={{ width: `${surnameWidth}%` }}
                ></div>
            </div>
            <div
                className={`my-1 rounded-full bg-skeleton animate-pulse h-4`}
                style={{ width: `${messageWidth}%` }}
            ></div>
        </div>
    );
};

interface Props {
    dm: Api.DM.IDM;
    onClick?: () => void;
}

const ChatCard: FC<Props> = ({ dm, onClick }) => {
    return (
        <a
            className="p-2 flex flex-col rounded shadow-md bg-secondary-bg w-72"
            href={`#${dm.id}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <Avatar hash={dm.participant.avatar} />
                <span className="whitespace-nowrap overflow-ellipsis">
                    {dm.participant.name} {dm.participant.surname}
                </span>
            </div>
            {dm.messages.length === 1 ? (
                <span>{dm.messages[0].content}</span>
            ) : (
                <></>
            )}
        </a>
    );
};

export default ChatCard;
