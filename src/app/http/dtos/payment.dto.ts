import { IPayment } from "../../models/payment.model";

type PaymentDTO = Omit<IPayment, "_id"|"status">;

type GatewayDTO = {
    amount:number ,
    phone?: string,
    email?: string,
    description?: string,
    validCardNumber?: string
}

export {
    PaymentDTO,
    GatewayDTO,
}