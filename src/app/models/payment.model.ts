import {Model, model, Schema} from "mongoose";

export enum PaymentStatusEnum {
    Success = "success",
    Failed = "failed",
    Pending = "pending"
}

export interface IPayment {
    name?: string,
    phone?: string,
    authority: string,
    amount: number,
    description?: string,
    validCardNumber?: string,
    status: PaymentStatusEnum,
}

interface IPaymentMethod {

}


export type Payment = IPayment & IPaymentMethod

type PaymentModel = Model<IPayment, {}, IPaymentMethod>;

const PaymentSchema = new Schema<IPayment, PaymentModel, IPaymentMethod>({
    name: {type: Schema.Types.String},
    phone: {type: Schema.Types.String, ref: "User"},
    amount: {type: Schema.Types.Number, min: 1000, required: true},
    authority: {type: Schema.Types.String, required: true, unique:true},
    description: {type: Schema.Types.String},
    validCardNumber: {type: Schema.Types.String},
    status: {type: Schema.Types.String, enum: PaymentStatusEnum, default: PaymentStatusEnum.Pending}
}, {
    timestamps: true
});

export const PaymentModel: PaymentModel = model<IPayment, PaymentModel>("Payment", PaymentSchema);