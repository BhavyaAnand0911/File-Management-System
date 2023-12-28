import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FileManager = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [user, setUser] = useState(null);

  const fetchFolders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      //console.log(accessToken);
      // console.log("fetching folders.....");
      const response = await fetch("http://localhost:6500/folder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": accessToken,
        },
      });
      //console.log(response.status); // Log the response status

      if (response.ok) {
        const folders = await response.json();
        console.log(folders.name);
        setFolders(folders);
      } else {
        console.error("Error fetching folders:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

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
        console.log(data.username);
        setUser(data);
      } else {
        console.error("Error fetching user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleAddFolder = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    await fetchUserDetails();

    try {
      const response = await fetch("http://localhost:6500/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": accessToken,
        },
        body: JSON.stringify({ name: newFolderName, owner: user.username }),
      });

      if (response.ok) {
        const folder = await response.json();
        setFolders([...folders, folder]);
        setNewFolderName("");
      } else {
        console.error("Failed to add folder");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
  };

  useEffect(() => {
    if (currentFolder) {
      navigate(`/folders/${currentFolder.name}`);
    }
  }, [currentFolder, navigate]);
  useEffect(() => {
    fetchFolders();
  }, []);
  return (
    <div className="p-5 flex flex-col justify-center items-center min-h-[30rem]">
      <div className="">
        <button
          onClick={handleAddFolder}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Folder
        </button>
        <input
          type="text"
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="border rounded px-2 py-1 ml-2"
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-5">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleFolderClick(folder)}
            className={`cursor-pointer ${
              currentFolder && currentFolder.id === folder.id
                ? "bg-gray-300"
                : ""
            } p-2 border mb-2 rounded`}
          >
            <div className="flex items-center min-w-[10rem]">
              <img
                src="https://img.icons8.com/windows/32/000000/folder-invoices.png"
                alt="Folder Icon"
                className="mr-2"
              />
              {folder.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
