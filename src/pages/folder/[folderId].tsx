import FileList from "@/components/File/FileList";
import FolderList from "@/components/Folder/FolderList";
import SearchBar from "@/components/SearchBar";
import { db } from "@/config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowToastContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function FolderDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const { folderId, name } = router.query;
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMessage, setShowToastMessage } =
    useContext(ShowToastContext);
  const [subFolderList, setSubFolderList] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    setParentFolderId(folderId);
    console.log(showToastMessage, session, "showToastMessage 555");
    if (session) {
      getSubFolderList();
      getFileList();
    }
  }, [folderId, session, showToastMessage]);

  const getSubFolderList = async () => {
    setSubFolderList([]);
    const q = query(
      collection(db, "folders"),
      where("createBy", "==", session?.user?.email),
      where("parentFolderId", "==", folderId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSubFolderList((prevSubFolderList: any) => [
        ...prevSubFolderList,
        doc.data(),
      ]);
    });
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("parentFolderId", "==", folderId),
      where("createdBy", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFileList((prevFileList: any) => [...prevFileList, doc.data()]);
    });
  };

  return (
    <div className="p-5">
      <SearchBar />
      <h2 className="text-[20px] font-bold mt-5">{name}</h2>
      <FolderList folderList={subFolderList} isSubFolder={true} />
      <FileList fileList={fileList} />
    </div>
  );
}

export default FolderDetails;
