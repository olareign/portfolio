export const THEME_STORAGE_KEY = "soi-theme";
export const THEME_CHANGE_EVENT = "soi:theme-change";

export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Applies and persists a theme, and tells every theme control on the page about it. */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable — theme just won't persist across visits
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function toggleTheme() {
  setTheme(currentTheme() === "light" ? "dark" : "light");
}
