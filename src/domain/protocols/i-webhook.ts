export interface IWebhook {
  object: string;
  entry: Array<IWebhookEntry>;
}

export interface IWebhookEntry {
  id: string;
  time: number;
  messaging: Array<IWebhookMessaging>;
}

export interface IWebhookMessaging {
  sender: any;
  recipient: any;
  timestamp: number;
  read?: IWebhookRead;
  message?: IWebhookMessage;
}

export interface IWebhookRead {
  watermark: number;
}

export interface IWebhookMessage {
  mid: string;
  text?: string;
}
