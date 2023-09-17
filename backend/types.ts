import { Request } from 'express'
import { IUser } from './models/userModel'

export interface queryStrType { keyword: string, page: number }

export interface CustomRequest<T = any> extends Request {
    user?: IUser
    body: T
}

