import Image from "next/image";
import { FC } from "react";

import { AccountCircle } from "@mui/icons-material";

interface SharedProps {
    size?: number;
}

export const AvatarSkeleton: FC<SharedProps> = ({ size }) => {
    const sizePx = `${size ?? 32}px`;
    return (
        <AccountCircle
            style={{
                width: sizePx,
                height: sizePx,
            }}
        />
    );
};

interface Props extends SharedProps {
    hash?: string;
}

const Avatar: FC<Props> = ({ size, hash }) => {
    const src = hash !== undefined ? `/api/files/${hash}` : "next.svg";
    const sizePx = `${size ?? 32}px`;
    return (
        <Image
            className="rounded-full"
            style={{
                width: sizePx,
                height: sizePx,
            }}
            src={src}
            alt=""
            width={size ?? 32}
            height={size ?? 32}
        />
    );
};

export default Avatar;
