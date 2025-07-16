import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

import sunIcon from "@/assets/icons/sun.svg";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      className="bg-primary/10 hover:bg-primary/15"
      onClick={toggleTheme}
      type="button"
    >
      <img src={sunIcon} aria-hidden={true} />
    </Button>
  );
}
