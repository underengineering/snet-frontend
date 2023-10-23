import { FC, Fragment } from "react";

import ProfileCard from "@/components/ProfileCard";
import { Api } from "@/lib/api";
import { PersonAddAlt1, PersonRemove } from "@mui/icons-material";

interface Props {
    received: Api.Users.IReceivedFriendRequest[];
}

const FriendRequestList: FC<Props> = ({ received }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="p-2 flex rounded shadow-md bg-secondary-bg">
                Pending friend requests
            </div>
            <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg overflow-y-scroll">
                {received.map((friend, index) => (
                    <Fragment key={index}>
                        {index > 0 ? (
                            <div className="p-2">
                                <div className="rounded-full bg-highlight w-full h-1"></div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="flex gap-2">
                            <a
                                href="#"
                                onClick={async (event) => {
                                    event.preventDefault();
                                }}
                                key={index}
                            >
                                <ProfileCard user={friend.sender} />
                            </a>
                            <div className="flex items-center gap-1">
                                <button
                                    className="p-1 max-h-8 rounded-md text-white bg-btn-green hover:bg-btn-green-hover active:bg-btn-green-active transition-colors"
                                    onClick={() =>
                                        Api.Users.acceptFriendRequest(friend.id)
                                    }
                                >
                                    <PersonAddAlt1 />
                                </button>
                                <button
                                    className="p-1 max-h-8 rounded-md text-white bg-btn-red hover:bg-btn-red-hover active:bg-btn-red-active transition-colors"
                                    onClick={() =>
                                        Api.Users.rejectFriendRequest(friend.id)
                                    }
                                >
                                    <PersonRemove />
                                </button>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default FriendRequestList;
