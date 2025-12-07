import { useState } from "react";

const JSONDropZone = ({ onDropFiles }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false); // убираем подсветку после дропа

    const files = Array.from(e.dataTransfer.files);
    onDropFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true); // подсвечиваем при dragOver
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false); // убираем подсветку при уходе
  };

  const handleInput = (e) => {
    const files = Array.from(e.target.files);
    onDropFiles(files);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-dashed p-5 text-center mb-3 ${
        isDragOver ? "dragover" : ""
      }`}
      style={{ minHeight: "150px", transition: "0.2s" }}
    >
      <p className="m-0">Drop JSON files here</p>
      <p className="text-secondary m-0">or choose files</p>

      <input
        type="file"
        style={{ display: "none" }}
        id="drop-input"
        accept="application/json"
        multiple
        onChange={handleInput}
      />

      <label htmlFor="drop-input" className="btn btn-outline-primary mt-2">
        Choose files
      </label>
    </div>
  );
};

export default JSONDropZone;
