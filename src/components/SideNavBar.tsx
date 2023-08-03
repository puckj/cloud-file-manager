import menu from "@/data/menu";
import Image from "next/image";
import React, { useState } from "react";
import CreateFolderModal from "./Folder/CreateFolderModal";

function SideNavBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      className="w-[200px] bg-red-50 h-screen sticky top-0 z-10
    shadow-blue-300 shadow-md p-5"
    >
      <div className="flex justify-center">
        <Image
          src={require("../../public/logo.png")}
          alt="logo"
          width={150}
          height={60}
        />
      </div>
      <button
        className="flex gap-2 items-center bg-blue-500 p-2 text-white rounded-md px-3
      hover:scale-105 transition-all mt-5 w-full justify-between text-[13px]"
      >
        Add New File
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        onClick={() => window.my_modal_3.showModal()}
        className="flex gap-2 items-center bg-sky-400 p-2 text-white rounded-md px-3
      hover:scale-105 transition-all mt-1 w-full justify-between text-[13px]"
      >
        New Folder
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <div className="mt-7">
        {menu.list.map((item, index) => (
          <h2
            onClick={() => setActiveIndex(index)}
            key={index}
            className={`flex gap-2 items-center p-2 mt-4 text-gray-500
          hover:bg-blue-500 hover:text-white rounded-md cursor-pointer 
          ${activeIndex == index && "bg-blue-500 text-blue-50"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}
          </h2>
        ))}
      </div>

      {/* You can open the modal using ID.showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <CreateFolderModal />
      </dialog>
    </div>
  );
}

export default SideNavBar;
