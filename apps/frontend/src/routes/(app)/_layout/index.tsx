import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_layout/")({
  component: AppHomePage,
});

function AppHomePage() {
  return <div className="p-2">Hello "/(app)/app/"!</div>;
}
