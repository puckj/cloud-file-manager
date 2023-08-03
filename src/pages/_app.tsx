import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import SideNavBar from "@/components/SideNavBar";
import CreateFolderModal from "@/components/Folder/CreateFolderModal";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <div className="flex">
        <SideNavBar />
        <div
          className="grid grid-cols-1
        md:grid-cols-3 w-full"
        >
          <div className="col-span-2">
            <Component {...pageProps} />
          </div>
          <div className="bg-white p-5">Storage</div>
        </div>
      </div>
    </SessionProvider>
  );
}
