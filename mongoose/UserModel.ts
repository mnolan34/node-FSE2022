import mongoose from "mongoose";
import UserSchema from "./UserSchema";
import AccountType from "../models/AccountType";
import MaritalStatus from "../models/MaritalStatus";
import Location from "../models/Location";

export interface UserDocument extends mongoose.Document { // TODO CHANGE
    username: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    profilePhoto: string | null;
    headerImage: string | null;
    accountType: AccountType;
    maritalStatus: MaritalStatus;
    biography: string | null;
    dateOfBirth: Date | null;
    joined: Date;
    location: Location | null;
}

export const UserModel = mongoose.model<UserDocument>('UserModel', UserSchema); // TODO CHANGE

// export UserModel; // TODO CHANGE

