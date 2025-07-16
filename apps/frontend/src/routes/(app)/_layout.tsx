import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "./@components/header";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/(app)/_layout")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.token) {
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
