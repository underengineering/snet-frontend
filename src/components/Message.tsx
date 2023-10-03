
import { FC, useState } from "react"
import Image from "next/image";
import moment from "moment";
import { AcknowledgeState } from "@/lib/ack";

interface Props {
    content: string;
    createdAt: Date,
    ackState: AcknowledgeState | undefined;
    showDate: boolean;
    local: boolean;
}

const Message: FC<Props> = ({ content, createdAt, ackState, showDate, local }) => {
    return <div className="flex flex-col">
        {local && showDate && <span className="self-end">{moment(createdAt).fromNow()}</span>}
        <div className="flex gap-2">
            <div className={`p-2 flex bg-blue-300 shadow-md ${local ? "rounded-l-md rounded-tr-md" : "rounded-r-md rounded-bl-md"}`}>
                <span>{content}</span>
            </div>
            <button>...</button>
        </div>
    </div>;
}

export default Message;
