import { createFileRoute } from "@tanstack/react-router";
import DeliveryPricesPage from "@/pages/dashboard/DeliveryPricesPage";

export const Route = createFileRoute("/_authenticated/dashboard/delivery")({
  component: DeliveryPricesPage,
});
