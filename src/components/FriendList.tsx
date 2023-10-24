import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, Fragment, useMemo, useState } from "react";

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
                    <Fragment key={index}>
                        {index > 0 ? (
                            <div className="p-2">
                                <div className="rounded-full bg-highlight w-full h-1"></div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <ProfileCardSkeleton seed={index} key={index} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

interface Props {
    friends: Api.Friends.IFriendRequest[];
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
                    acc && (name.includes(value) || surname.includes(value)),
                true
            );
        });
    }, [friends, searchQuery]);

    return (
        <div className="flex flex-col gap-2">
            {/* Controls */}
            <div className="p-2 flex gap-2 items-center rounded shadow-md bg-secondary-bg">
                <div className="flex items-center">
                    <Search />
                    <input
                        className="p-1 border border-highlight rounded-md"
                        type="text"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.currentTarget.value)
                        }
                    />
                </div>
                <Link
                    className="p-1 rounded-md text-white bg-btn hover:bg-btn-hover active:bg-btn-active transition-colors"
                    href="/findFriends"
                >
                    Find new friends
                </Link>
            </div>
            {/*<button className="p-2 rounded shadow-md bg-secondary-bg">
                    <PersonAdd />
                </button>*/}
            <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg overflow-y-scroll">
                {filteredFriends.map((friend, index) => (
                    <Fragment key={index}>
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
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default FriendList;
