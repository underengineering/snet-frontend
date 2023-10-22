import { FC } from "react";

import { Api } from "@/lib/api";
import { PersonAdd } from "@mui/icons-material";

export const FriendListSkeleton = () => {
    return <div className="flex flex-col">SKELETON</div>;
};

interface Props {
    friends: Api.Users.IFriendRequest[];
}

const FriendList: FC<Props> = ({}) => {
    return (
        <div className="flex flex-col">
            {/* Controls */}
            <div className="p-1 rounded shadow-md bg-secondary-bg">
                <PersonAdd />
            </div>
        </div>
    );
};

export default FriendList;
