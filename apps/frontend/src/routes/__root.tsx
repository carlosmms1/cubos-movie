import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { AuthState } from "@/hooks/use-auth";

interface RouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 h-dvh w-full"
        style={{
          backgroundImage: `
            linear-gradient(
              to top,
              var(--background) 50%,
              color-mix(in srgb, var(--background) 80%, transparent) 90%,
              color-mix(in srgb, var(--background) 60%, transparent) 95%,
              color-mix(in srgb, var(--background) 90%, transparent) 100%
            ),
            url('/assets/bg.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
});
