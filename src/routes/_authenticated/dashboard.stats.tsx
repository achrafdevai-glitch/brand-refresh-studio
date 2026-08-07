import { createFileRoute } from "@tanstack/react-router";
import StatsPage from "@/pages/dashboard/StatsPage";

export const Route = createFileRoute("/_authenticated/dashboard/stats")({
  component: StatsPage,
});
