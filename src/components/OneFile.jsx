import { useState } from "react";
import JSONDropZone from "./JSONDropZone";
import JSONParser from "../utils/JSONParser";
import ViewText from "./ViewText";

const OneFile = () => {
  const [parsedText, setParsedText] = useState("");

  const handleAddFiles = (newFiles) => {
    const jsonFiles = newFiles.filter((f) => f.type === "application/json");

    if (jsonFiles.length > 0) {
      JSONParser(jsonFiles, "returnText", "output", (text) => {
        setParsedText(text);
      });
    }
  };

  return (
    <div>
      <JSONDropZone onDropFiles={handleAddFiles} />
      {parsedText && (
        <div className="mt-3">
          <ViewText text={parsedText} />
        </div>
      )}
    </div>
  );
};

export default OneFile;
