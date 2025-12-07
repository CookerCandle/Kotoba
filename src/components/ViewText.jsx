import { useState } from "react";

const ViewText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!text) {
    return (
      <div className="alert alert-warning" role="alert">
        Data not found.
      </div>
    );
  }

  return (
    <div className="output">
      <div className="d-flex justify-content-between align-items-center">
        <button
          className={`btn btn-sm ${copied ? "btn-success" : "btn-outline-primary"}`}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div>
        <pre className="json-output">{text}</pre>
      </div>
    </div>
  );
};

export default ViewText;
