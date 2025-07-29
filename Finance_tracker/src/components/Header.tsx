import LanguageSelector from "./LanguageSelector";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-1 border-b-1 border-gray-100 shadow-md min-h-[70px]">
      <div className="wrapper relative z-1 flex items-center justify-between px-4 py-1 max-w-[1440px] mx-auto">
        <div className="icon flex items-baseline">
          <Link to={"/"}>
            <img src="/logo.svg" alt="" className="w-20" />
          </Link>
        </div>
        <div className="flex gap-2">
          <div>
            <Link
              to={"/register"}
              className="text-gray-600 hover:text-gray-900"
            >
              <Button
                variant="link"
                className="text-black cursor-pointer hover:underline"
              >
                <UserPlus />
                {t("registration")}
              </Button>
            </Link>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
