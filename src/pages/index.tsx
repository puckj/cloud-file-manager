import FileList from "@/components/File/FileList";
import FolderList from "@/components/Folder/FolderList";
import SearchBar from "@/components/SearchBar";
import { db } from "@/config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowToastContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMessage, setShowToastMessage } =
    useContext(ShowToastContext);

  useEffect(() => {
    // console.log("user session = > ", session);
    if (!session) {
      router.push("/login");
    } else {
      // console.log(showToastMessage, "showToastMessage");
      getFolderList();
      getFileList();
      // console.log("user session = > +++", session);
    }
    setParentFolderId(0);
  }, [session, showToastMessage]);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "folders"),
      where("parentFolderId", "==", 0),
      where("createBy", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFolderList((prevFolderList: any) => [...prevFolderList, doc.data()]);
    });
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("parentFolderId", "==", 0),
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
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
