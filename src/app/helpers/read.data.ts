import {IDonationLink} from "../models/donation.link.model";
import {IUser} from "../models/user.model";

type ReadData<T> = {
    [P in keyof T]: 0|1
};

type ReadUserData = ReadData<Partial<IUser>>
type ReadDonationLinkData = ReadData<Partial<IDonationLink>>

export {
    ReadData,
    ReadUserData,
    ReadDonationLinkData,
}