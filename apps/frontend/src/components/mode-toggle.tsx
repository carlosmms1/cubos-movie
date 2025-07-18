import { SunIcon } from "@/assets/icons/sun";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      className="bg-primary/50 hover:bg-primary/50 dark:bg-primary/10  dark:hover:bg-primary/15"
      onClick={toggleTheme}
      type="button"
    >
      <SunIcon className="text-primary-foreground h-6 w-6" />
    </Button>
  );
}
