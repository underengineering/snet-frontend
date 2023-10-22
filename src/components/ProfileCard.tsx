import moment from "moment";
import { FC } from "react";

import Avatar, { AvatarSkeleton } from "@/components/Avatar";
import { Api } from "@/lib/api";
import { hashFloatRange } from "@/lib/utils";

export const ProfileCardSkeleton: FC<{ seed: number }> = ({ seed }) => {
    const lastOnlineWidth = hashFloatRange(seed, 20, 40);
    return (
        <div className="px-2 rounded bg-secondary-bg flex animate-pulse gap-4">
            <AvatarSkeleton />
            <div className="flex flex-col w-72">
                <div className="my-1 rounded-full bg-skeleton whitespace-nowrap overflow-ellipsis h-4"></div>
                <div
                    className={`my-1 rounded-full bg-skeleton h-4`}
                    style={{ width: `${lastOnlineWidth}%` }}
                ></div>
            </div>
        </div>
    );
};

type IPublicUser = Api.Users.IPublicUser;
type IPrivateUser = Api.Users.IPrivateUser;

interface Props {
    user: IPublicUser | IPrivateUser;
}

function isPublicUser(user: IPublicUser | IPrivateUser): user is IPublicUser {
    return (user as { lastOnlineAt?: string }).lastOnlineAt !== undefined;
}

const ProfileCard: FC<Props> = ({ user }) => {
    return (
        <div className="px-2 rounded bg-secondary-bg flex gap-4">
            <Avatar hash={user.avatar} />
            <div className="flex flex-col">
                <span className="font-bold">
                    {user.name} {user.surname}
                </span>
                {isPublicUser(user) ? (
                    <span>
                        Last online {moment(user.lastOnlineAt).fromNow()}
                    </span>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
