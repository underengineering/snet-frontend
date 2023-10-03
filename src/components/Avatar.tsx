import Image from "next/image";
import { FC } from "react";

interface Props {
    userId: string;
}

const Avatar: FC<Props> = ({ userId }) => {
    return (
        <Image
            className="rounded-full"
            // src={`/api/users/${userId}/avatar`}
            src="next.svg"
            alt=""
            width={32}
            height={32}
        />
    );
};

export default Avatar;
