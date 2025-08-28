import { Button } from "../ui/button";
import { User, Settings, X, PanelRightOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoutButton from "../LogOutButton/LogOutButton";
import { Link } from "react-router-dom";
import { useState } from "react";

const StaticSidebar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="md:hidden sticky top-[100px]">
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className="p-2 hover:translate-x-1"
        >
          <PanelRightOpen />
        </Button>
      </div>

      <div
        className={`fixed inset-0  bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      ></div>

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 p-4 bg-white shadow-xl z-50
          transition-transform transform ease-in-out duration-300
          md:relative md:translate-x-0 md:bg-transparent md:shadow-none md:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex md:sticky top-[100px] flex-col space-y-2">
          <div className="md:hidden flex justify-end mb-4">
            <Button onClick={closeSidebar} variant="ghost" className="p-2">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <Link to={"/personal"} onClick={closeSidebar}>
            <Button
              variant="ghost"
              className="w-full justify-start text-base font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <User className="mr-2 h-5 w-5" />
              {t("profileButton")}
            </Button>
          </Link>

          <Link to={"/personal/settings"} onClick={closeSidebar}>
            <Button
              variant="ghost"
              className="w-full justify-start text-base font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <Settings className="mr-2 h-5 w-5" />
              {t("settingsButton")}
            </Button>
          </Link>

          <hr className="my-2 border-gray-700" />

          <LogoutButton
            className="justify-start text-base font-medium"
            showIcon={true}
          />
        </nav>
      </aside>
    </>
  );
};

export default StaticSidebar;
