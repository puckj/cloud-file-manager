import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";

function FolderList({ folderList, isSubFolder = false }: any) {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const router = useRouter();

  const onFolderClickHandle = (item: any) => {
    console.log(item, "item");
    setActiveFolder(item.id);
    router.push({
      pathname: "/folder/" + item.id,
      query: {
        name: item.name,
      },
    });
  };

  return (
    <div className="p-5 mt-5 bg-white rounded-lg">
      {isSubFolder === false && (
        <h2 className="text-[17px] font-bold items-center">
          Recent Folders
          {/* <span
            className="float-right text-blue-400 
        font-normal text-[13px]"
          >
            View All
          </span> */}
        </h2>
      )}
      {folderList.length > 0 ? (
        <div
          className={
            isSubFolder
              ? ``
              : `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4`
          }
        >
          {folderList.map((item, index) => (
            <div onClick={() => onFolderClickHandle(item)} key={index}>
              <FolderItem folder={item} isSubFolder={isSubFolder} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-[14px]">The subfolder does not exist.</p>
        </div>
      )}
    </div>
  );
}

export default FolderList;
