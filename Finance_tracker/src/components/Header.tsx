import LanguageSelector from "./LanguageSelector";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useAuthStore } from "../stores/AuthStore";
import { UserRound } from "lucide-react";
import useAutoLogout from "../hooks/userInactivityLogout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useAutoLogout(24, () => {
    navigate("/auth");
  });

  return (
    <header className="sticky top-0 z-1 border-b-1 bg-white border-gray-100 shadow-md min-h-[70px]">
      <div className="wrapper relative z-1 flex items-center justify-between px-4 py-1 max-w-[1440px] mx-auto">
        <div className="icon flex items-baseline">
          <Link to={"/"}>
            <img src="/logo.svg" alt="" className="w-20" />
          </Link>
        </div>
        <div className="flex gap-2">
          <LanguageSelector />
          {!isAuthenticated && (
            <div>
              <Link to={"/auth"} className="text-gray-600 hover:text-gray-900">
                <Button
                  id="auth-page-button"
                  variant="ghost"
                  className="text-black hover:bg-gray-100 transition-all duration-300 ease-in-out"
                >
                  <User />
                  {t("login")}
                </Button>
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <Link
              to={"/personal"}
              className="text-gray-600 hover:text-gray-900"
            >
              <Button
                id="profile-page-button"
                variant="ghost"
                className="text-black hover:bg-gray-100 transition-all duration-300 ease-in-out"
              >
                <UserRound />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
