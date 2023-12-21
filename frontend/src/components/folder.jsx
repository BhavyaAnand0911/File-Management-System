import React from "react";

const FolderPage = ({ currentFolder }) => {
  return (
    <div>
      <h2>Folder: {currentFolder.name}</h2>
      {/* Add your folder-related content here */}
    </div>
  );
};

export default FolderPage;
