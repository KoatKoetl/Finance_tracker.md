import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <div className="grid place-items-center">
        <h1 className="text-6xl font-extrabold ">404</h1>
        <p className="mt-4 text-2xl font-medium ">{t("pageNotFound")}</p>
        <p className="mt-2 text-lg  text-center max-w-md">
          {t("pageNotFoundDescription")}
        </p>
        <div className="mt-4 flex gap-4">
          <Link to="/">
            <Button
              variant="outline"
              className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
            >
              {t("homeButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
