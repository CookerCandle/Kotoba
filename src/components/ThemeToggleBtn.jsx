import { useTheme } from "../context/useTheme";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeToggleBtn = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="btn btn-theme">
            {theme === "light" ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}
        </button>
    )
}

export default ThemeToggleBtn