// FileManager.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilePage from "./filePage.jsx";
import FolderPage from "./folder.jsx";

const FileManager = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  const handleAddFile = async () => {
    try {
      const response = await fetch("http://localhost:6500/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(files),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
      } else {
        const errorMessage = await response.text();
        // setError(errorMessage);
        console.error("Registration failed:", errorMessage);
        // You can choose to handle error state here, show a message to the user, etc.
      }
    } catch (error) {
      //   setError("An unexpected error occurred during registration.");
      console.error("Error during registration:", error);
      // You can choose to handle error state here, show a message to the user, etc.
    }
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolders([...folders, { name: newFolderName, id: folders.length + 1 }]);
      setNewFolderName("");
    }
  };

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
    navigate(`/folders/${folder.id}`);
  };

  return (
    <div>
      <div>
        <button
          onClick={handleAddFile}
          className="bg-blue-500 text-white px-4 py-2 mr-2"
        >
          Add File
        </button>
        <button
          onClick={handleAddFolder}
          className="bg-green-500 text-white px-4 py-2"
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

      <div className="mt-4">
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
            <div className="flex items-center">
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

      <div className="mt-4">
        {currentFolder ? (
          <FolderPage currentFolder={currentFolder} />
        ) : (
          <FilePage />
        )}
      </div>
    </div>
  );
};

export default FileManager;
