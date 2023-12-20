import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("accessToken");
    // Redirect to the login page or any other desired page after logout
    navigate("/");
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // If the access token is not present, redirect to the login page
    if (!accessToken) {
      navigate("/login");
    }

    // Set up the beforeunload event listener
    const handleBeforeUnload = () => {
      // Clear the access token when the tab is closed
      localStorage.removeItem("accessToken");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);
  return (
    <aside className="bg-blue-800 min-h-screen text-white max-w-[18rem] p-6 left-0">
      <div className="mb-4 mt-4">
        <h1 className="text-4xl  font-semibold">File Management System</h1>
      </div>
      <nav>
        <ul className="mt-12 h-[17rem] flex flex-col ">
          <li className="mb-8">
            <Link
              to={"/dashboard"}
              className="text-gray-300 text-2xl hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to={"/profile"}
              className="text-gray-300 text-2xl hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li className="mb-4 mt-[36rem] text-center">
            <button
              onClick={handleLogout}
              className="text-gray-300 text-2xl hover:text-red-500"
            >
              Logout
            </button>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
