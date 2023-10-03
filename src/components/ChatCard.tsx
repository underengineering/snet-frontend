import { FC } from "react"
import { Api } from "@/lib/api";

interface Props {
    me: Api.Users.IPublicUser,
    chat: Api.Chats.IChat
}

const ChatCard: FC<Props> = ({ me, chat }) => {
    const chatName = chat.participants.length === 2 ? chat.participants.find((participant) => participant.id !== me.id)!.name : chat.participants.map(participant => participant.name).join(", ");
    return <div className="flex flex-col">
        <span>{chatName}</span>
        {chat.messages.length === 1 ?
            <span>{chat.messages[0].content}</span> : <></>}
    </div>;
}

export default ChatCard;
