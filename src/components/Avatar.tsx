import Image from "next/image";
import { FC } from "react";

import { AccountCircle } from "@mui/icons-material";

interface SharedProps {
    size?: number;
}

export const AvatarSkeleton: FC<SharedProps> = ({ size }) => {
    return (
        <AccountCircle
            style={{
                minWidth: `${size ?? 32}px`,
                minHeight: `${size ?? 32}px`,
            }}
        />
    );
};

interface Props extends SharedProps {
    hash?: string;
}

const Avatar: FC<Props> = ({ size, hash }) => {
    const src = hash !== undefined ? `/api/files/${hash}` : "next.svg";
    return (
        <Image
            className="rounded-full"
            style={{
                minWidth: `${size ?? 32}px`,
                minHeight: `${size ?? 32}px`,
            }}
            src={src}
            alt=""
            width={size ?? 32}
            height={size ?? 32}
        />
    );
};

export default Avatar;
