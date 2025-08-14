import React, { useState } from "react";

const DropZone = ({ onFileRead }) => {
  const [borderColor, setBorderColor] = useState("#aaa");

  const handleDragOver = (e) => {
    e.preventDefault();
    setBorderColor("green");
  };

  const handleDragLeave = () => {
    setBorderColor("#aaa");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setBorderColor("#aaa");

    const file = e.dataTransfer.files[0];
    if (!file || file.type !== "application/json") {
      onFileRead({ error: "Only JSON files are allowed." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json.subtitles)) {
          onFileRead({ error: "Error: subtitles array not found" });
          return;
        }
        const texts = json.subtitles.map((entry) => entry.text).join("\n");
        onFileRead({ text: texts });
      } catch (err) {
        onFileRead({ error: "JSON parsing error: " + err.message });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      id="drop-zone"
      className="drop-zone"
      style={{ borderColor }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Json file here
    </div>
  );
};

export default DropZone;
