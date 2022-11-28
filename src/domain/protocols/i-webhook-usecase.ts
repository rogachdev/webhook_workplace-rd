import { IWebhook } from "./i-webhook";
import { IUsecase } from "./i-usecase";
import { IBot } from "../../package/util/protocols/i-bot";

export interface IWebhookUsecase extends IUsecase {
  send(botData: IBot, webhook: IWebhook): boolean;
}
