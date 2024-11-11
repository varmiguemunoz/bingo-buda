import { FC } from "react";
import Avatar from "./Avatar";

type AvatarNameProps = {
  name: string;
  description: string;
  image?: string;
  size?: "sm" | "md" | "lg";
};

const AvatarName: FC<AvatarNameProps> = ({
  description,
  image,
  name,
  size = "sm",
}) => {
  return (
    <div className="flex items-center gap-2 py-2">
      {image ? (
        <Avatar type="image" src={image} size={size} />
      ) : (
        <Avatar type="text" name={name} size={size} />
      )}
      <div className="flex flex-col">
        <p className="text-md font-medium leading-[21px] ">{name}</p>
        <p className="text-sm leading-[18px] text-darkGray">{description}</p>
      </div>
    </div>
  );
};

export default AvatarName;
