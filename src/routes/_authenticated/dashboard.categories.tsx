import { createFileRoute } from "@tanstack/react-router";
import CategoriesPage from "@/pages/dashboard/CategoriesPage";

export const Route = createFileRoute("/_authenticated/dashboard/categories")({
  component: CategoriesPage,
});
