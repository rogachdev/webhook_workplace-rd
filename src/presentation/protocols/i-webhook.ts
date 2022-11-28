import { WebhookDTO } from "../dto/webhook-dto";
import { IBot } from "../../package/util/protocols/i-bot";

export interface IWebhook {
  bot: IBot;
  dto: WebhookDTO;
}
