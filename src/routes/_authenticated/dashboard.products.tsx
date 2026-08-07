import { createFileRoute } from "@tanstack/react-router";
import ProductsPage from "@/pages/dashboard/ProductsPage";

export const Route = createFileRoute("/_authenticated/dashboard/products")({
  component: ProductsPage,
});
