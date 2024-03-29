import {GatewayEnum, PayIR, PaymentGateway, ZarinPal} from "../../utils/payment.gateways";
import axios from "axios";
import {PaymentModel, PaymentStatusEnum} from "../models/payment.model";
import {GatewayDTO, PaymentDTO, VerifyDTO} from "../http/dtos/payment.dto";
import {walletModel} from "../models/wallet.model";
import {startSession} from "mongoose";

export default new class PaymentService<T extends GatewayEnum>{
    async Gateway(data:GatewayDTO, gatewayEnum: T):Promise<any> {
        try {
            const gateway = await this.getGateway(gatewayEnum)
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

    async Verify(data: VerifyDTO, gatewayEnum: T):Promise<any>  {
        try {
            if (data.status == 0 || data.status == "NOK"){
                return await this.cancelTransaction(data.token)
            }

            const gateway = await this.getGateway(gatewayEnum)
            await axios.post(gateway.Verify.url, JSON.stringify({
                api: gateway.merchantId,
                token: data.token
            })).then(() => {
                this.acceptTransaction(data.token)

                return Promise.resolve();
            }).catch(err => {
                return Promise.reject({
                    message:err.message
                });
            })

        }catch (e) {
            await this.cancelTransaction(data.token)

            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    private async acceptTransaction(authority: string):Promise<void>{
        const session = await startSession();

        await PaymentModel.findOne({
            authority,
            status: PaymentStatusEnum.Pending
        }).then(async (trans) => {
            if (trans == null) return Promise.reject({
                message: "transaction is failed"
            });

            session.startTransaction();

            walletModel.updateOne({
                user_id: trans.user_id
            },{
                $inc: {
                    amount: trans.amount
                },
                $push: {
                    transactions: {
                        authority,
                        amount: trans.amount
                    }
                }
            }).then(() => {
                trans.status = PaymentStatusEnum.Success
                trans.save().then(() =>
                    session.commitTransaction()
                        .then(() => session.endSession())
                );
            }).then(() => {
                return Promise.resolve();
            })

            return Promise.reject()
        });
    }

    private async cancelTransaction(authority: string):Promise<void>{
        const trans =  await PaymentModel.updateOne({authority},{
            $set: {
                status: PaymentStatusEnum.Failed
            }
        })

        if(trans.modifiedCount){
            return Promise.resolve();
        }
        return Promise.reject({
            message: "transaction is failed"
        });
    }

    private getGateway = async (gateway: GatewayEnum): Promise<PaymentGateway> => {
        switch (gateway) {
            case GatewayEnum.PAYIR:
                return PayIR;
            case GatewayEnum.ZARINPAL:
                return ZarinPal;
        }
    }
}