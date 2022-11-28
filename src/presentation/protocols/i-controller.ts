import { IHttpResponse, IHttpRequest } from "./i-http";

export interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
