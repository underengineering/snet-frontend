import assert from "assert";

import ChatCard from "@/components/ChatCard";
import Profile from "@/components/Profile";
import { Api } from "@/lib/api";

export default async function Home() {
    const me = await Api.Users.me();
    const chats = await Api.Chats.getAll();
    assert(me.isOk);
    assert(chats.isOk);

    return (
        <main>
            <>
                <Profile user={me.data} />
                {chats.data.map((chat, index) => (
                    <ChatCard me={me.data} chat={chat} key={index} />
                ))}
            </>
        </main>
    );
}
