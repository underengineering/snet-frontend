import Image from "next/image";
import { FC } from "react";

import { AccountCircle } from "@mui/icons-material";

export const AvatarSkeleton = () => {
    return <AccountCircle className="w-[32px] h-[32px]" />;
};

interface Props {
    hash?: string;
}

const Avatar: FC<Props> = ({ hash }) => {
    const src = hash !== undefined ? `/api/files/${hash}` : "next.svg";
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
