import Image from "next/image";
import { FC } from "react";

import { Api } from "@/lib/api";

interface Props {
    user: Pick<Api.Users.IPublicUser, "avatar">;
}

const Avatar: FC<Props> = ({ user }) => {
    const src =
        user.avatar !== undefined ? `/api/files/${user.avatar}` : "next.svg";
    return (
        <Image
            className="w-[32px] h-[32px] rounded-full"
            src={src}
            alt=""
            width={32}
            height={32}
        />
    );
};

export default Avatar;
