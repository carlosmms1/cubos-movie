import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex justify-between p-4 border-b text-primary-foreground bg-background/60 backdrop-blur-sm">
      <div className="flex space-x-4 items-center">
        <img src="/assets/cubos-logo.png" alt="cubos logo" className="h-6" />
        <p className="font-medium">Movies</p>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Button>Logout</Button>
      </div>
    </header>
  );
}
