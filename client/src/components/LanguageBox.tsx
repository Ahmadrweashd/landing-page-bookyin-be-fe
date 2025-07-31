import React from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import { cn } from "../misc/helpers";
import { languages } from "../constants/global";
import type {
  Language as Lang,
  LanguageBoxProps,
} from "../misc/types";

type SupportedLang = "en" | "ar" | "he";

const LanguageBox: React.FC<LanguageBoxProps> = ({ size = 25 }): React.ReactNode => {
  const [language, i18n] = useTranslation("global");
  const activeLanguage = i18n.language as SupportedLang;

  const handleChangeLanguage = (lang: SupportedLang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("bookyin-landing-language", lang);

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

    document.body.classList.remove("en", "ar", "he");
    document.body.classList.add(lang);
  };

  return (
    <Dropdown align={activeLanguage === "en" ? "end" : "start"}>
      <Dropdown.Toggle
        as="div"
        id="language-dropdown"
        className="d-flex align-items-center"
      >
        <MdLanguage
          size={size}
          className={cn(
            false,
            "active",
            null,
            "language-icon transition-03 pointer"
          )}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm py-2">
        {languages(language).map((lang: Lang) => (
          <Dropdown.Item
            key={`language-${lang.id}`}
            className={cn(
              activeLanguage === lang.lang,
              "active",
              null,
              "text-center transition-03"
            )}
            onClick={() => handleChangeLanguage(lang.lang as SupportedLang)}
          >
            {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageBox;
