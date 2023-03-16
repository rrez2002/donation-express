import {PayIR} from "../../utils/payment.gateways";
import axios from "axios";
import { PaymentModel } from "../models/payment.model";
import { GatewayDTO, PaymentDTO } from "../http/dtos/payment.dto";

export default new class PaymentService{
    async payIrGateway(data:GatewayDTO):Promise<any>  {
        try {
            await axios.post(PayIR.sendData.url, JSON.stringify({
                api: PayIR.merchantId,
                amount: data.amount*10,
                redirect: PayIR.callbackUrl,
                description: data.description,
                mobile: data.phone,
                email: data.email,
                validCardNumber: data.validCardNumber
            })).then(response => {
                return Promise.resolve({
                    token: response.data.token
                });
            }).catch(err => {
                return Promise.reject({
                    message:err.response.data.errorMessage
                });
            })
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }


    async SaveTransaction(data: PaymentDTO): Promise<any> {
        try {
            await PaymentModel.create(data)
            return Promise.resolve();
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

}