import {PayIR} from "../../utils/payment.gateways";
import axios from "axios";

export default new class PaymentService{
    async payIrGateway(amount:number , phone?: string, email?: string):Promise<any>  {
        try {
            await axios.post(PayIR.sendData.url, JSON.stringify({
                api: PayIR.merchantId,
                amount: amount*10,
                redirect: PayIR.callbackUrl,
                mobile: phone,
                email: email,
            })).then(response => {
                return Promise.resolve(response.data);
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
}