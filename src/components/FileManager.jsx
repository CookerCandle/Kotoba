import { useState } from "react";

import JSONParser from "../utils/JSONParser";

const FileManager = ({ files, onRemoveAll }) => {
    const [outputName, setOutputName] = useState("");

    const handleParse = (e) => {
        e.preventDefault();
        if (files.length === 0) return;
        JSONParser(files, "download", outputName);
    };

    if (files.length === 0) return null;

    return (
        <div className="d-flex justify-content-between align-items-center gap-2 mt-3">
            <button className="btn btn-outline-danger" onClick={onRemoveAll}>
                delete all files
            </button>

            <form action="" onSubmit={handleParse}>
            <div className="d-flex align-items-center gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Имя итогового файла"
                    value={outputName}
                    onChange={(e) => setOutputName(e.target.value)}
                    style={{ maxWidth: "250px" }}
                    required
                />
                <button className="btn btn-primary" onClick={handleParse}>
                Download
                </button>
            </div>  
            </form>
        </div>

    );
};

export default FileManager;
