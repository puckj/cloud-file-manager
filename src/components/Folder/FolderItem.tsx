import Image from "next/image";
import React from "react";

type Props = {
  folder: {
    id: number;
    name: string;
  };
  isSubFolder: boolean;
};

function FolderItem({ folder, isSubFolder }: Props) {
  return (
    <div
      className={
        isSubFolder
          ? `flex gap-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer`
          : `w-full flex flex-col justify-center items-center h-[130px] border-[1px] rounded-lg p-5 bg-white hover:scale-105 hover:shadow-md cursor-pointer`
      }
    >
      <Image
        src="/folder.png"
        alt="folder"
        width={isSubFolder ? 20 : 40}
        height={isSubFolder ? 20 : 40}
      />
      <h2 className={isSubFolder ? `` : `line-clamp-2 text-[12px] text-center`}>
        {folder.name}
      </h2>
    </div>
  );
}

export default FolderItem;
