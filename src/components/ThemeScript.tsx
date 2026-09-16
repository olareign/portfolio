const THEME_INIT = `
try {
  var t = localStorage.getItem("soi-theme");
  if (t === "light") document.documentElement.dataset.theme = "light";
} catch (e) {}
`;

/** Sets the theme attribute before paint, so there's no flash of the wrong theme. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
