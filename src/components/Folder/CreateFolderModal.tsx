import { db } from "@/config/FirebaseConfig";
import { ShowToastContext } from "@/context/ShowToastContext";
import { doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useState } from "react";

function CreateFolderModal() {
  const [folderName, setFolderName] = useState("");
  const docId = Date.now().toString();
  const { data: session } = useSession();
  const { showToastMessage, setShowToastMessage } =
    useContext(ShowToastContext);

  const onCreateHandle = async () => {
    // console.log(folderName);
    try {
      await setDoc(doc(db, "Folders", docId), {
        name: folderName,
        id: docId,
        createBy: session?.user?.email,
      });
      setShowToastMessage("Folder Created!");
    } catch (error) {
      console.error(error, " setDoc - Folders [ERORR]");
    }
    setFolderName("");
  };
  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            value={folderName}
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md"
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
            onClick={() => onCreateHandle()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFolderModal;
