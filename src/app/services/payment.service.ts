import {PaymentGateway} from "../../utils/payment.gateways";
import axios from "axios";
import {PaymentModel, PaymentStatusEnum} from "../models/payment.model";
import {GatewayDTO, PaymentDTO, VerifyDTO} from "../http/dtos/payment.dto";

export default new class PaymentService<T extends PaymentGateway>{
    async Gateway(data:GatewayDTO, gateway: T):Promise<any> {
        try {
            await axios.post(gateway.sendData.url, JSON.stringify({
                api: gateway.merchantId,
                amount: data.amount*10,
                redirect: gateway.callbackUrl,
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