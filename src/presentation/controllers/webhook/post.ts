import { IWebhook } from './../../protocols/i-webhook'
import { WebhookUsecase } from '../../../domain/usecases'
import { generalError, ok } from '../../../util/helper'
import { validateWebhookPostRequest } from '../../validate-request/validate-webhook-post-request'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'
import { Service } from 'typedi'
import { IWebhookUsecase } from '../../../domain/protocols'

@Service()
export class Post implements IController {
  protected webhookUsecase: IWebhookUsecase
  protected traceId: string

  constructor (webhookUsecase: WebhookUsecase) {
    this.webhookUsecase = webhookUsecase
    this.traceId = this.webhookUsecase.generateTraceId()
    this.webhookUsecase.setTraceId(this.traceId)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const webhookData: IWebhook = await validateWebhookPostRequest(
        httpRequest.params,
        httpRequest.body
      )

      const { ...data } = webhookData.dto
      const botData = Object.assign(webhookData.bot, { traceId: this.traceId })
      this.webhookUsecase.send(botData, data)

      return ok(null, `${this.traceId} - EVENT_RECEIVED`)
    } catch (e) {
      return generalError(e)
    }
  }
}
