import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        const response = await fetch("http://localhost:6500/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": accessToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Error fetching user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className={"bg-gray-600 min-h-screen w-full"}>
        <div className="flex flex-col p-2  mt-[18rem] ml-[33%] bg-white w-[35rem] h-[22rem] rounded-2xl shadow-2xl">
          <h1 className="text-center text-4xl font-bold mt-8">Profile</h1>
          {user && (
            <div className="mt-14 ml-auto mr-auto text-3xl">
              <p className="mb-6 font-semibold">
                Username:{" "}
                <span className="ml-3 font-light">{user.username}</span>
              </p>
              <p className="mb-6 font-semibold">
                Email: <span className="ml-2 font-light">{user.email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
