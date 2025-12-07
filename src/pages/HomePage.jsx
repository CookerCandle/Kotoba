import { useState } from "react";
import MultiFile from "../components/MultiFile";
import OneFile from "../components/OneFile";

const HomePage = () => {
    const [mode, setMode] = useState("one");

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Parsing JSON Files</h2>

            {/* Переключатель режимов */}
            <div className="btn-group mb-4" role="group" aria-label="File mode switch">
                <button
                    type="button"
                    className={`btn ${mode === "one" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setMode("one")}
                >
                    one file
                </button>
                <button
                    type="button"
                    className={`btn ${mode === "multi" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setMode("multi")}
                >
                    multi files
                </button>
            </div>

            {mode === "one" ? <OneFile /> : <MultiFile />}
        </div>
    );
};

export default HomePage;
