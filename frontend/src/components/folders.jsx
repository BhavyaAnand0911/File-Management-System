import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [currentFolder, setCurrentFolder] = useState("");

  const params = useParams();

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

  const fetchFiles = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken || !user || !params.folderName) {
        console.error("Access token, user, or folderName not available");
        return;
      }

      const response = await fetch(
        `http://localhost:6500/upload/files?folder=${params.folderName}&username=${user.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": accessToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFiles(data.files);
        setCurrentFolder(params.folderName);
      } else {
        console.error("Error fetching files:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    if (user && params.folderName) {
      fetchFiles();
    }
  }, [user, params.folderName]);

  return (
    <div className="grid grid-cols-6 gap-4">
      {files.length > 0 ? (
        files.map((file) => (
          <div key={file._id} className="p-4 border border-gray-300 rounded">
            <a
              href={file.cloudinaryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.filename}
            </a>
          </div>
        ))
      ) : (
        <p className="col-span-6">
          No files found in the current folder ({currentFolder}).
        </p>
      )}
    </div>
  );
};

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [folder, setFolder] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

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

      // Show success notification
      setShowSuccessNotification(true);
      toast.success("File uploaded successfully", {
        autoClose: 3000, // Close the notification after 3 seconds
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <h1 className="mt-10 mb-10 text-4xl font-bold">File Upload</h1>
        <div className="mb-10 p-5">
          <label htmlFor="file" className="mr-5 text-xl">
            Choose a file:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="mr-5"
            placeholder="Select a file"
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      <div className="mt-20 p-10">
        <Files />
      </div>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default FileUpload;
