import { IUser } from "./../../data/auth/protocols/i-user";
export interface IHttpResponse {
  statusCode: number;
  body: any;
  isOnlyText?: boolean;
}

export interface IHttpRequest {
  headers?: any;
  body?: any;
  query?: any;
  params?: any;
  user: IUser;
}
