import { IWebhook } from "./../protocols/i-webhook";
import { WebhookDTO } from "../dto";
import { validateConvert } from "../../util/helper";
import { IBot } from "../../package/util/protocols/i-bot";

export const validateWebhookPostRequest = async (
  params?: any,
  body?: any
): Promise<IWebhook> => {
  const bot: IBot = {
    name: params.botName,
    type: process.env.DEFAULT_BOT_TYPE as string,
  };
  const dto = await validateConvert(WebhookDTO, body);

  return {
    bot,
    dto,
  };
};
