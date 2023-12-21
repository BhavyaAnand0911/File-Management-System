import React from "react";
import Sidebar from "./sidebar";
import FileManager from "./fileManager.jsx";

const dashboard = () => {
  return (
    <div className="bg-gray-600 min-h-screen flex ">
      <Sidebar />
      <div className="flex justify-center items-center">
        <div
          className={
            "bg-white ml-[25rem] min-h-[30rem] max-h-[50rem] overflow-auto min-w-[50rem]"
          }
        >
          <FileManager />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
