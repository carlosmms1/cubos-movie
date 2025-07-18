import { Link, useNavigate } from "@tanstack/react-router";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between p-4 border-b text-primary-foreground bg-background/60 backdrop-blur-sm">
      <div className="flex space-x-4 items-center">
        <Link to="/">
          <img
            src="/assets/cubos-logo.svg"
            alt="cubos logo"
            className="h-6 hidden dark:block"
          />
          <img
            src="/assets/cubos-dark-logo.svg"
            alt="cubos logo"
            className="h-6 dark:hidden"
          />
        </Link>
        <p className="font-medium text-primary-foreground">Movies</p>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Button
          onClick={() => {
            logout();
            navigate({ to: "/sign-in" });
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
