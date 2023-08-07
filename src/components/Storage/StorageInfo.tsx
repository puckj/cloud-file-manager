import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function StorageInfo() {
  const { data: session } = useSession();
  const [totalSize, setTotalSize] = useState<any>(0);
  let totalSizeBuffer = 0;
  useEffect(() => {
    if (session) {
      totalSizeBuffer = 0;
      getAllFiles();
    }
  }, [session]);

  const getAllFiles = async () => {
    const q = query(
      collection(db, "files"),
      where("createdBy", "==", session?.user?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, doc.data()["size"]);
      totalSizeBuffer = totalSizeBuffer + doc.data()["size"];
    });
    console.log(
      (totalSizeBuffer / 1024 ** 2).toFixed(2) + " MB",
      "totalSizeBuffer<<"
    );
    setTotalSize((totalSizeBuffer / 1024 ** 2).toFixed(2));
  };

  return (
    <div className="mt-7">
      <h2
        className="text-[22px] 
       font-bold"
      >
        {totalSize} MB {" "}
        <span
          className="text-[14px]
        font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div className="w-full bg-gray-200 h-2.5 flex">
        <div className="bg-blue-600 h-2.5 w-[25%]"></div>
        <div className="bg-green-600 h-2.5 w-[35%]"></div>
        <div className="bg-yellow-400 h-2.5 w-[13%]"></div>
      </div>
    </div>
  );
}
