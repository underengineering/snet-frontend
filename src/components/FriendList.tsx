import _ from "lodash";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";

import ProfileCard, { ProfileCardSkeleton } from "@/components/ProfileCard";
import { Api } from "@/lib/api";
import { useDebounce } from "@/lib/utils";
import { Search } from "@mui/icons-material";

export const FriendListSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            {/* Controls */}
            <div className="p-2 flex gap-1 items-center rounded shadow-md bg-secondary-bg">
                <input
                    className="p-1 border border-highlight rounded-md"
                    type="text"
                />
                <Search />
            </div>
            <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg overflow-y-scroll">
                {_.range(8).map((index) => (
                    <>
                        {index > 0 ? (
                            <div className="p-2">
                                <div className="rounded-full bg-highlight w-full h-1"></div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <ProfileCardSkeleton seed={index} key={index} />
                    </>
                ))}
            </div>
        </div>
    );
};

interface Props {
    friends: Api.Users.IFriendRequest[];
}

const FriendList: FC<Props> = ({ friends }) => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const filteredFriends = useMemo(() => {
        const words = searchQuery.split(" ");
        return friends.filter((friend) => {
            const { name, surname } = friend.user;
            return _.reduce(
                words,
                (acc, value) =>
                    acc || name.includes(value) || surname.includes(value),
                false
            );
        });
    }, [friends, searchQuery]);

    useDebounce(() => console.log("debounce", searchQuery), searchQuery, 500);

    return (
        <div className="flex flex-col gap-2">
            {/* Controls */}
            <div className="p-2 flex gap-1 items-center rounded shadow-md bg-secondary-bg">
                <input
                    className="p-1 border border-highlight rounded-md"
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.currentTarget.value)
                    }
                />
                <Search />
            </div>
            {/*<button className="p-2 rounded shadow-md bg-secondary-bg">
                    <PersonAdd />
                </button>*/}
            <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg overflow-y-scroll">
                {filteredFriends.map((friend, index) => (
                    <>
                        {index > 0 ? (
                            <div className="p-2">
                                <div className="rounded-full bg-highlight w-full h-1"></div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <a
                            href="#"
                            onClick={async (event) => {
                                event.preventDefault();

                                const dm = await Api.DM.create(friend.user.id);
                                if (dm.isOk) router.push(`/#${dm.data.id}`);
                            }}
                            key={index}
                        >
                            <ProfileCard user={friend.user} />
                        </a>
                    </>
                ))}
            </div>
        </div>
    );
};

export default FriendList;
