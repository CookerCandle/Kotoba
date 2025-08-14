import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import "../styles/filterButton.css";

const FilterButton = ({ files, selectedFiles, setSelectedFiles }) => {
  const [open, setOpen] = useState(false);

  const toggleFile = (file) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(f => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  return (
    <div className="filter-button-container">
      <button
        onClick={() => setOpen(!open)}
        className="filter-button"
      >
        <FaFilter className="filter-icon" />
      </button>

      {open && (
        <div className="filter-dropdown">
          {files.map((file, i) => (
            <label key={i} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedFiles.includes(file.url)}
                onChange={() => toggleFile(file.url)}
              />
              {file.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
