import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [folder, setFolder] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const params = useParams();
  console.log("This is params", params);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      console.log("This is the owner name", user.username);
      formData.append("file", file);
      formData.append("owner", user.username);
      formData.append("folder", params.folderName);

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
      <button className="bg-green-500" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
