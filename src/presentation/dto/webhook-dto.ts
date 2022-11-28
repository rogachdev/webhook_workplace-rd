import {
  IWebhook,
  IWebhookEntry,
  IWebhookMessaging,
  IWebhookRead,
  IWebhookMessage,
} from "./../../domain/protocols/i-webhook";
import { Expose, Type } from "class-transformer";
import { IsString, IsNumber } from "class-validator";

export class WebhookReadDTO implements IWebhookRead {
  @IsNumber()
  @Expose()
  watermark: number;
}

export class WebhookMessageDTO implements IWebhookMessage {
  @Expose()
  @IsString()
  mid: string;

  @Expose()
  @IsString()
  text: string;
}

export class WebhookMessagingDTO implements IWebhookMessaging {
  @Expose()
  sender: any;

  @Expose()
  recipient: any;

  @IsNumber()
  @Expose()
  timestamp: number;

  @Expose()
  @Type(() => WebhookReadDTO)
  read?: WebhookReadDTO;

  @Expose()
  @Type(() => WebhookMessageDTO)
  message?: WebhookMessageDTO;
}

export class WebhookEntryDTO implements IWebhookEntry {
  @IsString()
  @Expose()
  id: string;

  @IsNumber()
  @Expose()
  time: number;

  @Expose()
  @Type(() => WebhookMessagingDTO)
  messaging: Array<WebhookMessagingDTO>;
}

export class WebhookDTO implements IWebhook {
  @Expose()
  @IsString()
  object: string;

  @Expose()
  @Type(() => WebhookEntryDTO)
  entry: Array<WebhookEntryDTO>;
}
