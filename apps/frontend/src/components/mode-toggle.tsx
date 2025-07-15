import { SunMediumIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

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
      <SunMediumIcon className="h-4" />
    </Button>
  );
}
