import React from "react";
import { useParams } from "react-router-dom";
import FilePage from "./filePage.jsx";

const FolderPage = () => {
  const name = useParams();
  return (
    <div>
      <h2>Folder: {name.name}</h2>
      <FilePage />
      {/* Add your folder-related content here */}
    </div>
  );
};

export default FolderPage;
