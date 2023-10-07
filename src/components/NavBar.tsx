import Link from "next/link";

import { Chat, PeopleAlt } from "@mui/icons-material";

const NavBar = () => {
    return (
        <nav>
            <ol className="flex flex-col">
                <Link href="/chats">
                    <Chat /> Chats
                </Link>
                <Link href="/chats">
                    <PeopleAlt /> Friends
                </Link>
            </ol>
        </nav>
    );
};

export default NavBar;
