type GatewayApiMethods = "GET"|"POST"

export interface IGatewayApi {
    method:GatewayApiMethods,
    url:string,
}

export enum GatewayEnum {
    "ZARINPAL" = "zarinpal",
    "PAYIR" = "payir",
}

class PaymentGateway {
    constructor(
        private merchant_id: string,
        private send_data: IGatewayApi,
        private gateway: IGatewayApi,
        private verify: IGatewayApi,
        private callback_url: string,
    ) {}

    get merchantId():string{
        return this.merchant_id
    }

    get sendData():IGatewayApi{
        return this.send_data
    }
    get Gateway():IGatewayApi{
        return this.gateway
    }
    get Verify():IGatewayApi{
        return this.verify
    }
    get callbackUrl():string{
        return this.callback_url
    }
}

const url: string = process.env.URL || "http://localhost";
const port: string = process.env.PORT || "8000";

export const PayIR:PaymentGateway = new PaymentGateway(
    process.env.PAYIR_MERCHANT_ID|| "test",
    {
        method:"POST",
        url:"https://pay.ir/pg/send"
    },
    {
      method:"GET",
      url:"https://pay.ir/pg/",
    },
    {
      method:"POST",
      url:"https://pay.ir/pg/verify",
    },
    `${url}:${port}/payment/verify`)

export const ZarinPal:PaymentGateway = new PaymentGateway(
    process.env.PAYIR_MERCHANT_ID|| "",
    {
        method:"POST",
        url:"https://api.zarinpal.com/pg/v4/payment/request.json",
    },
    {
        method:"GET",
        url:"https://www.zarinpal.com/pg/StartPay/",
    },
    {
        method:"POST",
        url:"https://api.zarinpal.com/pg/v4/payment/verify.json",
    },
    `${url}:${port}/payment/verify`)






