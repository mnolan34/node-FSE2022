import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default interface User{
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    profilePhoto?: string,
    headerImage?: string,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    biography?: string,
    dateOfBirth?: Date,
    joined: Date,
    location?: Location
};