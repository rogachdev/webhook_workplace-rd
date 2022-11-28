import { Service } from "typedi";
import { stringify } from "flatted";
import { IUser } from "./../auth/protocols/i-user";
import { Integrate } from "./../../infra/integrate/integrate";
import { authHeader } from "./../../infra/auth/auth-header";
import { IIntegrateIntent } from "./protocols/i-integrate-intent";
import { IIntegrateConfig } from "../../package/util/protocols/i-integrate-config";
import { ITo } from "../../package/util/protocols/i-to";
import { IFrom } from "../../package/util/protocols/i-from";

@Service()
export class IntegrateIntent extends Integrate implements IIntegrateIntent {
  private config: IIntegrateConfig;

  setConfig(config: IIntegrateConfig): void {
    this.config = config;
  }

  send(from: IFrom, to: ITo): any {
    const { bot } = this.config;
    const data = {
      //bot,
      traceId: bot.traceId,
      from,
      to,
    };
    const url = `${this.config.endPoint}/detect`;

    const user: IUser = {
      isAuthenticated: true,
      name: bot.name,
      action: "integracao",
      type: bot.type,
    };
    const headers = authHeader(user);

    try {
      const ret = this.post(url, headers, null, data);
      return ret;
    } catch (e) {
      const { data, status, headers } = e.response || {};
      console.log(
        stringify({
          bot,
          message: "Erro ao tentar enviar mensagem ao destinatario",
          error: { data, status, headers },
        })
      );
    }
    return false;
  }
}
