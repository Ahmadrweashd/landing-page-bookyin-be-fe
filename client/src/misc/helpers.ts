import { SESSION_TOKEN_NAME } from "../constants/global";

export const cn = (
  condition: boolean,
  classNameTrue: string | null,
  classNameFalse: string | null,
  defaultClassName: string = ""
): string => {
  const className = condition
    ? `${classNameTrue ? classNameTrue : ""} ${defaultClassName}`.trim()
    : `${classNameFalse ? classNameFalse : ""} ${defaultClassName}`.trim();

  return className;
};

export const isCurrentPage = (path: string): boolean =>
  location.pathname.toLowerCase() === path;

export const range = (start: number, end: number, step: number = 1): number[] => {
  const arr: number[] = [];
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }

  return arr;
}

export const setLocalStorage = (key: string, data: unknown): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Failed to set localStorage:", error);
  }
};

export const getLocalStorage = <T = unknown>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  } catch (error) {
    console.error("Failed to parse localStorage item:", error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove localStorage item:", error);
  }
};


export const getAuthHeaders = (
  content?: { key: string; value: string }
): HeadersInit => {
  let token = localStorage.getItem(SESSION_TOKEN_NAME) ?? "";

  token = token.replace(/^"|"$/g, "");

  return {
    ...(content ? { [content.key]: content.value } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const translateText = (lang: string, ar: string | null | undefined, he: string | null | undefined, en: string | null | undefined): string => {
  const arText = ar || ""
  const enText = en || ""
  const heText = he || ""

  if (lang === "ar")
    return arText
  else if (lang === "he")
    return heText
  else
    return enText
}

export const highlightActiveLink = (navLinks: HTMLAnchorElement[]) => {
  const halfViewport = window.innerHeight / 2;
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("section")
  );

  sections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    const isHalfVisible = top <= halfViewport && bottom >= halfViewport;

    if (isHalfVisible) {
      const id = section.id;
      const activeLinkElement = document.querySelector<HTMLAnchorElement>(
        `li a[href="#${id}"]`
      );

      if (activeLinkElement) {
        navLinks.forEach((link) => link.classList.remove("active"));
        activeLinkElement.classList.add("active");
        return;
      }
    }
  });
};

export const setAnimation = () => {
  const reveals = document.querySelectorAll<HTMLElement>("*[data-ani]");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const revealElement = entry.target as HTMLElement;
        const animation = revealElement.getAttribute("data-ani");
        let delay: string | null = revealElement.getAttribute("data-delay");
        let duration: string | null =
          revealElement.getAttribute("data-duration");

        if (!delay || isNaN(parseFloat(delay))) delay = ".3";
        if (!duration || isNaN(parseFloat(duration))) duration = "1";

        revealElement.style.animation = `${animation} ${duration}s ${delay}s linear forwards`;
        setTimeout(() => {
          revealElement.removeAttribute("data-ani");
        }, Number(duration) * 1000 + Number(delay) * 1000);

        observer.unobserve(revealElement);
      }
    });
  });

  reveals.forEach((revealElement) => {
    observer.observe(revealElement);
  });
};