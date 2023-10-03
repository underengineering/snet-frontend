import moment from "moment";
import { FC } from "react";

import Avatar from "@/components/Avatar";
import { Api } from "@/lib/api";

type IPublicUser = Api.Users.IPublicUser;
type IPrivateUser = Api.Users.IPrivateUser;

interface Props {
    user: IPublicUser | IPrivateUser;
}

function isPublicUser(user: IPublicUser | IPrivateUser): user is IPublicUser {
    return (user as { lastOnlineAt?: string }).lastOnlineAt !== undefined;
}

const Profile: FC<Props> = ({ user }) => {
    return (
        <div className="flex gap-4">
            <Avatar userId={user.id} />
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

export default Profile;
