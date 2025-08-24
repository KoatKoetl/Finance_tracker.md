import { supabase } from "../../lib/supabaseClient";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";

const LogoutButton = ({
  className = "",
  showIcon = false,
}: {
  className?: string;
  showIcon?: boolean;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        // console.log("Successfully logged out!");
        navigate("/");
      }
    } catch (error) {
      console.error("An unexpected error occurred during logout.", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={`text-black hover:bg-gray-100 transition-all duration-300 ease-in-out ${className}`}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {t("logout")}
    </Button>
  );
};

export default LogoutButton;
