import User from "../models/User";
import {UserDocument} from "../mongoose/UserModel";

export default interface UserDao{
    findAllUsers(): Promise<User[]>;
    findUserByID(uid: string) : Promise<any>;
    createUser(user: User) : Promise<UserDocument>;
    updateUser(uid: string, user: User) : Promise<any>;
    deleteUser(uid: string): Promise<any>;
}