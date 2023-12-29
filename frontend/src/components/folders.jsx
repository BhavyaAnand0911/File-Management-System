import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState("");
  const [folder, setFolder] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("owner", owner);
      formData.append("folder", folder);

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      console.log(accessToken);
      const response = await fetch("http://localhost:6500/upload", {
        method: "POST",
        headers: {
          "x-auth-token": accessToken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`File upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("File uploaded successfully", data);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <div>
        <label htmlFor="file">Choose a file:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="owner">Owner:</label>
        <input
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="folder">Folder:</label>
        <input
          type="text"
          id="folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        />
      </div>
      <button className="bg-green-500" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
