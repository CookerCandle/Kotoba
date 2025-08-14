import React from "react";
import { useState } from "react";

const OutputZone = ({ text, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (error) {
    return <div className="output error">{error}</div>;
  }

  if (!text) {
    return <div className="output empty">Data not found</div>;
  }

  return (
    <div className="output">
      <button className="copy-button" onClick={handleCopy}>
        {copied ? "Скопировано!" : "Скопировать"}
      </button>
      <pre className="json-output scrollable">{text}</pre>
    </div>
  );
};

export default OutputZone;
