import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import clsx from "clsx";
import i18n from "../lib/i18n";

const LanguageSelector = () => {
  const osLanguage = i18n.language.split("-")[0];
  const [language, setLanguage] = useState(osLanguage);

  // Sync i18n and lang attribute of html
  i18n.on("languageChanged", (lng) => (document.documentElement.lang = lng));

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="link">
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-none">
        <DropdownMenuRadioGroup
          className="grid gap-y-1"
          value={language}
          onValueChange={setLanguage}
        >
          <DropdownMenuRadioItem
            value="en"
            className={clsx(
              "cursor-pointer opacity-75 hover:opacity-100 hover:bg-gray-100",
              language === "en" && "opacity-100"
            )}
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="ro"
            className={clsx(
              "cursor-pointer opacity-75 hover:opacity-100 hover:bg-gray-100",
              language === "ro" && "opacity-100"
            )}
            onClick={() => i18n.changeLanguage("ro")}
          >
            RO
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="ru"
            className={clsx(
              "cursor-pointer opacity-75 hover:opacity-100 hover:bg-gray-100",
              language === "ru" && "opacity-100"
            )}
            onClick={() => i18n.changeLanguage("ru")}
          >
            RU
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
