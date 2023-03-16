import { IPayment } from "../../models/payment.model";

type PaymentDTO = Omit<IPayment, "_id"|"status">;

type GatewayDTO = {
    amount:number ,
    phone?: string,
    email?: string,
    description?: string,
    validCardNumber?: string
}

type VerifyDTO = {
    token:string,
    status:string|number
}

// type VerifyStatus = "OK"|"NOK"|1|0;

export {
    PaymentDTO,
    GatewayDTO,
    VerifyDTO,
}