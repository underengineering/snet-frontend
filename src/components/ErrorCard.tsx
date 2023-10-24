import { FC } from "react";

interface Props {
    message: string;
}

const ErrorCard: FC<Props> = ({ message }) => {
    return (
        <div className="p-2 flex flex-col grow-0 rounded shadow-md bg-secondary-bg w-72">
            <span className="text-primary-red">{message}</span>
        </div>
    );
};

export default ErrorCard;
