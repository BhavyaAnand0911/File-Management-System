import React from "react";
import { Link } from "react-router-dom";

const landing = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-white w-[35rem] p-8 rounded shadow-xl">
        <h1 className="text-4xl font-bold mb-4">File Management System</h1>
        <p className="text-gray-600 text-xl mb-8">
          Effortlessly manage your files with our user-friendly system.
        </p>
        <div className="flex justify-between items-center">
          <Link to={"/login"}>
            <button className="bg-blue-500 text-white px-10 py-2 w-[8rem] rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link to={"/register"}>Register &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default landing;
