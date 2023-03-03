import {Response as ExpressResponse} from "express";




export abstract class Response<T> {
    protected constructor(
        public res: ExpressResponse,
        public data: T,
        public status: number,
    ) {}
    abstract toJson<R>(): ExpressResponse<R>;
}

export class JsonResponse<T> extends Response<T>{
    constructor(
        public res: ExpressResponse,
        public data: T,
        public status: number = 200,
    ) {
        super(res, data, status);
        this.toJson()
    }

    toJson<R>(): ExpressResponse<R> {
        return this.res.status(this.status).json(this.data)
    }
}

export type messageResponse = {
    message:string
}