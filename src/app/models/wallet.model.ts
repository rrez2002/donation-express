import {Model, model, Schema, Types} from "mongoose";
import {IPayment, PaymentModel} from "./payment.model";

type Wallet = IWallet & IWalletMethods

interface IWallet {
    _id: Types.ObjectId
    user_id: Types.ObjectId
    amount: number
    transactions: Pick<IPayment, "authority"|"amount">
}

interface IWalletMethods {}

type WalletModel = Model<IWallet, {}, IWalletMethods>;

const WalletSchema = new Schema<IWallet, WalletModel, IWalletMethods>({
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required: true},
    transactions: [{type: PaymentModel, required: true, ref:"Payment"}]
})

const WalletModel: WalletModel = model<IWallet, WalletModel>("Wallet", WalletSchema);

export {
    Wallet,
    IWallet,
    WalletModel
}