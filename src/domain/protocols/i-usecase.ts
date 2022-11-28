import { newId } from "../../infra/id/new-id";

export interface IUsecase {
  generateTraceId(): string;
  setTraceId(uuid: string): void;
}

export abstract class AbsUsecase {
  protected traceId: string;

  protected abstract getName(): string;

  public generateTraceId(): string {
    this.traceId = newId();
    return this.traceId;
  }

  public setTraceId(uuid: string): void {
    this.traceId = uuid;
  }

  protected logError(message?: string, data?: any): void {
    console.error({
      traceId: this.traceId,
      origin: this.getName(),
      message,
      data,
    });
  }

  protected logDebug(message?: string, data?: any): void {
    console.log({
      traceId: this.traceId,
      origin: this.getName(),
      message,
      data,
    });
  }
}
