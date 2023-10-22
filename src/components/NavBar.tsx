import assert from "assert";
import Link from "next/link";

import { Api } from "@/lib/api";
import { Chat, PeopleAlt } from "@mui/icons-material";

import Avatar from "./Avatar";

const NavBar = async () => {
    const me = await Api.Users.me();

    return (
        <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg w-48 h-full">
            {me.isOk ? (
                <div className="flex flex-col items-center">
                    <Avatar user={me.data} />
                    <span>
                        {me.data.name} {me.data.surname}
                    </span>
                </div>
            ) : (
                <></>
            )}
            <nav className="">
                <ol className="p-2 flex flex-col gap-2">
                    <Link className="" href="/chats">
                        <Chat /> Chats
                    </Link>
                    <Link href="/friends">
                        <PeopleAlt /> Friends
                    </Link>
                </ol>
            </nav>
        </div>
    );
};

export default NavBar;
