function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    // Обновляем иконку при старте
    const btn = document.getElementsByClassName("theme-toggle")[0];
    if (btn) {
        btn.innerHTML = isDark
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const btn = document.getElementsByClassName("theme-toggle")[0];
    if (btn) {
        btn.innerHTML = isDark
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
}

// Всё выполняем после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();

    const btn = document.getElementsByClassName("theme-toggle")[0];
    if (btn) {
        btn.addEventListener("click", toggleTheme);
    }
});
