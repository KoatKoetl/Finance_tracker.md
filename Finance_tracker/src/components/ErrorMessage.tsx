import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  message: string;
  showReloadButton?: boolean;
}

/**
 * A reusable component to display a styled error message.
 * @param {string} message - The error message to display.
 * @param {string} [goBackLink] - An optional link to redirect the user (e.g., to the homepage).
 */
export default function ErrorMessage({
  message,
  showReloadButton,
}: ErrorMessageProps) {
  const { t } = useTranslation();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
      <div className="w-full max-w-sm">
        <p className="text-center mb-4 font-semibold border-2 border-red-500 rounded-md p-4 bg-red-100">
          {message}
        </p>
        {showReloadButton && (
          <Button
            variant="outline"
            className="w-full border-primaryOrange text-primaryOrange transition-all duration-300 hover:bg-primaryOrange hover:text-white"
            onClick={handleReload}
          >
            {t("reloadPage")}
          </Button>
        )}
      </div>
    </div>
  );
}
