import { createFileRoute } from "@tanstack/react-router";
import OrdersPage from "@/pages/dashboard/OrdersPage";

export const Route = createFileRoute("/_authenticated/dashboard/orders")({
  component: OrdersPage,
});
