import { BsFiletypeJson } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

import JSONDropZone from "./JSONDropZone";
import FileManager from "./FileManager";

const MultiFile = () => {
  const [files, setFiles] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [removingIndex, setRemovingIndex] = useState(null);

  // Принимает сырые файлы из DropZone
  const handleAddFiles = (newFiles) => {
    const jsonFiles = newFiles.filter((f) => f.type === "application/json");
    setFiles((prev) => [...prev, ...jsonFiles]);
  };

  const removeFile = (index) => {
    setRemovingIndex(index);
    setTimeout(() => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
      setRemovingIndex(null);
    }, 300);
  };

  const removeAllFiles = () => setFiles([]);

  return (
    <div className="mb-4">

      {/* Drop zone отдельно */}
      <JSONDropZone onDropFiles={handleAddFiles} />

      {/* отображение загруженных файлов */}
      {files.length > 0 && (
        <div className="d-flex flex-wrap gap-3">
          {files.map((file, index) => (
            <div
              key={index}
              className={`d-flex flex-column align-items-center ${
                removingIndex === index ? "removing" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: "pointer" }}
            >
              {hoveredIndex === index ? (
                <FaTrashAlt size={40} onDoubleClick={() => removeFile(index)} className="trash-icon"/>
              ) : (
                <BsFiletypeJson size={40} className="json-icon"/>
              )}

              <small
                className="text-truncate"
                style={{ maxWidth: "80px" }}
                title={file.name}
              >
                {file.name}
              </small>
            </div>
          ))}
        </div>
      )}

      <FileManager files={files} onRemoveAll={removeAllFiles} />
    </div>
  );
};

export default MultiFile;
