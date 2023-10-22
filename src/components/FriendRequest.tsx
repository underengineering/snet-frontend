import { FC } from "react";

import { Api } from "@/lib/api";

interface Props {
    friendRequest: Api.Users.IFriendRequest;
}

const FriendRequest: FC<Props> = ({ friendRequest }) => {
    return <div className="flex"></div>;
};

export default FriendRequest;
