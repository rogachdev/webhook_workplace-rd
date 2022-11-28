import { IFrom } from "../../../package/util/protocols/i-from";
import { ITo } from "../../../package/util/protocols/i-to";
import { IIntegrateConfig } from "../../../package/util/protocols/i-integrate-config";

export interface IIntegrateIntent {
  setConfig(config: IIntegrateConfig): void;
  send(from: IFrom, to: ITo): any;
}
