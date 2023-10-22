import moment from "moment";
import Image from "next/image";
import { FC, useState } from "react";

import { Api } from "@/lib/api";
import { Done, DoneAll, Refresh } from "@mui/icons-material";

interface Props extends Api.DM.IMessage {
    sent?: boolean;
    local: boolean;
}

const AcknowledgeStatus = ({
    acknowledged,
    sent,
}: {
    acknowledged: boolean;
    sent?: boolean;
}) => {
    if (sent !== undefined) {
        if (!sent) return <Refresh />;
        return acknowledged ? <DoneAll /> : <Done />;
    }

    return acknowledged ? <DoneAll /> : <Done />;
};

const Message: FC<Props> = ({ content, acknowledged, local, sent }) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`p-2 flex shadow-md ${
                    local
                        ? "ml-auto border-[1px] border-highlight rounded-l-md rounded-tr-md"
                        : "bg-primary from-secondary rounded-r-md rounded-bl-md"
                }`}
            >
                <span>{content}</span>
            </div>
            {local ? (
                <AcknowledgeStatus acknowledged={acknowledged} sent={sent} />
            ) : (
                <button>...</button>
            )}
        </div>
    );
};

export default Message;
