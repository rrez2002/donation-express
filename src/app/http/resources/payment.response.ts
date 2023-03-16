import {Response} from "./response";
import {Response as ExpressResponse} from "express";
import { GatewayEnum, IGatewayApi } from "../../../utils/payment.gateways";

type GatewayApi = IGatewayApi & {
    gateway:GatewayEnum
};

export class GatewayResponse extends Response<GatewayApi>{
    constructor(
        public res: ExpressResponse,
        public data: GatewayApi,
        public status: number = 200,
    ) {
        super(res, data, status);
        this.toJson<GatewayApi>()
    }

    toJson<R>(): ExpressResponse<R> {
        return this.res.status(this.status).json({
            method:this.data.method,
            url:this.generateUrl(this.data.gateway, this.data.url),
        })
    }

    private generateUrl(gateway:GatewayEnum,authority:string) {
        switch (gateway) {
            case GatewayEnum.PAYIR:
                return `https://pay.ir/pg/${authority}`
            case GatewayEnum.ZARINPAL: {
                return `https://www.zarinpal.com/pg/StartPay/${authority}`
            }
        }
    }
}

