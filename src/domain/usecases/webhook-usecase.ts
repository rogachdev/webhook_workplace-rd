import { Service } from "typedi";
import { IWebhookUsecase, AbsUsecase } from "../protocols";
import { IWebhook } from "./../protocols/i-webhook";
import { IntegrateIntent } from "./../../data/integrate/integrate-intent";
import { IIntegrateIntent } from "../../data/integrate/protocols/i-integrate-intent";
import { IFrom } from "../../package/util/protocols/i-from";
import { ITo } from "../../package/util/protocols/i-to";
import { IBot } from "../../package/util/protocols/i-bot";

@Service()
export class WebhookUsecase extends AbsUsecase implements IWebhookUsecase {
  protected integrateIntent: IIntegrateIntent;

  constructor(integrateIntent: IntegrateIntent) {
    super();
    this.integrateIntent = integrateIntent;
  }

  protected getName(): string {
    throw new Error("IntentUsecase");
  }

  /**
   * Enviar mensagem para definir a ação como intent
   *
   * @param event
   */
  send(botData: IBot, dataWebhook: IWebhook): boolean {
    const config = {
      bot: botData,
      endPoint: process.env.INTEGRATE_LAMBDA_INTENT_ENDPOINT as string,
    };

    const { from, to } = this.fillMsg(dataWebhook);
    /**
     * Não enviar mensagem vazia
     */
    if (to.message === "") {
      return false;
    }

    this.integrateIntent.setConfig(config);
    this.integrateIntent.send(from, to);

    return true;
  }

  /**
   * Dados enviados
   *
   * @param from
   * @param to
   */
  protected fillMsg(dataWebhook: IWebhook): any {
    const dataWebhookKey = dataWebhook.entry[0];
    const messaging = dataWebhookKey.messaging[0];

    const from: IFrom = {
      id: messaging.sender?.id || 0,
      name: "",
      timestamp: messaging.timestamp,
    };
    const to: ITo = {
      id: messaging.recipient?.id || 0,
      key: "id",
      idMessage: messaging.message?.mid || this.traceId,
      message: messaging.message?.text || "",
    };
    return { from, to };
  }
}
