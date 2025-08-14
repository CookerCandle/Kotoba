import { useState, useEffect } from "react";
import "../styles/theme.css";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    // Загружаем тему из localStorage при старте
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const dark = savedTheme === "dark";
        setIsDark(dark);
        document.body.classList.toggle("dark-theme", dark);
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        document.body.classList.toggle("dark-theme", newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? (
                // светлая иконка
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                // тёмная иконка
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
