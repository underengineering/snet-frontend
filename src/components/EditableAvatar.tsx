import { FC, useRef } from "react";

import Avatar from "@/components/Avatar";
import EditableImageOverlay from "@/components/EditableImageOverlay";

interface Props {
    hash?: string;
    onFileChange: (files: FileList | null) => void;
}

export const EditableAvatar: FC<Props> = ({ hash, onFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                onChange={(event) => onFileChange(event.currentTarget.files)}
            />
            <EditableImageOverlay
                onClick={() => fileInputRef?.current?.click()}
            >
                <Avatar hash={hash} size={64}></Avatar>
            </EditableImageOverlay>
        </>
    );
};

export default EditableAvatar;
