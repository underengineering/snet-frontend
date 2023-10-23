import _ from "lodash";
import { FC } from "react";

import ProfileCard from "@/components/ProfileCard";
import { Api } from "@/lib/api";
import { PersonAddAlt } from "@mui/icons-material";

interface Props {
    users: Api.Users.IPublicUser[];
}

const UserList: FC<Props> = ({ users }) => {
    return (
        <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg overflow-y-scroll">
            {users.map((user, index) => (
                <div key={index}>
                    {index > 0 ? (
                        <div className="p-2">
                            <div className="rounded-full bg-highlight w-full h-1"></div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="w-72 flex items-center justify-between">
                        <ProfileCard user={user} />
                        <button
                            className="p-1 rounded-md text-white bg-btn hover:bg-btn-hover active:bg-btn-active transition-colors"
                            onClick={() => Api.Users.sendFriendRequest(user.id)}
                        >
                            <PersonAddAlt />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
