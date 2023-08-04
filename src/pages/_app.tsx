import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import SideNavBar from "@/components/SideNavBar";
import Toast from "@/components/Toast";
import { ShowToastContext } from "@/context/ShowToastContext";
import { useState } from "react";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import Storage from "@/components/Storage/Storage";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [showToastMessage, setShowToastMessage] = useState();
  const [parentFolderId, setParentFolderId] = useState();
  return (
    <SessionProvider session={session}>
      <ParentFolderIdContext.Provider
        value={{ parentFolderId, setParentFolderId }}
      >
        <ShowToastContext.Provider
          value={{ showToastMessage, setShowToastMessage }}
        >
          <div className="flex">
            <SideNavBar />
            <div
              className="grid grid-cols-1
        md:grid-cols-3 w-full"
            >
              <div className="col-span-2">
                <Component {...pageProps} />
              </div>
              <div
                className="bg-white p-5 
              order-first md:order-last"
              >
                <Storage />
              </div>
            </div>
          </div>
          {showToastMessage && <Toast message={showToastMessage} />}
        </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
    </SessionProvider>
  );
}
