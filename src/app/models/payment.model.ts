import {Model, model, Schema, Types} from "mongoose";

export enum PaymentStatusEnum {
    Success = "success",
    Failed = "failed",
    Pending = "pending"
}

export interface IPayment {
    user_id: Types.ObjectId
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
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
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