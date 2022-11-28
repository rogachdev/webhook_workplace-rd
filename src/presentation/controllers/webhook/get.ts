import { ok, forbidden } from './../../../util/helper/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'
import { Service } from 'typedi'
import { IUser } from '../../../data/auth/protocols/i-user'
import { authUser } from '../../../infra/auth/auth-user'
import { Log } from '../../../infra/log'

@Service()
export class Get implements IController {
  private readonly typeMode: string = 'subscribe'

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const mode: string = httpRequest.query['hub.mode'] || ''
    const token: string = httpRequest.query['hub.verify_token'] || ''
    const challenge: string = httpRequest.query['hub.challenge'] || ''
    const iUser: IUser = authUser(token || '', true)

    if (mode === this.typeMode && iUser.isAuthenticated && challenge) {
      Log.info({ msg: 'WEBHOOK_VERIFIED' })
      return { statusCode: 200, body: challenge, isOnlyText: true }
    }
    return forbidden()
  }
}
