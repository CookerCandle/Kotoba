import { useState } from "react";
import MultiFile from "../components/MultiFile";
import OneFile from "../components/OneFile";

const HomePage = () => {
    const [mode, setMode] = useState("one");

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Okayama Lecture Parser</h2>

            {/* Переключатель режимов */}
            <div className="btn-group mb-4" role="group" aria-label="File mode switch">
                <button
                    type="button"
                    className={`btn ${mode === "one" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setMode("one")}
                >
                    Text on screen
                </button>
                <button
                    type="button"
                    className={`btn ${mode === "multi" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setMode("multi")}
                >
                    Text in file
                </button>
            </div>

            <div className="mb-3">
                {mode === "one" ? (
                    <div className="text-secondary" role="status">
                        Mode: parses JSON files and displays the result on the screen.
                    </div>
                ) : (
                    <div className="text-secondary" role="status">
                        Mode: parses JSON files and allows you to download the result as a file.
                    </div>
                )}
            </div>

            {mode === "one" ? <OneFile /> : <MultiFile />}
        </div>
    );
};

export default HomePage;
