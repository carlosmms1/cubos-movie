import { Link } from "@tanstack/react-router";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex justify-between p-4 border-b text-primary-foreground bg-background/60 backdrop-blur-sm">
      <div className="flex space-x-4 items-center">
        <Link to="/">
          <img src="/assets/cubos-logo.svg" alt="cubos logo" className="h-6" />
        </Link>
        <p className="font-medium">Movies</p>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Link to="/sign-in">
          <Button>Autenticar-se</Button>
        </Link>
      </div>
    </header>
  );
}
