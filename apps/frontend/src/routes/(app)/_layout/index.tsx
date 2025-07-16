import { createFileRoute } from "@tanstack/react-router";
import { Filters } from "../@components/filters";

export const Route = createFileRoute("/(app)/_layout/")({
  component: AppHomePage,
});

function AppHomePage() {
  return (
    <div className="p-6">
      <Filters />
    </div>
  );
}
