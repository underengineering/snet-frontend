"use client";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

import { AvatarSkeleton } from "@/components/Avatar";
import EditableAvatar from "@/components/EditableAvatar";
import { Api } from "@/lib/api";

export default function Home() {
    const { data: me } = useSWR("/me", Api.Users.me);

    const [avatar, setAvatar] = useState<File | undefined>(undefined);
    const [name, setName] = useState(me?.isOk ? me.data.name : "");
    const [surname, setSurname] = useState(me?.isOk ? me.data.surname : "");

    useEffect(() => {
        if (me?.isOk) {
            setName(me.data.name);
            setSurname(me.data.surname);
        }
    }, [me]);

    const save = useCallback(async () => {
        let avatarHash = undefined;
        if (avatar !== undefined) {
            // Upload avatar
            const resp = await Api.File.upload(avatar);
            if (resp.isOk) avatarHash = resp.data.hash;

            // TODO: Show errors
        }

        await Api.Users.edit({ name, surname, avatar: avatarHash });
    }, [avatar, name, surname]);

    const cancel = useCallback(() => {
        if (me?.isOk) {
            setAvatar(undefined);
            setName(me.data.name);
            setSurname(me.data.surname);
        }
    }, [me]);

    const uploadFile = useCallback((files: FileList | null) => {
        if (files === null) return;

        const file = files[0];
        setAvatar(file);
    }, []);

    return (
        <div className="p-2 flex">
            <div className="p-2 flex flex-col rounded shadow-md bg-secondary-bg w-72 h-full">
                <div className="flex flex-col items-center gap-2">
                    {me?.isOk ? (
                        <>
                            <EditableAvatar
                                hash={me.data.avatar}
                                onFileChange={uploadFile}
                            />
                            <div className="flex gap-2">
                                <input
                                    className="p-1 grow border border-highlight rounded-md w-full"
                                    type="text"
                                    placeholder="name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.currentTarget.value)
                                    }
                                />
                                <input
                                    className="p-1 border border-highlight rounded-md w-full"
                                    type="text"
                                    placeholder="surname"
                                    value={surname}
                                    onChange={(event) =>
                                        setSurname(event.currentTarget.value)
                                    }
                                />
                            </div>
                            {avatar !== undefined ||
                            name !== me.data.name ||
                            surname !== me.data.surname ? (
                                <div className="flex gap-2 w-full">
                                    <button
                                        className="p-1 rounded-md text-text-light bg-btn hover:bg-btn-hover active:bg-btn-active transition-colors w-full"
                                        onClick={save}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="p-1 rounded-md text-text-light bg-btn-red hover:bg-btn-red-hover active:bg-btn-red-active transition-colors w-full"
                                        onClick={cancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center animate-pulse">
                            <AvatarSkeleton size={48} />
                            <div className="my-1 px-16 rounded-full bg-skeleton whitespace-nowrap overflow-ellipsis w-1/4 h-4"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
