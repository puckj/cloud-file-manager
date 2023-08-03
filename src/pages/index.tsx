import FileList from "@/components/File/FileList";
import FolderList from "@/components/Folder/FolderList";
import SearchBar from "@/components/SearchBar";
import { db } from "@/config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState<any>([]);

  useEffect(() => {
    // console.log("user session = > ", session);
    if (!session) {
      router.push("/login");
    } else {
      getFolderList();
      // console.log("user session = > +++", session);
    }
  }, [session]);

  const getFolderList = async () => {
    const q = query(
      collection(db, "Folders"),
      where("createBy", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFolderList((prevFolderList: any) => [...prevFolderList, doc.data()]);
    });
  };

  return (
    <div className="p-5">
      <SearchBar />
      <FolderList folderList={folderList}/>
      <FileList />
    </div>
  );
}
