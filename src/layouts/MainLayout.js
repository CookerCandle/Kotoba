import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "../styles/mainLayout.css";

import ThemeToggle from "../components/ThemeToggle";

const MainLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="logo">Kotoba
                    <ThemeToggle />
                </div>
                <nav className={`nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Kotoba</Link></li>
                        <li><Link to="/json-parser" onClick={() => setMenuOpen(false)}>Json</Link></li>
                        <li><Link to="/test" onClick={() => setMenuOpen(false)}>test</Link></li>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>soon</Link></li>
                    </ul>
                </nav>
                <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
            </header>

            <main className="content">
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
