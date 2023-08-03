import Image from "next/image";
import React from "react";

type Props = {
  folder: {
    id: number;
    name: string;
  };
};

function FolderItem({ folder }: Props) {
  return (
    <div
      className="w-full flex flex-col justify-center items-center
    h-[130px] border-[1px] rounded-lg p-5 bg-white hover:scale-105
    hover:shadow-md cursor-pointer"
    >
      <Image src="/folder.png" alt="folder" width={40} height={40} />
      <h2
        className="line-clamp-2 
      text-[12px] text-center"
      >
        {folder.name}
      </h2>
    </div>
  );
}

export default FolderItem;
