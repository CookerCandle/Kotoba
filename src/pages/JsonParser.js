import React from "react";
import { useState } from "react";

import DropZone from "../components/DropZone";
import Output from "../components/OutputZone";

const JsonParser = () => {
  const [fileData, setFileData] = useState({ text: "", error: "" });

  return (
    <div className="container">
      <h1>Get text in Okayama lesson</h1>
      <DropZone onFileRead={setFileData} />
      <Output text={fileData.text} error={fileData.error} />
    </div>
  );
};

export default JsonParser;
