import {
  Post as WebhookPost,
  Get as WebhookGet,
} from "../../presentation/controllers/webhook";
import { routeAdapter } from "../adapter/route-adapter";
import { Router } from "express";

export const customRoutes = (router: Router) => {
  //WEBHOOK
  router.post("/bot/:botName/webhook", routeAdapter(WebhookPost));
  router.get("/bot/:botName/webhook", routeAdapter(WebhookGet));
};
