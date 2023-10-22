"use client";

import { FC, useState } from "react";

import { Send } from "@mui/icons-material";

interface Props {
    onSubmit: (content: string) => void;
}

const MessageInput: FC<Props> = ({ onSubmit }) => {
    const [content, setContent] = useState("");
    return (
        <div className="flex">
            <form
                className="flex gap-2 w-full"
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(content);
                }}
            >
                <input
                    className="p-1 border border-highlight rounded-md w-full bg-transparent"
                    type="text"
                    placeholder="Message"
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
                <button className="self-center" type="submit">
                    <Send />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
