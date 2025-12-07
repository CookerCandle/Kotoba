import ThemeToggleBtn from "../components/ThemeToggleBtn";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-end">
        <ThemeToggleBtn />
      </div>
      <hr className="flex-grow-1" />
      <Outlet />
    </div>
  );
};

export default MainLayout;
